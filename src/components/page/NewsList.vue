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
			    class="short-input"
			    @change="searchWord"></el-input>
			<el-button icon="el-icon-close"
			    @click="clear">清空条件</el-button>
			<el-button type="info"
			    icon="el-icon-view"
			    @click="viewNews">查看文章</el-button>
			<el-button type="primary"
			    icon="el-icon-edit"
			    @click="editNews">修改文章</el-button>
		</div>
		<el-table :data="tableData"
		    border
		    style="width: 100%"
		    ref="singleTable"
		    highlight-current-row
		    stripe
		    @current-change="currentChange">
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
			    width="80">
				<template slot-scope="scope">
                    <span>{{scope.row.hits}}</span> <i class="el-icon-edit edit-icon" @click="setHits(scope.$index, scope.row)"></i></el-button>
                </template>
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
			    :width="isPublish ? 100 : 180">
				<template scope="scope">
                <!-- 只有当用户不是发布员 且 文章有封面 且 状态为已发布 时，才可以设置轮播 -->
                <el-button :type="parseInt(scope.row.isRoll) ? '' : 'primary'" size="small" :class="!isPublish && scope.row.isRoll != 2 && scope.row.delFlag == 0 && scope.row.categoryId == 811 ? '' : 'hidden'"
                        @click="setRoll(scope.$index, scope.row)">{{parseInt(scope.row.isRoll) ? '取消轮播' : '设为轮播'}}</el-button>
                <!-- 只有当用户不是发布员 且 状态不是删除 时，才可以删除 -->
                <el-button size="small" type="danger" :class="isPublish || scope.row.delFlag == 1 ? 'hidden' : ''"
                        @click="delOne(scope.$index, scope.row)">删除</el-button>
            </template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination @current-change="handleCurrentChange"
			    :page-size="pageSize"
			    layout="prev, pager, next"
			    :total="total">
			</el-pagination>
		</div>
	</div>

	<el-dialog title="查看文章"
	    :visible.sync="dialogVisible"
	    fullscreen>
		<el-card class="box-card margin-auto"
		    :body-style="{ padding: '0px' }">
			<img src="~assets/news_top.png"
			    class="image">
			<div class="article-box">
				<div class="news-box">
					<h2 class="news-title"
					    v-html="article.title"></h2>
					<div class="news-detail">
						<span><b>作者：</b><span v-html="article.author"></span></span>
						<span><b>更新时间：</b><span v-html="article.publishDate"></span></span>
					</div>
					<pre class="news-text"
					    v-html="article.content"></pre>
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
import menu from '../../assets/json/articleMenu.json';
export default {
	data() {
		const _role = this.$store.state.role;
		return {
			tableData: [],
			currentRow: '',
			isPublish: _role === 'publish' ? true : false,
			dialogVisible: false,
			article: '',
			select_status: 1,
			select_cate: '',
			select_word: '',
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
		hits(val) {
			if (!val) {
				this.hitsDisabled = true;
			} else {
				this.hitsDisabled = false;
			}
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
				cat: 0 // 文章类别
			}).then((res) => {
				self.tableData = res.data.list;
				self.total = res.data.total;
				// 清空store中存储的文章信息
				self.$store.commit('setNews', '');
			});
		},
		searchWord() {
			this.getData();
		},
		clear() {
			this.select_status = '';
			this.select_word = '';
			this.select_cate = '';
		},
		currentChange(val) {
			this.currentRow = val;
		},
		// 查看文章
		viewNews() {
			const self = this;
			if (!self.currentRow) {
				self.$message.error('请选择文章');
				return;
			}
			self.dialogVisible = true;
			self.$axios.post('../manage/article/view', {
				id: self.currentRow.id
			}).then((res) => {
				let _res = res.data;
				if (_res.state === 'success') {
					self.article = _res.data;
				} else {
					self.$message.error(_res.msg);
				}
			});
		},
		// 修改文章
		editNews() {
			if (!this.currentRow) {
				this.$message.error('请选择文章');
				return;
			}
			this.$store.commit('setNews', this.currentRow);
			this.$router.push('/news');
		},
		setRoll(index, row) {
			const self = this;
			self.$axios.post('../manage/article/setRoll', {
				articleId: row.id,
				isRoll: row.isRoll
			}).then((res) => {
				let _res = res.data;
				if (_res.state === 'success') {
					self.$message({
						type: 'success',
						message: _res.msg
					});
					parseInt(row.isRoll) === 0 ? row.isRoll = 1 : row.isRoll = 0;
				} else {
					self.$message.error(_res.msg);
				}
			});
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
		validateHits(val) {
			if (!val || Number.isInteger(val)) {
				return '请输入数字';
			}
		},
		setHits(index, row) {
			this.$prompt('请输入点击量', '设置点击量', {
				inputValidator: this.validateHits
			}).then(({
				value
			}) => {
				this.$axios.post('../manage/article/setHits', {
					articleId: row.id,
					hits: value
				}).then((res) => {
					let _res = res.data;
					if (_res.state === 'success') {
						this.$message({
							type: 'success',
							message: _res.msg
						});
						this.getData();
					} else {
						this.$message.error(_res.msg);
					}
				});
			});
		}
	}
}
</script>

<style scoped>
.short-input {
	width: 200px;
}

.edit-icon {
	cursor: pointer;
}

.edit-icon:hover {
	color: #409eff;
}
</style>
