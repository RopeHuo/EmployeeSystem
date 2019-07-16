<template>
	<div>
		<el-input style="width:300px" v-model="input" placeholder="请输入要查询的人名"></el-input>
		<el-button @click="search" icon="el-icon-search" circle></el-button>
		 <el-table :data="$store.state.Homestate.searchinfo" style="width: 100%">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="name" prop="name"></el-table-column>			 	
            <el-table-column label="age" prop="age"></el-table-column>			 	
            <el-table-column label="tel" prop="tel"></el-table-column>			 	
            <el-table-column label="address" prop="address"></el-table-column>			 	
            <el-table-column label="date" prop="date"></el-table-column>
            <el-table-column label="sex" prop="sex"></el-table-column>			 	


        </el-table>
	</div>
</template>
 <script>
export default {
    data() {
        return {
			searchinfo:[],
           	input:""
        };
	},
	methods:{
		search(){
			this.$store.dispatch("search",this.input)
		}
	}
};
</script>