<template>
  <v-container primary style="width: 60%; margin-right: 20%; padding:0">
    <br/>
    <h1 class="ma-5">Team Builder</h1>
    <v-form class="ma-5" ref="basicForm">
      <v-text-field
        v-model="teamName"
        :counter="50"
        :rules="nameRules"
        required
        label="Team Name"
        outlined
        color="#cddc39"
      >
      </v-text-field>

      <v-text-field 
        v-model="teamDescription"
        :rules="descriptionRules"
        required
        label="Description"
        outlined
        color="#cddc39"
      >
      </v-text-field>

      <v-select
        v-model="profilesSelected"
        :items="profilesTypes"
        :menu-props="{ maxHeight: '400' }"
        :rules="profilesRules"
        label="Profiles for your team"
        hint="Select how many types of profiles do you need in your team"
        persistent-hint
        color="#cddc39"
        item-color="#cddc39"
      ></v-select>

      <v-row justify="center">
        <v-col
          v-for="(item, index) in profiles"
          v-bind:key="index"
          cols="12"
          md="4"
        >
          <v-card class="pa-6">
            <h3>Profile #{{ index + 1 }}</h3>
            <br />
            <v-text-field
              v-model="item.name"
              :rules="nameRules"
              required
              label="Profile Name"
              outlined
              color="#cddc39"
            >
            </v-text-field>

            <v-text-field
              v-model="item.description"
              :rules="descriptionRules"
              required
              label="Profile Description"
              outlined
              color="#cddc39"
            >
            </v-text-field>
            <v-select
              v-model="item.skills"
              :items="skills"
              :menu-props="{ height: '400' }"
              :rules="skillsRules"
              label="Select skills for this profile"
              multiple
              chips
              hint="Select many skills as you consider necessary"
              persistent-hint
              color="#cddc39"
              item-color="#cddc39"
            ></v-select>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="basicFormCompleted" justify="center">
        <v-col cols="12" md="6" class="pa-10">
          <h2>Team Personality</h2>
          <hr />
          <br/>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in
            dapibus ante, a blandit metus. Nulla gravida eros augue, lacinia
            dictum sem tincidunt in. Sed nec consequat quam, non posuere enim.
            Vestibulum mattis enim non lectus suscipit, condimentum malesuada
            nisi luctus.
          </p>

          <v-btn-toggle
            v-on:change="setPersonalityTraits"
            v-model="typeOfPersonalityTraits"
            mandatory
          >
            <v-btn
              v-for="(item, index) in teamPersonalities"
              v-bind:key="index"
            >
              {{ item.name }}
            </v-btn>
          </v-btn-toggle>
          <br/>
          <br/>
          <SlidersGroup
            :setPersonalityTraits="setPersonalityTraits"
            :personalityTraits="personalityTraits"
            :teamPersonalityTraits="teamPersonalityTraits"
          ></SlidersGroup>
        </v-col>
        <v-col cols="12" md="6" class="pa-10">
          <h2>Organization Culture</h2>
          <hr />
          <br/>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in
            dapibus ante, a blandit metus. Nulla gravida eros augue, lacinia
            dictum sem tincidunt in. Sed nec consequat quam, non posuere enim.
            Vestibulum mattis enim non lectus suscipit, condimentum malesuada
            nisi luctus.
          </p>
          <v-select
            v-model="teamProCultureTraits"
            :items="proCulture"
            :menu-props="{ height: '400' }"
            :rules="cultureRules"
            label="Select skills for this profile"
            multiple
            chips
            hint="Select culture traits that align with your organization"
            persistent-hint
            color="#cddc39"
            item-color="#cddc39"
          ></v-select>
        </v-col>
      </v-row>
    </v-form>
    <br/>
    <v-flex align-self="center" style="background-color: #cddc39" class="pa-5">
      <v-btn v-if="!basicFormCompleted" color="primary" @click="validate">
        Traits and Culture!
      </v-btn>
    </v-flex>

    <v-flex align-self="center" style="background-color: #cddc39" class="pa-5">
      <v-btn v-if="basicFormCompleted" color="primary" @click="validate">
        Search my dream team!
      </v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import SlidersGroup from "../components/SlidersGroup";

export default {
  name: "TeamForm",
  components: {
    SlidersGroup,
  },
  data: () => ({
    //Team's information
    teamName: "",
    teamDescription: "",
    profilesSelected: 0,
    typeOfPersonalityTraits: "0",
    teamPersonalityTraits: [3, 3, 3, 3, 3, 3],    
    teamProCultureTraits: [],    
    //validators
    valid: true,
    basicFormCompleted: false,
    //Rules for inputs
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 25) || "Name must be less than 25 characters",
    ],
    descriptionRules:[
      (v) => !!v || "Description is required",
    ],
    profilesRules: [(v) => v >= 2 || "Select at less 2"],
    skillsRules: [(v) => v.length >= 2 || "Select at less 2"],
    cultureRules: [(v) => v.length <= 5 || "Select only a top 5 of culture traits"],
    //Data static    
    profilesTypes: [ "2", "3"],
    personalityTraits: [
      { pre: "Solitary/\nreserved", post: "Outgoing/\nenergetic" },
      { pre: "Consistent/\ncautious", post: "Inventive/\ncurious" },
      { pre: "Easy-going/\nspontaneous", post: "Efficient/\norganized" },
      { pre: "Competitive/\nargumentative", post: "Friendly/\ncompassionate" },
      { pre: "Sly/\navaricious", post: "Sincere/\nmodest" },
      { pre: "Secure/\nconfident", post: "Sensitive/\nmodest" },
    ],
    teamPersonalities: [
      { name: "Personalized", traits: [3.5, 3.5, 3.5, 3.5, 3.5, 3.5] },
      { name: "Balanced", traits: [3.5, 3.5, 3.5, 3.5, 3.5, 3.5] },
      { name: "Startup!", traits: [4, 4.5, 3.5, 3, 4, 3.5] },
      { name: "Conservative", traits: [3, 3, 4.5, 4, 4.5, 3] },
    ]
  }),
  created() {
    this.getSkills();
    this.getProCulture();
  },
  computed: {
    //skills for profiles
    skills (){
      let parse = []
      this.$store.getters.getSkills.forEach( item => {parse.push(item.value)})
      return parse
    },
    //professional Culture traits
    proCulture (){
      let parse = []
      this.$store.getters.getProCulture.forEach( item => {parse.push(item.text)})
      return parse
    },
    //generate profilees array from selected number of profiles
    profiles: function () {
      let profiles = [];
      for (let i = 0;i<this.profilesSelected;i++){
        profiles.push({
          name: "",
          description: "",
          skills: [],
        });
      }
      return profiles;
    },

    // reviews if all profiles forms are complete
    profilesCompleted: function () {
      let res = true;
      this.profiles.forEach((item) => {
        if (!item.name && item.name == "") res = false;
        if (!item.description && item.description == "") res = false;
        if (!item.skills && item.skills.length > 2) res = false;
      });
      return res;
    },
  },
  methods: {
    // validate the form
    validate() {
      if(this.basicFormCompleted && this.$refs.basicForm.validate()){
        this.sendInfo();
        this.getProfiles();
        this.$router.push('results')
      }else {
        this.basicFormCompleted = this.$refs.basicForm.validate();
      }      
    },

    setPersonalityTraits() {
      let index = this.typeOfPersonalityTraits;
      this.teamPersonalityTraits = this.teamPersonalities[index].traits;
    },
    setPersonalized() {
      this.typeOfPersonalityTraits = 0;
    },
    sendInfo() {
      this.$store.dispatch('updateTeamInfo', {
      teamName: this.teamName,
      teamDescription :this.teamDescription,
      profilesSelected: this.profilesSelected,
      typeOfPersonalityTraits: this.typeOfPersonalityTraits,
      teamPersonalityTraits: this.teamPersonalityTraits,
      teamProCultureTraits: this.teamProCultureTraits,
      profiles: this.profiles
      })
    },
    getSkills () {
      this.$store.dispatch('setSkills')
    },
    getProCulture() {
      this.$store.dispatch('setProCulture')
    },
    getProfiles() {
      this.$store.dispatch('setListsOfProfiles', JSON.parse(JSON.stringify(this.profiles)))
    },
  },
};

</script>
