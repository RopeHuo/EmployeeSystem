<template>
    <div id="wrap">
        <el-table :data="$store.state.Homestate.results" style="width: 100%">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="name" prop="name"></el-table-column>
            <el-table-column label="age" prop="age"></el-table-column>
            <el-table-column label="tel" prop="tel"></el-table-column>
            <el-table-column label="address" prop="address"></el-table-column>
            <el-table-column label="date" prop="date"></el-table-column>
            <el-table-column label="sex" prop="sex"></el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row,'/Add')">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";
export default {
    created() {
        this.$store.dispatch("getinfo");
    },
    data() {
        return {
            results: []
        };
    },
    methods: {
        handleDelete(a, { id }) {
            this.$store.dispatch("delUser", { id });
            this.$message("删除成功请刷新页面");
        },
        handleEdit(a,info,url){
            this.$router.push({ path: url });
            this.$store.dispatch("setinfo",info)
        }
    }
    
};
</script>