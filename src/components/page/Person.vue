<template>
<div>
    <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="修改用户名" name="first">
            <div class="form-box">
                <el-form ref="form1" :model="form1" :rules="rules1" label-width="80px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="form1.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :disabled="btn1Active" :loading="isLoading" @click="editName('form1')">提交</el-button>
                        <el-button @click="resetForm('form1')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
            <div class="form-box">
                <el-form ref="form2" :model="form2" :rules="rules2" label-width="100px">
                    <el-form-item label="原密码" prop="old">
                        <el-input type="password" v-model="form2.old" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new">
                        <el-input type="password" v-model="form2.new" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="重复新密码" prop="repeat">
                        <el-input type="password" v-model="form2.repeat" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :disabled="btn2Active" :loading="isLoading" @click="editPass('form2')">提交</el-button>
                        <el-button @click="resetForm('form2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
    </el-tabs>

</div>
</template>

<script>
export default {
    data: function() {
        return {
            activeName: 'first',
            isLoading: false,
            form1: {
                name: ''
            },
            rules1: {
                name: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 8,
                        message: '长度在 2 到 8 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            form2: {
                old: '',
                new: '',
                repeat: ''
            },
            rules2: {
                old: [{
                    required: true,
                    message: '请输入原密码',
                    trigger: 'blur'
                }],
                new: [{
                        required: true,
                        message: '必填',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 10,
                        message: '长度在6到10个字符',
                        trigger: 'blur'
                    }
                ],
                repeat: [{
                    required: true,
                    message: '必填',
                    trigger: 'blur'
                }]
            }
        }
    },
    computed: {
        btn1Active: function() {
            let form = this.form1;
            if (form.name) {
                return false;
            } else {
                return true;
            }
        },
        btn2Active: function() {
            let form = this.form2;
            if (form.old && form.new && form.repeat) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        editName(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.isLoading = true;
                    self.$axios.post('../manage/user/updateName', self.form1).then((res) => {
                        var _res = res.data;
                        if (_res.state === 'success') {
                            self.$message({
                                type: 'success',
                                message: _res.msg
                            });
                            // 设置header中名字
                            self.$store.commit('setLogin', {
                                name: self.form1.name,
                                role: self.$store.state.role
                            });
                            self.form1 = {};
                            self.$refs[formName].resetFields();
                        } else {
                            self.$message.error(_res.msg);
                        }
                        self.isLoading = false;
                    });
                }
            });
        },
        editPass(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (self.form2.new === this.form2.old) {
                    self.$message.error('新旧密码必须不同');
                    return;
                }
                if (self.form2.repeat !== this.form2.new) {
                    self.$message.error('两次密码不一致');
                    return;
                }
                if (valid) {
                    let _json = {
                        oldPwd: self.form2.old,
                        newPwd: self.form2.new
                    };
                    self.isLoading = true;
                    self.$axios.post('../manage/user/modifyPwd', _json).then((res) => {
                        var _res = res.data;
                        if (_res.state === 'success') {
                            self.$message({
                                type: 'success',
                                message: _res.msg
                            });
                            self.form2 = {};
                            self.$refs[formName].resetFields();
                        } else {
                            self.$message.error(_res.msg);
                        }
                        self.isLoading = false;
                    });
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }

}
</script>
