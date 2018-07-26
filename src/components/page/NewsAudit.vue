<!-- 文章审核 -->
<template>
<div>
	<div class="handle-box">
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
		    class="handle-input"
		    @change="searchWord"></el-input>
		<el-button icon="el-icon-close"
		    @click="clear">清空条件</el-button>
		<el-button type="primary"
		    icon="el-icon-circle-check-outline"
		    :disabled="btnDisabled"
		    :loading="isLoading"
		    @click="passMulti">批量通过</el-button>
		<el-button type="danger"
		    icon="el-icon-circle-close-outline"
		    :disabled="btnDisabled"
		    :loading="isLoading"
		    @click="denyMulti">批量不通过</el-button>
	</div>
	<el-table :data="tableData"
	    border
	    style="width: 100%"
	    ref="multipleTable"
	    @selection-change="selectChange">
		<el-table-column type="selection"
		    width="55"></el-table-column>
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
		    width="130">
		</el-table-column>
		<el-table-column prop="hits"
		    label="点击量"
		    width="100">
		</el-table-column>
		<el-table-column prop="author"
		    label="作者"
		    width="100">
		</el-table-column>
		<el-table-column label="预览"
		    width="100">
			<template scope="scope">
                <el-button size="small"
                        @click="viewNews(scope.$index, scope.row)">查看</el-button>
            </template>
		</el-table-column>
		<el-table-column label="操作"
		    width="180">
			<template scope="scope">
                <el-button type="primary" size="small" :loading="isLoading"
                        @click="passOne(scope.$index, scope.row)">通过</el-button>
                <el-button size="small" type="danger" :loading="isLoading"
                        @click="denyOne(scope.$index, scope.row)">不通过</el-button>
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
						<span><b>日期：</b><span v-html="article.publishDate"></span></span>
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
		return {
			tableData: [],
			cur_page: 1,
			multipleSelection: [],
			btnDisabled: true,
			select_cate: '',
			select_word: '',
			total: 0,
			pageSize: 15,
			isLoading: false,
			dialogVisible: false,
			article: '',
			groups: menu
		}
	},
	created() {
		this.getData();
	},
	watch: {
		select_cate() {
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
				categoryId: self.select_cate,
				title: self.select_word,
				size: self.pageSize,
				status: 2 // 发布待审阅
			}).then((res) => {
				self.tableData = res.data.list;
				self.total = res.data.total;
			});
		},
		searchWord() {
			this.getData();
		},
		selectChange(val) {
			this.multipleSelection = val;
			if (this.multipleSelection.length > 0) {
				this.btnDisabled = false;
			} else {
				this.btnDisabled = true;
			}
		},
		clear() {
			this.select_word = '';
			this.select_cate = '';
		},
		// 查看文章
		viewNews(index, row) {
			const self = this;
			self.dialogVisible = true;
			self.$axios.post('../manage/article/view', {
				id: row.id
			}).then((res) => {
				let _res = res.data;
				if (_res.state === 'success') {
					self.article = _res.data;
				} else {
					self.$message.error(_res.msg);
				}
			});
		},
		// 通过单选
		passOne(index, row) {
			const self = this;
			self.isLoading = true;
			self.$axios.post('../manage/article/audit', {
				articleIds: row.id,
				isPass: 1
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
				self.isLoading = false;
			});
		},
		// 不通过单选
		denyOne(index, row) {
			const self = this;
			self.isLoading = true;
			this.$prompt('输入不通过原因', '不通过', {
				confirmButtonText: '确定',
				showCancelButton: false,
				inputValue: '默认不通过',
				inputValidator: function(val) {
					if (!val) return '必填';
				}
			}).then(({
				value
			}) => {
				self.$axios.post('../manage/article/audit', {
					articleIds: row.id,
					isPass: 0,
					refuseInfo: value
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
					self.isLoading = false;
				});
			});
		},
		// 通过多选
		passMulti() {
			const self = this,
				length = self.multipleSelection.length;
			let _articleIds = '';
			// 获取到所选文章的id
			_articleIds = self.multipleSelection.map(a => a.id).join(',');

			if (length > 0) {
				self.isLoading = true;
				self.$alert('确定批量通过选中的 ' + length + ' 条文章吗？', '提示', {
					confirmButtonText: '确定',
					callback: action => {
						self.$axios.post('../manage/article/audit', {
							articleIds: _articleIds,
							isPass: 1
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
							self.isLoading = false;
						});
						self.multipleSelection = [];
					}
				});
			} else {
				self.$message.error('未选中文章');
			}
		},
		// 不通过多选
		denyMulti() {
			const self = this,
				length = self.multipleSelection.length;
			let _articleIds = '';
			// 获取到所选文章的id
			_articleIds = self.multipleSelection.map(a => a.id).join(',');

			if (length > 0) {
				self.isLoading = true;
				self.$prompt('确定批量不通过选中的 ' + length + ' 条文章吗？请输入原因', '不通过', {
					confirmButtonText: '确定',
					showCancelButton: false,
					inputValue: '默认不通过',
					inputValidator: function(val) {
						if (!val) return '必填';
					}
				}).then(({
					value
				}) => {
					self.$axios.post('../manage/article/audit', {
						articleIds: _articleIds,
						isPass: 0,
						refuseInfo: value
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
						self.isLoading = false;
					});
				});
			} else {
				self.$message.error('未选中文章');
			}
		}
	}
}
</script>

<style scoped>
</style>
