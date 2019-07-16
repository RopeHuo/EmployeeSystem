<template>
    <div style="width:500px">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="电话">
                <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="form.age"></el-input>
            </el-form-item>

            <el-form-item label="性别">
                <el-radio-group v-model="form.resource">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="出生日期">
                <el-col :span="11">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.date1"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
            <!-- 城市选择 -->
            <div>
                <el-form-item label="住址">
                    <select v-model="sheng">
                        <option v-for="item in info" :value="item.name">{{item.name}}</option>
                    </select>
                    <select v-model="shi">
                        <option
                            v-for="item in info.filter(i=>i.name == sheng)[0].city"
                            :value="item.name"
                        >{{item.name}}</option>
                    </select>
                    <select v-model="xian">
                        <option
                            v-for="item in info.filter(i=>i.name == sheng)[0].city.filter(i=>i.name == shi)[0].area"
                            :value="item"
                        >{{item}}</option>
                    </select>
                </el-form-item>
            </div>
            <!-- 城市选择 -->
            <el-form-item label="详细地址">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="infos">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import info from "../../../lib/info.js";
export default {
    data() {
        return {
            info,
            sheng: "广东省",
            shi: "广州市",
            xian: "天河区",
            form: {
                name: this.$store.state.Homestate.addinfo.name,
                date1: this.$store.state.Homestate.addinfo.date,
                resource: this.$store.state.Homestate.addinfo.sex,
                desc:"",
                address: this.$store.state.Homestate.addinfo.address,
                tel: this.$store.state.Homestate.addinfo.tel,
                age: this.$store.state.Homestate.addinfo.age
            }
        };
    },
    methods: {
        onSubmit() {
            this.form.address =
                this.sheng + this.shi + this.xian + this.form.desc;
            this.$store.dispatch("adduser", { form: this.form });
            //创建完之后清空
            this.form = {
                name: "",
                date1: "",
                resource: "",
                desc: "",
                address: "",
                tel: "",
                age: ""
            };
            this.$message("创建成功");
        },
        infos(){
            this.$message("取消信息可能丢失");
        }
    },
    watch: {
        //当data中的sheng变化的时候，触发这个函数
        sheng() {
            this.shi = info.filter(i => i.name == this.sheng)[0].city[0].name;
            this.xian = info
                .filter(i => i.name == this.sheng)[0]
                .city.filter(i => i.name == this.shi)[0].area[0];
        },
        //当data中的shi变化的时候，触发这个函数
        shi() {
            this.xian = info
                .filter(i => i.name == this.sheng)[0]
                .city.filter(i => i.name == this.shi)[0].area[0];
        }
    }
};
</script>