<template>
<div>
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="链接名称" prop="title">
            <el-input v-model="form.title" class="item-width"></el-input>
        </el-form-item>
        <el-form-item label="链接url" prop="url">
            <el-input v-model="form.url" class="item-width"></el-input>
        </el-form-item>
        <el-form-item label="链接顺序" prop="order">
            <el-select v-model="form.order" placeholder="链接顺序">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="isLoading" @click="onSubmit('form')">确定</el-button>
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
                linkId: '',
                title: '',
                url: '',
                order: ''
            },
            options: [{
                value: '1',
                label: '1'
            }, {
                value: '2',
                label: '2'
            }, {
                value: '3',
                label: '3'
            }, {
                value: '4',
                label: '4'
            }, {
                value: '5',
                label: '5'
            }, {
                value: '6',
                label: '6'
            }],
            rules: {
                order: [{
                    required: true,
                    message: '必填',
                    trigger: 'blur'
                }]
            }
        }
    },
    mounted() {
        const self = this;
        let _form = this.form;
        // 修改文章时的数据
        let _row = this.$store.state.row;
        this.$refs['form'].clearValidate();
        if (_row) {
            _form.linkId = _row.linkId;
            _form.title = _row.title;
            _form.url = _row.url;
            _form.order = _row.order;
        }
    },
    methods: {
        onSubmit(formName) {
            const self = this;
            self.isLoading = true;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.$axios.post('../manage/link/save', self.form).then((res) => {
                        var _res = res.data;
                        if (_res.state === 'success') {
                            self.$message({
                                type: 'success',
                                message: _res.msg
                            });
                            self.form = {};
                            self.$refs[formName].resetFields();
                            this.$router.push('/links');
                        } else {
                            self.$message.error(_res.msg);
                        }
                        self.isLoading = false;
                    });
                } else {
                    self.isLoading = false;
                }
            });
        },
        onBack() {
            this.$router.push('/links');
        }
    }
}
</script>

<style>
.item-width {
    width: 360px;
}
</style>
