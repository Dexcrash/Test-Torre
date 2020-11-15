<template>
  <v-container>
    <h1>Prueba</h1>
    <v-form ref="basicForm">
      <v-text-field
        v-model="name"
        :counter="50"
        :rules="nameRules"
        required
        label="Team Name"
        outlined
      >
      </v-text-field>

      <v-text-field v-model="description" required label="Description" outlined>
      </v-text-field>

      <v-select
        v-model="profilesSelected"
        :items="profilesTypes"
        :menu-props="{ maxHeight: '400' }"
        :rules="profilesRules"
        label="Profiles for your team"
        multiple
        hint="Select how many types of profiles do you need in your team"
        persistent-hint
      ></v-select>

      <v-row justify="center">
        <v-col
          v-for="(item, index) in profiles"
          v-bind:key="index"
          cols="12"
          md="3"
        >
          <v-card class="pa-5">
            <h3>Profile #{{ index }}</h3>
            <br />
            <v-text-field
              v-model="item.name"
              required
              label="Profile Name"
              outlined
            >
            </v-text-field>

            <v-text-field
              v-model="item.description"
              required
              label="Profile Description"
              outlined
            >
            </v-text-field>
            <v-select
              v-model="item.skills"
              :items="skills"
              :menu-props="{ height: '400' }"
              label="Select skills for this profile"
              multiple
              chips
              hint="Select many skills as you consider necessary"
              persistent-hint
            ></v-select>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="basicFormCompleted" justify="center">
        <v-col cols="12" md="6">
          <h3>Team Personality</h3>
          <br />
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
            <v-btn> Personalized </v-btn>
            <v-btn
              v-for="(item, index) in teamPersonalities"
              v-bind:key="index"              
            >
              {{ item.name }}
            </v-btn>
          </v-btn-toggle>
          <v-slider
            v-for="(item, index) in personalityTraits"
            v-bind:key="index"
            v-model="teamPersonalityTraits[index]"
            step="0.5"
            thumb-label
            :max="5"
            :min="1"
            ticks
          >
            <template v-slot:prepend>
              <div class="text--secondary" style="width: 6rem">
                <span class="d-inline-block" style="max-width: 100px">
                  {{ item.pre }}
                </span>
              </div>
            </template>

            <template v-slot:append>
              <div class="text--secondary" style="width: 6rem">
                <span class="d-inline-block" style="max-width: 100px">
                  {{ item.post }}
                </span>
              </div>
            </template>
          </v-slider>
        </v-col>
        <v-col cols="12" md="6">
          <h3>Organization Culture</h3>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in
            dapibus ante, a blandit metus. Nulla gravida eros augue, lacinia
            dictum sem tincidunt in. Sed nec consequat quam, non posuere enim.
            Vestibulum mattis enim non lectus suscipit, condimentum malesuada
            nisi luctus.
          </p>
          <v-select
            v-model="teamProCultureTraits"
            :items="proCultureTraits"
            :menu-props="{ height: '400' }"
            label="Select skills for this profile"
            multiple
            chips
            hint="Select many skills as you consider necessary"
            persistent-hint
          ></v-select>
        </v-col>
      </v-row>
    </v-form>
    <v-btn v-if="!basicFormCompleted" color="warning" @click="validate">
      Test
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "TeamForm",

  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    description: "",
    basicFormCompleted: false,
    profilesTypes: ["Designer", "Engineer", "Administrative"],
    profilesRules: [(v) => v.length <= 2 || "Select less than 3 profiles"],
    profilesSelected: [],
    skills: [
      "Skill1",
      "Skilasasasl2",
      "Sksfsfsill3",
      "Skilsfdsdfsl4",
      "Skisfsfsfll5",
      "Skilsfsfsfsfsfsl6",
      "Skiassaasll7",
      "Skill8",
      "Skill9",
      "Skill10",
      "Skill11",
      "Skill12",
      "Skill13",
      "Skill14",
      "Skill15",
      "Skill16",
      "Skill17",
    ],
    personalityTraits: [
      { pre: "Solitary/\nreserved", post: "Outgoing/\nenergetic" },
      { pre: "Consistent/\ncautious", post: "Inventive/\ncurious" },
      { pre: "Easy-going/\nspontaneous", post: "Efficient/\norganized" },
      { pre: "Competitive/\nargumentative", post: "Friendly/\ncompassionate" },
      { pre: "Sly/\navaricious", post: "Sincere/\nmodest" },
      { pre: "Secure/\nconfident", post: "Sensitive/\nmodest" },
    ],
    typeOfPersonalityTraits: "0",
    teamPersonalities: [
      { name: "Balanced", traits: [3, 3, 3, 3, 3, 3] },
      { name: "Startup!", traits: [4, 4.5, 3.5, 3, 4, 3.5] },
      { name: "Conservative", traits: [3, 3, 4.5, 4, 4.5, 3.5] },
    ],
    teamPersonalityTraits: [3, 3, 3, 3, 3, 3],
    proCultureTraits: [
      "Skill1",
      "Skilasasasl2",
      "Sksfsfsill3",
      "Skilsfdsdfsl4",
      "Skisfsfsfll5",
      "Skilsfsfsfsfsfsl6",
      "Skiassaasll7",
      "Skill8",
      "Skill9",
      "Skill10",
      "Skill11",
      "Skill12",
      "Skill13",
      "Skill14",
      "Skill15",
      "Skill16",
      "Skill17",
    ],
    teamProCultureTraits: [],
  }),
  computed: {
    profiles: function () {
      let profiles = [];
      this.profilesSelected.forEach(() => {
        profiles.push({
          name: "",
          description: "",
          skills: [],
        });
      });
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
  },
  methods: {
    test() {
      console.log("Entro");
      this.profiles.forEach((item) => {
        console.log(item.name);
        console.log(item.description);
      });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    validate() {
      this.basicFormCompleted = this.$refs.basicForm.validate();
    },
    setPersonalityTraits() {      
      let index = this.typeOfPersonalityTraits - 1;
      this.teamPersonalityTraits = this.teamPersonalities[index].traits;
    },
  },
};
</script>
