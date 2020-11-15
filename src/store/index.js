import Vue from 'vue'
import Vuex from 'vuex'

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
    profiles(state) {
      let profiles = [];
      for (let i = 0;i<state.profilesSelected;i++){
        profiles.push({
          name: "",
          description: "",
          skills: [],
        });
      }
      return profiles;
    },
    profilesCompleted: function () {
      let res = true;
      this.profiles.forEach((item) => {
        if (!item.name && item.name == "") res = false;
        if (!item.description && item.description == "") res = false;
        if (!item.skills && item.skills.length > 2) res = false;
      });
      return res;
    },
  }
})
