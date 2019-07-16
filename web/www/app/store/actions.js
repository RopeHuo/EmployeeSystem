import axios from "axios"

async function addusers(form) {
    const { result } = await axios.post('/api/adduser', form).then((res) => res.data)
}
async function getinfos(commit){
    const {result }  = await axios.get("/api/list").then((res)=>res.data)
    commit("getinfos", result)
}
async function delUsers(commit,state){
    const { result } = await axios.delete(`/api/deluser?id=${state.id}`).then((res) => res.data)
}
async function searchs(commit,state){
    const result = await axios.get(`/api/search?name=${state}`).then((res) => res.data)
    commit("searchinfo", result)
}
async function logins(commit,{age,pass}){

    const result = await axios.post('/api/login',{age,pass}).then((res) => res.data)
    console.log(result)
}
export default {
    adduser({ commit, state }, { form }) {
        addusers(form)
    },
    getinfo({commit}){
        getinfos(commit)
    },
    delUser({commit},id){
        delUsers(commit,id)
    },
    search({ commit }, info){
        searchs(commit, info)
    },
    setinfo({commit},info){
        delUsers(commit, info)
        commit("setinfo",info)
    },
    login({commit},loginInfo){
        logins(commit, loginInfo)
    }
}