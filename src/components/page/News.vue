<template>
<div>
	<el-form ref="form"
	    :model="form"
	    label-width="80px"
	    :rules="rules">
		<el-form-item label="文章名称"
		    prop="title">
			<el-input v-model="form.title"
			    class="item-width"></el-input>
		</el-form-item>
		<!-- 用户下拉框和日期选择控件 -->
		<user-date ref="userDate"
		    @cauthor="getAuthor"
		    @cdate="getDate"
		    :prop-author="form.author"
		    :prop-date="form.publishDate"></user-date>
		<el-form-item label="选择板块"
		    prop="categoryId"
		    class="select">
			<el-select v-model="form.categoryId"
			    placeholder="请选择"
			    class="item-width">
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
		<el-form-item label="封面图片">
			<el-upload class="avatar-uploader"
			    action="../manage/article/uploadImage"
			    :show-file-list="false"
			    :on-success="imageSuccess"
			    :before-upload="beforeImageUpload">
				<img v-if="form.image"
				    :src="form.image"
				    class="avatar">
				<i v-else
				    class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</el-form-item>
		<el-form-item label="上传文件">
			<el-upload class="upload-demo"
			    :before-upload="hintUpload"
			    drag
			    action
			    :on-change="getData"
			    :file-list="fileList">
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip"
				    slot="tip">只能上传docx文件，且不超过500kb</div>
			</el-upload>
		</el-form-item>
		<el-form-item>
			<el-button :disabled="disablePreview"
			    @click="onPreview">预览文章</el-button>
			<el-button type="primary"
			    :loading="isLoading"
			    :disabled="btnActive"
			    @click="onSubmit('form')">立即发布</el-button>
		</el-form-item>
	</el-form>

	<el-dialog title="预览文章"
	    :visible.sync="dialogVisible"
	    fullscreen>
		<el-card class="box-card margin-auto"
		    :body-style="{ padding: '0px' }">
			<img src="~assets/news_top.png"
			    class="image">
			<div class="article-box">
				<div class="news-box">
					<h2 class="news-title"
					    v-html="form.title"></h2>
					<div class="news-detail">
						<span><b>作者：</b><span v-html="form.author"></span></span> &nbsp; &nbsp;
						<span><b>更新时间：</b><span v-html="form.publishDate"></span></span>
					</div>
					<pre class="news-text"
					    v-html="article"></pre>
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
import mammoth from "mammoth/mammoth.browser";
import userDate from "../common/UserDate.vue";
import menu from "../../assets/json/articleMenu.json";

export default {
  components: {
    mammoth,
    userDate
  },
  data: function() {
    return {
      fileList: [],
      article: "",
      disablePreview: true,
      dialogVisible: false,
      isLoading: false,
      // avatarShow: 'hidden',
      form: {
        categoryId: "",
        publishDate: "",
        title: "",
        author: "",
        image: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur"
          }
        ],
        categoryId: [
          {
            required: true,
            message: "请选择所属板块",
            trigger: "change"
          }
        ]
      },
      groups: menu
    };
  },
  mounted() {
    this.initPage();
  },
  computed: {
    // 按钮禁用控制
    btnActive: function() {
      let _form = this.form;
      if (
        _form.categoryId &&
        _form.title &&
        _form.publishDate &&
        _form.author &&
        this.article
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    initPage() {
      const self = this;
      let _form = this.form;
      // 修改文章时的数据
      let _row = this.$store.state.row;
      this.$refs["form"].clearValidate();
      if (_row) {
        _form.id = _row.id;
        _form.title = _row.title;
        _form.author = _row.author;
        _form.publishDate = _row.publishDate;
        _form.categoryId = _row.categoryId;
        // this.changeCate(_row.categoryId);
        _form.image = _row.url;

        // 获取文章内容
        this.$axios
          .post("../manage/article/view", {
            id: _row.id
          })
          .then(res => {
            self.article = res.data.data.content;
            self.disablePreview = false;
          });
      }
    },
    clearPage() {
      const self = this;
      this.form = {};
      this.article = "";
      this.fileList = [];
      this.disablePreview = true;
      // this.avatarShow = 'hidden';
      this.$refs["form"].clearValidate();
      this.$refs["userDate"].init();
    },
    getAuthor(res) {
      this.form.author = res;
    },
    getDate(res) {
      this.form.publishDate = res;
    },
    // changeCate(cate) {
    // 	if (cate == 811) {
    // 		this.avatarShow = '';
    // 	} else {
    // 		this.avatarShow = 'hidden';
    // 	}
    // },
    imageSuccess(res, file) {
      this.form.image = file.response.data.url;
    },
    beforeImageUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    hintUpload(file) {
      const _form = this.form;
      const isDocx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isLt = file.size / 1024 / 1024 < 10;
      const isFilled =
        !!_form.categoryId &&
        !!_form.title &&
        !!_form.author &&
        !!_form.publishDate;
      if (!isFilled) {
        this.$message.error("请先填写标题、作者、板块、日期");
        return false;
      }
      if (!isDocx) {
        this.$message.error("文件格式不正确");
        return false;
      }
      if (!isLt) {
        this.$message.error("文件超过大小限制");
        return false;
      }
      return isDocx && isLt && isFilled;
    },
    onPreview() {
      this.dialogVisible = true;
    },
    getData(file, fileList) {
      var self = this;
      var reader = new FileReader();
      reader.onload = function(loadEvent) {
        var arrayBuffer = loadEvent.target.result;
        mammoth
          .convertToHtml({
            arrayBuffer: arrayBuffer
          })
          .then(function(result) {
            self.disablePreview = false;
            self.article = result.value;
          })
          .done();
      };
      reader.readAsArrayBuffer(file.raw);
    },
    onSubmit(formName) {
      const self = this;
      let _url = "../manage/article/save";
      self.isLoading = true;
      self.$refs[formName].validate(valid => {
        if (valid) {
          let _json = {
            title: self.form.title,
            publishDate: self.form.publishDate,
            author: self.form.author,
            categoryId: self.form.categoryId,
            content: self.article,
            image: self.form.image
          };
          if (this.$store.state.row) {
            _json.id = self.form.id;
            _url = "../manage/article/update";
          }
          debugger;
          self.$axios.post(_url, _json).then(res => {
            var _res = res.data;
            if (_res.state === "success") {
              self.$message({
                type: "success",
                message: _res.msg
              });
              self.clearPage();
            } else {
              self.$message.error(_res.msg);
            }
            self.isLoading = false;
            if (this.$store.state.row) {
              this.$router.push("/newsList");
            }
          });
        }
      });
    }
  }
};
</script>

<style>
.item-width {
  width: 360px !important;
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
  border-color: #409eff;
}
</style>
