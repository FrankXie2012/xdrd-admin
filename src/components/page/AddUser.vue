<template>
<div>
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" class="item-width"></el-input>
        </el-form-item>
        <el-form-item label="昵称/姓名" prop="name">
            <el-input v-model="form.name" class="item-width"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
            <el-radio-group v-model="form.role">
                <el-radio label="admin">管理员</el-radio>
                <el-radio label="audit">审阅员</el-radio>
                <el-radio label="publish">发布员</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="其他说明" prop="desc">
            <el-input v-model="form.desc" class="item-width"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="btnActive" :loading="isLoading" @click="onSubmit('form')">新增人员</el-button>
            <el-button @click="onBack">返回列表</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    data: function() {
        return {
            isLoading: false,
            form: {
                username: '',
                name: '',
                role: '',
                desc: ''
            },
            rules: {
                username: [{
                    required: true,
                    message: '必填',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    message: '必填',
                    trigger: 'blur'
                }],
                role: [{
                    required: true,
                    message: '必填',
                    trigger: 'blur'
                }],
            }
        }
    },
    computed: {
        // 登录按钮禁用控制
        btnActive: function() {
            let form = this.form;
            if (form.username && form.name && form.role) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        onSubmit(formName) {
            const self = this;
            self.isLoading = true;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.$axios.post('../manage/user/save', self.form).then((res) => {
                        var _res = res.data;
                        if (_res.state === 'success') {
                            self.$message({
                                type: 'success',
                                message: _res.msg
                            });
                            self.form = {};
                            self.$refs[formName].resetFields();
                            this.$router.push('/users');
                        } else {
                            self.$message.error(_res.msg);
                        }
                        self.isLoading = false;
                    });
                }
            });
        },
        onBack() {
            this.$router.push('/users');
        }
    }
}
</script>

<style>
.item-width {
    width: 360px;
}
</style>
