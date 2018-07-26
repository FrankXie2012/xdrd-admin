<template>
<div>
	<div class="table">
		<div class="handle-box">
			<el-select v-model="select_status"
			    placeholder="筛选状态"
			    class="handle-select">
				<el-option v-for="state in status"
				    :key="state.value"
				    :label="state.label"
				    :value="state.value">
				</el-option>
			</el-select>
			<el-select v-model="select_cate"
			    placeholder="筛选板块"
			    class="handle-select">
				<el-option-group v-for="group in groups"
				    :key="group.label"
				    :label="group.label">
					<el-option v-for="item in group.cards"
					    :key="item.value"
					    :label="item.label"
					    :value="item.value">
					</el-option>
				</el-option-group>
			</el-select>
			<el-input v-model="select_word"
			    placeholder="筛选关键词"
			    class="handle-input"></el-input>
			<el-button icon="el-icon-close"
			    @click="clear">清空条件</el-button>
			<el-button type="primary"
			    icon="el-icon-edit"
			    @click="addImgs">新增图片新闻</el-button>
		</div>
		<el-table :data="tableData"
		    border
		    style="width: 100%"
		    ref="singleTable"
		    highlight-current-row
		    stripe>
			<el-table-column prop="publishDate"
			    label="日期"
			    sortable
			    width="120">
			</el-table-column>
			<el-table-column prop="title"
			    label="标题">
			</el-table-column>
			<el-table-column prop="categoryName"
			    label="所属板块"
			    width="110">
			</el-table-column>
			<el-table-column prop="hits"
			    label="点击量"
			    width="70">
			</el-table-column>
			<el-table-column prop="author"
			    label="作者"
			    width="80">
			</el-table-column>
			<el-table-column label="状态"
			    width="100">
				<template slot-scope="scope">
                    <el-tag size="small" type="success" v-if="scope.row.delFlag == 0">已发布</el-tag>
                    <el-tag size="small" type="danger" v-if="scope.row.delFlag == 1">已删除</el-tag>
                    <el-tag size="small" type="info" v-if="scope.row.delFlag == 2">待审核</el-tag>
                    <el-tag size="small" type="warning" v-if="scope.row.delFlag == 3">审核不通过</el-tag>
                </template>
			</el-table-column>
			<el-table-column label="操作"
			    :width="isPublish ? 180 : 280">
				<template scope="scope">
                    <el-button size="small" type="info"
                    @click="viewImages(scope.$index, scope.row)">查看图片</el-button>
                    <!-- 只有新闻状态为待审核或审核不通过时才可修改 -->
                    <el-button type="primary" size="small" :class="scope.row.delFlag === 2 || scope.row.delFlag === 3 ? '' : 'hidden'"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <!-- 只有当用户不是发布员 且 状态不是删除 时，才可以删除 -->
                    <el-button size="small" type="danger" :class="isPublish || scope.row.delFlag === 1 ? 'hidden' : ''"
                    @click="delOne(scope.$index, scope.row)">删除</el-button>
                </template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination @current-change="handleCurrentChange"
			    layout="prev, pager, next"
			    :total="total">
			</el-pagination>
		</div>
	</div>

	<!-- 查看图片弹窗 -->
	<el-dialog title="查看图片新闻"
	    :visible.sync="dialogVisible"
	    fullscreen>
		<el-card class="box-card margin-auto"
		    :body-style="{ padding: '0px' }">
			<img src="~assets/news_top.png"
			    class="image">
			<div class="article-box">
				<div class="news-box">
					<h2 class="news-title"
					    v-html="image.title"></h2>
					<div class="news-detail">
						<span><b>作者：</b><span v-html="image.author"></span></span>
						<span><b>更新时间：</b><span>当前时间</span></span>
					</div>
					<!-- 旧数据，直接展示 -->
					<pre class="article-box"
					    v-html="image.content"
					    v-if="oldData"></pre>
					<div class="images-list"
					    v-else>
						<!-- 单张图片 -->
						<div class="full-image"
						    v-if="onlyImage">
							<img :src="image.content[0].url"
							    alt="图片">
						</div>
						<!-- 多张图片 -->
						<div class="my-card"
						    v-for="item in image.content"
						    v-else>
							<img :src="item.url"
							    alt="图片">
							<div class="my-body">
								<p>{{item.name}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<img src="~assets/news_bottom.png"
			    class="image bottom-img">
		</el-card>
		<span slot="footer"
		    class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
	</el-dialog>
</div>
</template>

<script>
import menu from '../../assets/json/imageMenu.json';
export default {
	data() {
		const _role = this.$store.state.role;
		return {
			onlyImage: false,
			oldData: false,
			image: '',
			tableData: [],
			isPublish: _role === 'publish' ? true : false,
			btnDisabled: true,
			dialogVisible: false,
			images: [],
			select_status: 1,
			select_cate: '',
			select_word: '',
			del_list: [],
			cur_page: 1,
			total: 0,
			pageSize: 15,
			status: [{
				value: 0,
				label: '删除'
			}, {
				value: 1,
				label: '审核发布'
			}, {
				value: 2,
				label: '待审核'
			}],
			groups: menu
		}
	},
	created() {
		this.getData();
	},
	watch: {
		select_status() {
			this.getData();
		},
		select_cate() {
			this.getData();
		},
		select_word() {
			this.getData();
		}
	},
	methods: {
		handleCurrentChange(val) {
			this.cur_page = val;
			this.getData();
		},
		getData() {
			const self = this;
			self.$axios.post('../manage/article/list', {
				page: self.cur_page,
				status: self.select_status,
				categoryId: self.select_cate,
				title: self.select_word,
				size: self.pageSize,
				cat: 1 // 图片新闻
			}).then((res) => {
				self.tableData = res.data.list;
				self.total = res.data.total;
				self.$store.commit('setNews', '');
			});
		},
		clear() {
			this.select_status = '';
			this.select_word = '';
			this.select_cate = '';
		},
		handleEdit(index, row) {
			this.$store.commit('setNews', row);
			this.$router.push('/editImg');
		},
		delOne(index, row) {
			const self = this;
			self.$alert('确定删除 "' + row.title + '" ？', '提示', {
				confirmButtonText: '确定',
				callback: action => {
					self.$axios.post('../manage/article/delete', {
						articleIds: row.id
					}).then((res) => {
						let _res = res.data;
						if (_res.state === 'success') {
							self.$message({
								type: 'success',
								message: _res.msg
							});
							self.getData();
						} else {
							self.$message.error(_res.msg);
						}
					});
				}
			});
		},
		addImgs() {
			this.$store.commit('setNews', '');
			this.$router.push('/editImg');
		},
		// 查看图片
		viewImages(index, row) {
			const self = this;
			self.$axios.post('../manage/article/view', {
				id: row.id
			}).then((res) => {
				let _res = res.data;
				if (_res.state === 'success') {
					self.dialogVisible = true;
					self.image = _res.data;
					if (self.image.isNew != 1) {
						self.oldData = true;
					} else {
						self.oldData = false;
						if (self.image.content.length > 1) {
							self.onlyImage = false;
						} else {
							self.onlyImage = true;
						}
					}
				} else {
					self.$message.error(_res.msg);
				}
			});
		}
	}
}
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 150px;
}

.handle-input {
	width: 150px;
	display: inline-block;
}

.images-list {
	margin: 0 auto;
}

.full-image img {
	width: 100%;
	clear: both;
	margin: 20px;
}

.my-card {
	background: #fff;
	box-shadow: 3px 3px 3px #ccc;
	border: 1px solid #ccc;
	display: inline-block;
	margin: 23px;
	text-align: center;
}

.my-card img {
	width: 220px;
	height: 140px;
	overflow: hidden;
	margin: 0;
}

.my-card .my-body {
	padding: 10px 20px;
}

.my-card .my-body p {
	line-height: 24px;
	width: 180px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
