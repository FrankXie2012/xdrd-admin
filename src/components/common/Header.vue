<template>
<div class="header">
    <div class="logo">徐墩人大 <small>后台管理系统</small></div>
    <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                {{name}}
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</div>
</template>
<script>
export default {
    computed: {
        name: {
            get() {
                return this.$store.state.name;
            },
            set(value) {
                this.$store.commit('setLogin', {
                    name: value,
                    role: this.$store.state.role
                });
            }
        }
    },
    watch: {
        name(val) {
            this.name = val;
        }
    },
    methods: {
        handleCommand(command) {
            const self = this;
            if (command == 'logout') {
                self.$axios.post('../manage/logout').then((res) => {
                    let _res = res.data;
                    if (_res.state === 'success') {
                        // 清空vuex中保存的用户数据
                        this.$store.commit('removeLogin');
                        this.$router.push('/login');
                    } else {
                        self.$message.error(_res.msg);
                    }
                });
            }
        }
    }
}
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
}

.header .logo {
    float: left;
    width: 250px;
    text-align: center;
}

.user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
}

.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}

.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-menu__item {
    text-align: center;
}

.hidden {
    display: none;
}
</style>
