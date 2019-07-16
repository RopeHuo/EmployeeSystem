export default{
    getinfos(state, payload){
        state.Homestate.results = payload
    },
    searchinfo(state, payload){
        state.Homestate.searchinfo = payload
    },
    setinfo(state,payload){
        state.Homestate.addinfo = payload
    }
}