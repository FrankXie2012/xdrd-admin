<template>
<div>
    <div class="welcome">
        <img src="~assets/welcome.png" class="image">
        <p><b>你好，</b><span>{{role}}</span> <span>{{name}}</span></p>
        <p>欢迎使用徐墩人大后台管理系统</p>
    </div>
</div>
</template>

<script>
export default {
    data: function() {
        return {}
    },
    computed: {
        role: function() {
            switch (this.$store.state.role) {
                case 'admin':
                    return '管理员';
                case 'audit':
                    return '审核员';
                case 'publish':
                    return '发布员';
            }
        },
        name: function() {
            return this.$store.state.name;
        }
    }
}
</script>

<style scoped>
.welcome {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -120px;
    text-align: center;
}
.welcome p {
    line-height: 40px;
}
</style>
