<!-- 文章审核 -->
<template>
<div>
	<el-alert
		title="若内容为空，该友情链接不显示"
		:closable="false"
		type="info">
	</el-alert>
	<br>
  	<el-table :data="tableData"
	    border
	    style="width: 100%"
	    ref="linksTable">
		<el-table-column prop="title"
		    label="链接名称">
		</el-table-column>
		<el-table-column prop="url"
		    label="链接url">
		</el-table-column>
		<el-table-column prop="order"
		    label="排序"
		    width="100">
		</el-table-column>
		<el-table-column label="操作"
		    width="100">
			<template scope="scope">
                <el-button type="primary" size="small"
                    @click="editLink(scope.$index, scope.row)">修改</el-button>
            </template>
		</el-table-column>
	</el-table>
</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
            count: 0,
            addActive: true
		}
	},
	created() {
		this.getData();
    },
    watch: {
        count(val) {
            if (val > 5) {
                this.addActive = true;
            } else {
                this.addActive = false;
            }
        }
    },
	methods: {
		getData() {
			const self = this;
			self.$axios.post('../manage/link/list').then((res) => {
                self.tableData = res.data.list;
                self.count = res.data.list.length;
			});
        },
        editLink(index, row) {
            this.$store.commit('setLink', row);
			this.$router.push('/editLink');
        }
	}
}
</script>

<style scoped>
</style>
