<template>
<div class="table">
    <div class="handle-box">
        <el-input v-model="select_name" placeholder="昵称搜索" class="handle-input" @change="searchName"></el-input>
        <el-input v-model="select_username" placeholder="用户名搜索" class="handle-input" @change="searchUsername"></el-input>
        <el-button icon="el-icon-close" @click="clear">清空条件</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="newUser">人员新增</el-button>
        <!-- <el-button type="danger" icon="el-icon-delete" :disabled="btnDisabled" @click="delMulti">批量删除</el-button> -->
        <el-button type="info" icon="el-icon-refresh" :disabled="resetDisabled" @click="resetPwd">重置密码</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="selectChange" @row-click="setCurRow">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名" width="120">
        </el-table-column>
        <el-table-column prop="name" label="昵称" width="100">
        </el-table-column>
        <el-table-column label="角色" width="130">
            <template slot-scope="scope">
                <el-tag size="small" type="info" v-if="scope.row.role === 'admin'">管理员</el-tag>
                <el-tag size="small" type="success" v-if="scope.row.role === 'audit'">审阅员</el-tag>
                <el-tag size="small" v-if="scope.row.role === 'publish'">发布员</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="lasttime" label="上次登录时间" width="120">
        </el-table-column>
        <el-table-column prop="desc" label="描述">
        </el-table-column>
        <el-table-column label="操作" width="180">
            <template scope="scope">
                <el-button size="small"
                        @click="updateRole(scope.$index, scope.row)">设置权限</el-button>
                <el-button size="small" :type="parseInt(scope.row.delFlag) ? '' : 'danger'"
                        @click="delOne(scope.$index, scope.row)">{{parseInt(scope.row.delFlag) ? '启用' : '注销'}}</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
        </el-pagination>
    </div>

    <!-- 设置权限 -->
    <el-dialog title="设置角色" :visible.sync="roleDialog">
        <el-radio v-model="roleRadio" label="admin">管理员</el-radio>
        <el-radio v-model="roleRadio" label="audit">审阅员</el-radio>
        <el-radio v-model="roleRadio" label="publish">发布员</el-radio>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="isLoading" @click="setRole">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            cur_page: 1,
            multipleSelection: [],
            select_name: '',
            select_username: '',
            btnDisabled: true,
            resetDisabled: true,
            roleDialog: false,
            roleRadio: '',
            curRow: {},
            total: 0,
            pageSize: 10,
            isLoading: false
        }
    },
    created() {
        this.getData();
    },
    watch: {
        select_name() {
            this.getData();
        },
        select_username() {
            this.getData();
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        searchName() {
            this.getData();
        },
        searchUsername() {
            this.getData();
        },
        clear() {
            this.select_name = '';
            this.select_username = '';
        },
        selectChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length > 0) {
                this.btnDisabled = false;
            } else {
                this.btnDisabled = true;
            }
            if (this.multipleSelection.length === 1) {
                this.resetDisabled = false;
            } else {
                this.resetDisabled = true;
            }
        },
        setCurRow(row) {
            this.curRow = row;
        },
        getData() {
            const self = this;
            self.$axios.post('../manage/user/list', {
                page: self.cur_page,
                name: self.select_name,
                username: self.select_username,
                size: self.pageSize
            }).then((res) => {
                self.tableData = res.data.list;
                self.total = res.data.total;
            });
        },
        // 角色弹窗
        updateRole(index, row) {
            this.roleDialog = true;
            this.roleRadio = row.role;
        },
        // 设置权限
        setRole() {
            var self = this;
            if (self.roleRadio === self.curRow.role) {
                self.roleDialog = false;
                return;
            }
            self.isLoading = true;
            self.$axios.post('../manage/user/updateRole', {
                id: self.curRow.id,
                role: self.roleRadio
            }).then((res) => {
                let _res = res.data;
                if (_res.state === 'success') {
                    self.roleDialog = false;
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
        delOne(index, row) {
            const self = this;
            const _hint = parseInt(row.delFlag) ? '启用' : '注销';
            self.$alert('确定' + _hint + '用户 "' + row.name + '" ？', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    self.$axios.post('../manage/user/delete', {
                        ids: row.id
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
        // delMulti() {
        //     const self = this,
        //         length = self.multipleSelection.length;
        //     let _ids = self.multipleSelection.map(a => a.id).join(',');
        //     self.$alert('确定删除选中的 ' + length + ' 位用户吗？', '提示', {
        //         confirmButtonText: '确定',
        //         callback: action => {
        //             self.$axios.post('../manage/user/delete', {
        //                 ids: _ids
        //             }).then((res) => {
        //                 let _res = res.data;
        //                 if (_res.state === 'success') {
        //                     self.$message({
        //                         type: 'success',
        //                         message: _res.msg
        //                     });
        //                     self.getData();
        //                 } else {
        //                     self.$message.error(_res.msg);
        //                 }
        //             });
        //             self.multipleSelection = [];
        //         }
        //     });
        // },
        newUser() {
            this.$router.push('/addUser');
        },
        resetPwd() {
            const self = this;
            let _row = this.multipleSelection[0];
            this.$alert('重置用户 "' + _row.username + '" 的密码为：123456', '重置密码', {
                confirmButtonText: '确定',
                callback: action => {
                    self.$axios.post('../manage/user/resetPwd', {
                        username: _row.username
                    }).then((res) => {
                        let _res = res.data;
                        if (_res.state === 'success') {
                            self.$message({
                                type: 'success',
                                message: _res.msg
                            });
                        } else {
                            self.$message.error(_res.msg);
                        }
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
.handle-input {
    width: 200px;
}
</style>
