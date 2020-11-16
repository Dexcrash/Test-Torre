import Vue from 'vue'
import Vuex from 'vuex'
import myApi from '../api/myProxyTorre'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //Team's information
    teamName: "",
    teamDescription: "",
    profilesSelected: 0,
    typeOfPersonalityTraits: "0",
    teamPersonalityTraits: [3, 3, 3, 3, 3, 3],    
    teamProCultureTraits: [],
    profiles : [],
    skills: [],
    listsOfProfiles:[]
  },
  mutations: {
    teamName (state, name) {
      state.teamName = name
    },
    teamDescription (state, description) {
      state.teamDescription = description
    },
    profilesSelected (state, selected) {
      state.profilesSelected = selected
    },
    typeOfPersonalityTraits (state, type ){
      state.typeOfPersonalityTraits = type
    },
    teamPersonalityTraits (state, team){
      state.teamPersonalityTraits = team
    },
    teamProCultureTraits(state, teamProCultureTraits){
      state.teamProCultureTraits = teamProCultureTraits
    },
    profiles (state, profiles){
      state.profiles = profiles
    },
    skills (state, skills){
      state.skills = skills
    },
    proCulture (state, proCulture){
      state.proCulture = proCulture
    },
    listsOfProfiles (state, listsOfProfiles){
      state.listsOfProfiles = listsOfProfiles
    },
  },
  actions: {
    updateTeamInfo (context, infoObject) {
      context.commit('teamName', infoObject.teamName)
      context.commit('teamDescription', infoObject.teamDescription)
      context.commit('profilesSelected', infoObject.profilesSelected)
      context.commit('typeOfPersonalityTraits', infoObject.typeOfPersonalityTraits)
      context.commit('teamPersonalityTraits', infoObject.teamPersonalityTraits)
      context.commit('teamProCultureTraits', infoObject.teamProCultureTraits)
      context.commit('profiles', infoObject.profiles)      
    },
    setSkills: (state) => {
      myApi.get('/skills').then(response => state.commit('skills', JSON.parse(JSON.stringify(response.data))))
    },
    setProCulture: (state) => {
      myApi.get('/professionalCulture').then(response => state.commit('proCulture', JSON.parse(JSON.stringify(response.data))))
    },
    setListsOfProfiles: (state, profiles) => {
      myApi.post('/userProfiles', profiles).then(response => state.commit('listsOfProfiles', JSON.parse(JSON.stringify(response.data))))
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  getters: {
    teamInfo(state){
      return {
        teamName : state.teamName,
        teamDescription: state.teamDescription,
        profilesSelected: state.profilesSelected,
        typeOfPersonalityTraits: state.typeOfPersonalityTraits,
        teamPersonalityTraits: state.teamPersonalityTraits,
        teamProCultureTraits: state.teamProCultureTraits,
      }
    },
    getSkills(state) {
      return state.skills
    },
    getProCulture(state) {
      return state.proCulture
    },
    getProfiles(state) {
      return state.listsOfProfiles
    },
  }
})
