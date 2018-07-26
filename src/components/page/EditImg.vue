<template>
<div>
	<el-alert :title="imageTitle"
	    type="info"
	    :closable="false"
	    center
	    show-icon></el-alert>
	<br>
	<el-form ref="form"
	    :model="form"
	    label-width="80px"
	    :rules="rules">
		<el-form-item label="新闻标题"
		    prop="title">
			<el-input v-model="form.title"
			    class="input"></el-input>
		</el-form-item>
		<!-- 用户下拉框和日期选择控件 -->
		<user-date @cauthor="getAuthor"
		    @cdate="getDate"
		    :prop-author="form.author"
		    :prop-date="form.publishDate"></user-date>
		<el-form-item label="选择板块"
		    prop="categoryId"
		    class="select">
			<el-select v-model="form.categoryId"
			    :value="form.categoryId"
			    placeholder="请选择"
			    class="input">
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
		</el-form-item>
		<!-- 只有板块为图片新闻(14)时才需要上传封面图片 -->
		<el-form-item label="封面图片"
		    :class="form.categoryId == '14' ? '' : 'hidden'">
			<el-upload class="avatar-uploader"
			    action="../manage/article/uploadImage"
			    :show-file-list="false"
			    :on-change="imageSuccess"
			    :before-upload="beforeImageUpload">
				<img v-if="form.image"
				    :src="form.image"
				    class="avatar">
				<i v-else
				    class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</el-form-item>
		<el-form-item label="图片">
			<el-upload action="../manage/article/uploadImage"
			    class="input"
			    multiple
			    list-type="picture"
			    :on-preview="preview"
			    :on-remove="handleRemove"
			    :on-success="getImages"
			    :file-list="fileList">
				<el-tooltip class="item"
				    effect="dark"
				    content="图片文件名就是图片说明"
				    placement="top">
					<el-button size="small"
					    type="primary">点击上传</el-button>
				</el-tooltip>
			</el-upload>
		</el-form-item>
		<el-form-item>
			<el-button type="primary"
			    :disabled="btnActive"
			    :loading="isLoading"
			    @click="onSubmit('form')">立即发布</el-button>
			<el-button @click="onBack">返回列表</el-button>
		</el-form-item>
	</el-form>
	<el-dialog :title="dialogImageName"
	    :visible.sync="dialogVisible"
	    size="tiny">
		<img width="100%"
		    :src="dialogImageUrl"
		    alt="">
	</el-dialog>
</div>
</template>

<script>
import userDate from '../common/UserDate.vue';
import menu from '../../assets/json/imageMenu.json';
export default {
	components: {
		userDate
	},
	data: function() {
		return {
			form: {
				id: '',
				categoryId: '',
				title: '',
				author: '',
				publishDate: '',
				image: '',
				content: []
			},
			isLoading: false,
			dialogImageUrl: '',
			dialogVisible: false,
			dialogImageName: '',
			fileList: [],
			rules: {
				title: [{
					required: true,
					message: '请输入文章标题',
					trigger: 'blur'
				}],
				categoryId: [{
					required: true,
					message: '请选择所属板块',
					trigger: 'change'
				}]
			},
			groups: menu
		}
	},
	computed: {
		imageTitle: function() {
			const _imageTitle = this.$store.state.image.title;
			if (!_imageTitle) {
				return '新增图片';
			} else {
				return '修改 "' + _imageTitle + '" 图片';
			}
		},
		// 按钮禁用控制
		btnActive: function() {
			let form = this.form;
			if (form.categoryId && form.title && form.author && form.publishDate && form.content.length > 0) {
				return false;
			} else {
				return true;
			}
		}
	},
	created() {
		const self = this;
		const _row = this.$store.state.row;
		let _form = this.form;
		if (_row) {
			_form.id = _row.id;
			_form.title = _row.title;
			_form.author = _row.author;
			_form.publishDate = _row.publishDate;
			_form.categoryId = _row.categoryId;

			self.$axios.post('../manage/article/view', {
				id: _form.id
			}).then((res) => {
				let _res = res.data;
				if (_res.state === 'success') {
					self.fileList = _res.data.content;
					_form.content = _res.data.content;
					if (_res.data.image) _form.image = _res.data.image;
				} else {
					self.$message.error(_res.msg);
				}
			});
		}
	},
	methods: {
		getAuthor(res) {
			this.form.author = res;
		},
		getDate(res) {
			this.form.publishDate = res;
		},
		imageSuccess(file, fileList) {
			this.form.image = file.url;
		},
		beforeImageUpload(file) {
			const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},
		handleRemove(file, fileList) {
			this.$message.error('已删除' + file.name);
			this.form.content = fileList;
		},
		preview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
			this.dialogImageName = file.name;
		},
		getImages(res, file) {
			this.form.content.push({
				url: file.response && file.response.data && file.response.data.url,
				name: file.response && file.response.data && file.response.data.name
			});
		},
		onSubmit(formName) {
			const self = this;
			self.isLoading = true;
			self.$refs[formName].validate((valid) => {
				if (valid) {
					let _json = {
						title: self.form.title,
						author: self.form.author,
						publishDate: self.form.publishDate,
						categoryId: self.form.categoryId,
						content: self.form.content,
						image: self.form.image
					};
					self.$axios.post('../manage/article/save', _json).then((res) => {
						var _res = res.data;
						if (_res.state === 'success') {
							self.$message({
								type: 'success',
								message: _res.msg
							});
							self.form = {};
							self.$refs[formName].resetFields();
							setTimeout(function() {
								self.isLoading = false;
								self.$router.push('/images');
							}, 1000);
						} else {
							self.$message.error(_res.msg);
						}
					});
				}
			});
		},
		onBack() {
			this.$store.commit('setNews', '');
			this.$router.push('/images');
		}
	}
}
</script>

<style scoped>
.input {
	width: 360px;
}

.avatar {
	width: 100%;
	height: 100%;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}

.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}
</style>
