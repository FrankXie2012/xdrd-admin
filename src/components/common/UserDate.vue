<template>
<el-form label-width="80px">
	<el-form-item label="文章作者"
	    prop="author">
		<el-select v-model="author"
		    filterable
		    placeholder="请选择"
		    class="item-width"
		    @change="changeAuthor">
			<el-option v-for="user in users"
			    :key="user.id"
			    :label="user.name"
			    :value="user.name">
			</el-option>
		</el-select>
	</el-form-item>
	<el-form-item label="发布日期"
	    prop="publishDate">
		<el-date-picker v-model="publishDate"
		    type="date"
		    class="item-width"
		    :editable="false"
		    placeholder="选择日期"
		    value-format="yyyy-MM-dd"
		    @change="changeDate">
		</el-date-picker>
	</el-form-item>
</el-form>
</template>
<script>
export default {
	props: ['prop-author', 'prop-date'],
	data: function() {
		const _today = new Date();
		const _yyyy = _today.getFullYear();
		const _mm = _today.getMonth() + 1;
		const _dd = _today.getDate();
		return {
			users: [],
			publishDate: this.propDate || _yyyy + '-' + _mm + '-' + _dd,
			author: this.propAuthor || this.$store.state.name
		}
	},
	created: function() {
		this.init();
	},
	methods: {
		init: function() {
			this.$axios.post('../manage/user/authorList').then((res) => {
				this.users = res.data.data;
			});
			this.$emit('cauthor', this.author);
			this.$emit('cdate', this.publishDate);
		},
		changeAuthor: function() {
			this.$emit('cauthor', this.author);
		},
		changeDate: function() {
			this.$emit('cdate', this.publishDate);
		}
	}
}
</script>
<style scoped>
</style>
