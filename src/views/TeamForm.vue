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
            :items="proCultureTraits"
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
import router from '../router'
// import axios from 'axios'

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
    //Data from API & static
    skills: [],
    proCultureTraits: [],
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
    profiles: function () {
      let profiles = [];
      for (let i = 0;i<this.profilesSelected;i++){
        profiles.push({
          name: "",
          description: "",
          skills: [],
        });
      }
      console.log(this.profilesSelected)
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
    validate() {
      if(this.basicFormCompleted && this.$refs.basicForm.validate()){
        this.sendInfo();
        console.log("PASO")
        router.push('results')
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
    async getSkills() {
      // let res = await axios.get("https://search.torre.co/people/_search/?offset=0&size=2&aggregate=true")...
      let res = {
        aggregators: {
          opento: [
            {
              total: 175294,
              value: "advising",
            },
            {
              total: 234012,
              value: "freelance-gigs",
            },
            {
              total: 145969,
              value: "full-time-employment",
            },
            {
              total: 22280,
              value: "hiring",
            },
            {
              total: 149661,
              value: "internships",
            },
            {
              total: 155462,
              value: "mentoring",
            },
            {
              total: 147735,
              value: "part-time-employment",
            },
          ],
          remoter: [
            {
              total: 681029,
              value: "yes",
            },
            {
              total: 34105,
              value: "no",
            },
          ],
          skill: [
            {
              total: 35008,
              value: "Communication",
            },
            {
              total: 15460,
              value: "Marketing",
            },
            {
              total: 14234,
              value: "Customer Service",
            },
            {
              total: 10604,
              value: "Management",
            },
            {
              total: 7167,
              value: "Software Development",
            },
            {
              total: 3815,
              value: "Sales",
            },
            {
              total: 2414,
              value: "Social Media",
            },
            {
              total: 2004,
              value: "Data Entry",
            },
            {
              total: 1917,
              value: "Design",
            },
            {
              total: 1524,
              value: "Administration",
            },
            {
              total: 1163,
              value: "Finance",
            },
            {
              total: 1063,
              value: "Research",
            },
            {
              total: 956,
              value: "Business",
            },
            {
              total: 825,
              value: "Translation",
            },
            {
              total: 797,
              value: "Data Science",
            },
            {
              total: 755,
              value: "Coaching",
            },
            {
              total: 706,
              value: "Accounting",
            },
            {
              total: 661,
              value: "Education",
            },
            {
              total: 599,
              value: "Engineering",
            },
            {
              total: 599,
              value: "Human Resources",
            },
            {
              total: 463,
              value: "Consulting",
            },
            {
              total: 420,
              value: "Psychology",
            },
            {
              total: 362,
              value: "Transcription",
            },
            {
              total: 146,
              value: "Tutoring",
            },
            {
              total: 133,
              value: "Healthcare",
            },
            {
              total: 55,
              value: "Analyst",
            },
            {
              total: 28,
              value: "Public relations",
            },
            {
              total: 17,
              value: "Executive assistance",
            },
            {
              total: 13,
              value: "Therapy",
            },
            {
              total: 5,
              value: "Public health",
            },
            {
              total: 3,
              value: "Health sciences",
            },
          ],
          compensationrange: [
            {
              total: 114255,
              value: "USD$ 0-10/hourly",
            },
            {
              total: 17025,
              value: "USD$ 11-20/hourly",
            },
            {
              total: 8578,
              value: "USD$ 21-40/hourly",
            },
            {
              total: 3437,
              value: "USD$ 41-80/hourly",
            },
            {
              total: 1915,
              value: "USD$ 81-200/hourly",
            },
            {
              total: 7188,
              value: "USD$ >200/hourly",
            },
          ],
        },
        offset: 0,
        results: [
          {
            context: {
              signaled: null,
            },
            _meta: {
              ranker: {
                "@type": "and",
                rank: 1.0,
                score: null,
                and: [
                  {
                    "@type": "scorer",
                    rank: 248.0,
                    scorer: "weight",
                    score: null,
                    input: {
                      criteria: null,
                      person: {
                        weight: 2214.1466,
                      },
                    },
                  },
                  {
                    "@type": "scorer",
                    rank: 1.0,
                    scorer: "completion",
                    score: null,
                    input: {
                      criteria: null,
                      person: {
                        completion: 1.0,
                      },
                    },
                  },
                  {
                    "@type": "scorer",
                    rank: 1.0,
                    scorer: "grammar",
                    score: null,
                    input: {
                      criteria: null,
                      person: {
                        grammar: 1.0,
                      },
                    },
                  },
                ],
              },
              filter: null,
            },
            compensations: {
              freelancer: {
                amount: 899.0,
                currency: "USD$",
                periodicity: "hourly",
              },
            },
            locationName: "Texas, United States",
            name: "J. Andrés Tobacia",
            openTo: ["advising", "freelance-gigs", "hiring", "mentoring"],
            picture:
              "https://starrgate.s3.amazonaws.com:443/users/3bc89aa4b986ab3c8814012552b187853c7acbf1/profile_YJdN5gU.jpeg",
            professionalHeadline: "Founder at Anything Flows",
            remoter: true,
            skills: [
              {
                name: "Trustworthy",
                weight: 0.0,
              },
              {
                name: "Negotiation",
                weight: 0.0,
              },
              {
                name: "Project Management",
                weight: 0.0,
              },
              {
                name: "Languages",
                weight: 104.3314,
              },
              {
                name: "Valves",
                weight: 0.0,
              },
              {
                name: "Sales",
                weight: 42.5,
              },
              {
                name: "Logistics",
                weight: 42.5,
              },
              {
                name: "Supply Chain",
                weight: 42.5,
              },
              {
                name: "Small Team Management",
                weight: 0.0,
              },
              {
                name: "Trademarks",
                weight: 0.0,
              },
              {
                name: "Trademark & Copyright Prosecution",
                weight: 0.0,
              },
              {
                name: "patent",
                weight: 0.0,
              },
              {
                name: "Contract Management",
                weight: 0.0,
              },
              {
                name: "Outside sales",
                weight: 0.0,
              },
              {
                name: "Applications",
                weight: 0.0,
              },
              {
                name: "Negotiations",
                weight: 0.0,
              },
              {
                name: "Applications Manager",
                weight: 0.0,
              },
              {
                name: "Industrial Automation",
                weight: 0.0,
              },
              {
                name: "Industrial Engineering",
                weight: 0.0,
              },
              {
                name: "Engineering Management",
                weight: 0.0,
              },
              {
                name: "Fundraising",
                weight: 0.0,
              },
              {
                name: "Entrepreneurship",
                weight: 0.0,
              },
              {
                name: "Innovation",
                weight: 0.0,
              },
              {
                name: "Leadership",
                weight: 104.3314,
              },
              {
                name: "Future of work",
                weight: 0.0,
              },
              {
                name: "Quality management",
                weight: 0.0,
              },
              {
                name: "Business",
                weight: 917.742,
              },
              {
                name: "Engineering",
                weight: 960.242,
              },
              {
                name: "Social Media Management",
                weight: 0.0,
              },
              {
                name: "Marketing Digital",
                weight: 0.0,
              },
              {
                name: "Legal",
                weight: 0.0,
              },
              {
                name: "Patents",
                weight: 0.0,
              },
              {
                name: "SEO",
                weight: 0.0,
              },
              {
                name: "Web Analytics and Administration",
                weight: 0.0,
              },
            ],
            subjectId: "328062",
            username: "andresflows",
            verified: true,
            weight: 2214.1466,
          },
        ],
        size: 1,
        total: 715134,
      };

      let values = [];
      res.aggregators.skill.forEach((item) => {
        values.push(item.value);
      });
      this.skills = values;
    },

    async getProCulture() {
      let values = [];
      api_bios_camilosanchezsalamanca.professionalCultureGenomeResults.groups.forEach(
        (item) => {
          values.push(item.text);
        }
      );
      this.proCultureTraits = values;
    },
  },
};

const api_bios_camilosanchezsalamanca = {
  person: {
    professionalHeadline:
      "Web Developer, Scrum Master, Data Analyst and Data Scientist in progress...",
    completion: 0.9167,
    showPhone: false,
    created: "2019-10-25T23:37:04Z",
    verified: true,
    flags: {
      benefits: false,
      canary: false,
      enlauSource: false,
      fake: false,
      featureDiscovery: false,
      getSignaledBenefitsViewed: false,
      firstSignalSent: true,
      promoteYourselfBenefitsViewed: false,
      promoteYourselfCompleted: false,
      importingLinkedin: false,
      onBoarded: true,
      remoter: true,
      signalsFeatureDiscovery: true,
      signedInToOpportunities: true,
      importingLinkedinRecommendations: false,
      contactsImported: true,
      appContactsImported: false,
      genomeCompletionAcknowledged: true,
    },
    weight: 0,
    locale: "en",
    subjectId: 36567,
    picture:
      "https://starrgate.s3.amazonaws.com:443/users/d0d3b70d5fa633236297d5c47189f1d51e7aa434/profile_vguHfAi.jpg",
    hasEmail: true,
    name: "Camilo Sanchez Salamanca",
    links: [
      {
        id: "zNGLeRMx",
        name: "linkedin",
        address:
          "https://www.linkedin.com/in/camilo-andres-s%C3%A1nchez-salamanca-22b192147/",
      },
      {
        id: "8yZeqoGj",
        name: "github",
        address: "https://github.com/dexcrash",
      },
      {
        id: "vN8OdWey",
        name: "facebook",
        address: "https://facebook.com/camilo.sanchezsalamanca",
      },
    ],
    location: {
      name: "Bogota D.C., Colombia",
      latitude: 4.7109886,
      longitude: -74.072092,
      timezone: "America/Bogota",
      timezoneOffSet: -18000000,
    },
    theme: "orange400",
    id: "9MEAdQMl",
    pictureThumbnail:
      "https://starrgate.s3.amazonaws.com:443/CACHE/images/users/d0d3b70d5fa633236297d5c47189f1d51e7aa434/profile_vguHfAi/a2db6bc11abc17b347ed0d4202b21ef7.jpg",
    claimant: false,
    summaryOfBio:
      "I've had opportunity of support different entreprenure teams with some couching and work as expert in design thinking and agile methodoligies moreover with software developments too.\n\nDuring the last year I've been keen on in data analysis. I'm really passionate about visual analytics and mahcine learning algorithms.\n\nNow days I'm thinking in start my own business on data analysis, hoping use all my experience in design thinking and team management to become myself in a success entreprenur. Of course, hoping find good mentors in the way... ",
    weightGraph:
      "https://hcti.io/v1/image/2b6145b8-3236-44f0-b4de-cca5784adc62",
    publicId: "camilosanchezsalamanca",
  },
  stats: {
    strengths: 41,
    education: 2,
    interests: 14,
    jobs: 4,
    projects: 2,
  },
  strengths: [
    {
      id: "kNmvzDBM",
      code: 44573,
      name: "Investigation",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-07T14:25:05",
    },
    {
      id: "Vjwg39Gj",
      code: 34431,
      name: "Software Architecture",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:41:01",
    },
    {
      id: "nM4a6nkj",
      code: 55514,
      name: "Front End",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-07T13:58:17",
    },
    {
      id: "VjwGwgYj",
      code: 23826,
      name: "Vue.js",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-07T13:58:11",
    },
    {
      id: "pydPYq5y",
      code: 5475,
      name: "Mathematics And Statistics",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:21:00",
    },
    {
      id: "mjlpQP5j",
      code: 55906,
      name: "Java",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:20:52",
    },
    {
      id: "ZNOzl69y",
      code: 55269,
      name: "Communication skills",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:20:38",
    },
    {
      id: "9MB2lb9M",
      code: 55631,
      name: "Teaching",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:20:30",
    },
    {
      id: "kybWPpKN",
      code: 23295,
      name: "Caching",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:15:02",
    },
    {
      id: "zNGAlbnj",
      code: 55582,
      name: "Hadoop",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:06:05",
    },
    {
      id: "qNPWlLry",
      code: 32544,
      name: "SPARK",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:06:01",
    },
    {
      id: "RyD3l58j",
      code: 20890,
      name: "Big Data",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:05:56",
    },
    {
      id: "AMWkALBM",
      code: 135210,
      name: "Machine learning",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:05:52",
    },
    {
      id: "0yz3pRXN",
      code: 32056,
      name: "Python",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:05:46",
    },
    {
      id: "vN8kdxDy",
      code: 40587,
      name: "Data Science",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T04:05:41",
    },
    {
      id: "Ajr8rV0N",
      code: 20923,
      name: "Design",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T01:54:54",
    },
    {
      id: "JMeG0Wry",
      code: 54701,
      name: "Visual Analytics",
      additionalInfo: "",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T00:10:04",
    },
    {
      id: "kNmv242M",
      code: 91009,
      name: "Data Analytics",
      additionalInfo: "",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T00:09:51",
    },
    {
      id: "JMelBdaN",
      code: 55317,
      name: "Creativity",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:38:10",
    },
    {
      id: "bjA9qRvj",
      code: 18645,
      name: "Marketing",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:38:21",
    },
    {
      id: "8jp96o9y",
      code: 17766,
      name: "Resilience",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:38:35",
    },
    {
      id: "OMvrZo9M",
      code: 55192,
      name: "Attention to detail",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:38:43",
    },
    {
      id: "wM7GnRzM",
      code: 25720,
      name: "Web Development",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:41:01",
    },
    {
      id: "JyQeBA6y",
      code: 55170,
      name: "Analytics",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:41:01",
    },
    {
      id: "pydPYgDy",
      code: 55532,
      name: "Full Stack Development",
      additionalInfo: "",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2020-11-06T00:07:39",
    },
    {
      id: "kNm6adXM",
      code: 55266,
      name: "Communication",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:38:06",
    },
    {
      id: "EM3e5Vmy",
      code: 55684,
      name: "UX Design",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:38:01",
    },
    {
      id: "eynrEdRy",
      code: 56334,
      name: "UI Design",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:36:05",
    },
    {
      id: "kyb0kO7M",
      code: 50182,
      name: "React",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:35:37",
    },
    {
      id: "BMLzoOVy",
      code: 41948,
      name: "Entrepreneurship",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:35:19",
    },
    {
      id: "KNxzmdkj",
      code: 455,
      name: "Business Analysis",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:34:15",
    },
    {
      id: "zNGZoroy",
      code: 34500,
      name: "Scrum",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:33:56",
    },
    {
      id: "pyJeoOkj",
      code: 56606,
      name: "Product design",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:32:02",
    },
    {
      id: "XMqAWd9M",
      code: 55424,
      name: "Early adopter",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:31:41",
    },
    {
      id: "JMelB1aN",
      code: 55370,
      name: "Design Thinking",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:30:21",
    },
    {
      id: "kNm6a1XM",
      code: 49611,
      name: "Project Design",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:30:15",
    },
    {
      id: "gyYoq5oM",
      code: 25913,
      name: "Investigation and Analysis",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:26:02",
    },
    {
      id: "zNGZoLny",
      code: 704,
      name: "Software Development",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-28T15:25:48",
    },
    {
      id: "WNVYaOvy",
      code: 6217,
      name: "Project Management",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-25T23:38:40",
    },
    {
      id: "eynrmdEy",
      code: 45396,
      name: "Leadership",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-25T23:38:36",
    },
    {
      id: "pyoledeN",
      code: 56622,
      name: "Teamwork",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2019-10-25T23:38:35",
    },
  ],
  interests: [
    {
      id: "nM4906j7",
      code: 55532,
      name: "Full Stack Development",
      media: [],
      created: "2019-10-25T23:38:52",
    },
    {
      id: "JyQ21dNQ",
      code: 55266,
      name: "Communication",
      media: [],
      created: "2019-10-25T23:38:56",
    },
    {
      id: "Oj6PwzNp",
      code: 5993,
      name: "AWS",
      media: [],
      created: "2019-10-25T23:39:17",
    },
    {
      id: "BML2EAyD",
      code: 33787,
      name: "Sales",
      media: [],
      created: "2019-10-25T23:39:24",
    },
    {
      id: "wM79eeVy",
      code: 21771,
      name: "Autonomy",
      additionalInfo: "",
      media: [],
      created: "2020-11-06T00:10:24",
    },
    {
      id: "Vjw6OOmM",
      code: 135210,
      name: "Machine learning",
      additionalInfo: "",
      media: [],
      created: "2020-11-06T00:10:40",
    },
    {
      id: "9MEnqqRj",
      code: 40587,
      name: "Data Science",
      additionalInfo: "",
      media: [],
      created: "2020-11-06T00:11:56",
    },
    {
      id: "nM44ZZ6M",
      code: 5326,
      name: "Statistics",
      additionalInfo: "",
      media: [],
      created: "2020-11-06T00:12:09",
    },
    {
      id: "ANaExVDN",
      code: 703348,
      name: "Customer support",
      media: [],
      created: "2020-11-06T03:22:59",
    },
    {
      id: "ZNOP7zxM",
      code: 55142,
      name: "Adaptability",
      additionalInfo: "",
      media: [],
      created: "2020-11-06T03:29:06",
    },
    {
      id: "mjllvpEj",
      code: 56482,
      name: "Strategic Thinking",
      additionalInfo: "",
      media: [],
      created: "2020-11-06T03:29:18",
    },
    {
      id: "5yk0pA6N",
      code: 23818,
      name: "React.js",
      additionalInfo: "",
      media: [],
      created: "2020-11-06T03:29:47",
    },
    {
      id: "8yZ3zpGN",
      code: 23826,
      name: "Vue.js",
      additionalInfo: "",
      media: [],
      created: "2020-11-06T03:29:52",
    },
    {
      id: "EM3P8d6j",
      code: 32056,
      name: "Python",
      additionalInfo: "",
      media: [],
      created: "2020-11-06T03:29:59",
    },
  ],
  experiences: [
    {
      id: "ANammQ4N",
      category: "jobs",
      name: "Individual Consultant in Software Development",
      organizations: [
        {
          id: 416013,
          name: "United Nations Population Fund (UNFPA)",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1600355820/origin/bio/organizations/yq3skmfbc6ozoshpgvfh.png",
        },
      ],
      responsibilities: [],
      fromMonth: "November",
      fromYear: "2019",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 1,
    },
    {
      id: "BMLDWnBM",
      category: "education",
      name: "Master in Information Engineering",
      organizations: [
        {
          id: 517040,
          name: "Universidad de los Andes",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1603835455/origin/bio/organizations/qxley5nfsfj5m23aj7jt.png",
        },
      ],
      responsibilities: [],
      fromMonth: "July",
      fromYear: "2020",
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 1,
    },
    {
      id: "5ykrz9Pj",
      category: "projects",
      name: "N2X",
      contributions:
        "Work and support different teams of students from Andes university to develop ideas for entreprenuring",
      organizations: [],
      responsibilities: [],
      fromMonth: "June",
      fromYear: "2018",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 1,
    },
    {
      id: "kybebdgj",
      category: "jobs",
      name: "Developer Intern in Innovation Area",
      organizations: [
        {
          id: 168563,
          name: "Inalambria Internacional SAS",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1600909140/origin/bio/organizations/inalambria_cepx7x.png",
        },
      ],
      responsibilities: [],
      fromMonth: "February",
      fromYear: "2020",
      toMonth: "June",
      toYear: "2020",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 2,
    },
    {
      id: "ANaB2oJM",
      category: "education",
      name: "Systems and Computing Engineering",
      organizations: [
        {
          id: 517040,
          name: "Universidad de los Andes",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1603835455/origin/bio/organizations/qxley5nfsfj5m23aj7jt.png",
        },
      ],
      responsibilities: [],
      fromMonth: "January",
      fromYear: "2015",
      toMonth: "June",
      toYear: "2020",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 2,
    },
    {
      id: "mjlBbrBN",
      category: "projects",
      name: "Muvsic",
      contributions:
        "I was collaborating on web app design and implementation of the entrepreneuring",
      organizations: [
        {
          id: 448588,
          name: "Muvsic",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1601991846/origin/bio/organizations/dpubg7ct73ylrslc9don.png",
        },
      ],
      responsibilities: [],
      fromMonth: "January",
      fromYear: "2018",
      toMonth: "June",
      toYear: "2018",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [
        {
          group: "c8abf931-6b2d-49b7-93d0-aaf1f1e99147",
          mediaType: "media",
          description: "",
          mediaItems: [
            {
              id: "kybn0kyz",
              address:
                "https://res.cloudinary.com/torre-technologies-co/image/upload/v1604627626/origin/bio/experiences/27907935_319448105211470_4056226325024426942_o_ldpahy.png",
              metadata: '{"width":1000,"height":1000}',
            },
          ],
        },
      ],
      rank: 2,
    },
    {
      id: "JMelzOpN",
      category: "jobs",
      name: "Innovation Intern",
      organizations: [
        {
          id: 488563,
          name: "Grupo Bolivar",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1603715389/origin/bio/organizations/mdcr9kcyiikoyl8v5qzp.jpg",
        },
        {
          id: 374144,
          name: "Banco Davivienda",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1600923720/origin/bio/organizations/Davivienda_d5yacb.jpg",
        },
      ],
      responsibilities: [],
      fromMonth: "July",
      fromYear: "2019",
      toMonth: "January",
      toYear: "2020",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [
        {
          group: "24d7d118-f0d2-4bc0-82a3-ef4ad014a62f",
          mediaType: "media",
          description: "",
          mediaItems: [
            {
              id: "vN8x6GNo",
              address:
                "https://res.cloudinary.com/torre-technologies-co/image/upload/v1604757748/origin/bio/experiences/WhatsApp_Image_2020-01-16_at_3.09.40_PM_gifiue.jpg",
            },
          ],
        },
      ],
      rank: 3,
    },
    {
      id: "gMRx08ky",
      category: "jobs",
      name: "Teacher assistant",
      organizations: [
        {
          id: 517040,
          name: "Universidad de los Andes",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1603835455/origin/bio/organizations/qxley5nfsfj5m23aj7jt.png",
        },
      ],
      responsibilities: [],
      fromMonth: "July",
      fromYear: "2016",
      toMonth: "January",
      toYear: "2019",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 4,
    },
  ],
  awards: [],
  jobs: [
    {
      id: "ANammQ4N",
      category: "jobs",
      name: "Individual Consultant in Software Development",
      organizations: [
        {
          id: 416013,
          name: "United Nations Population Fund (UNFPA)",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1600355820/origin/bio/organizations/yq3skmfbc6ozoshpgvfh.png",
        },
      ],
      responsibilities: [],
      fromMonth: "November",
      fromYear: "2019",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 1,
    },
    {
      id: "kybebdgj",
      category: "jobs",
      name: "Developer Intern in Innovation Area",
      organizations: [
        {
          id: 168563,
          name: "Inalambria Internacional SAS",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1600909140/origin/bio/organizations/inalambria_cepx7x.png",
        },
      ],
      responsibilities: [],
      fromMonth: "February",
      fromYear: "2020",
      toMonth: "June",
      toYear: "2020",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 2,
    },
    {
      id: "JMelzOpN",
      category: "jobs",
      name: "Innovation Intern",
      organizations: [
        {
          id: 488563,
          name: "Grupo Bolivar",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1603715389/origin/bio/organizations/mdcr9kcyiikoyl8v5qzp.jpg",
        },
        {
          id: 374144,
          name: "Banco Davivienda",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1600923720/origin/bio/organizations/Davivienda_d5yacb.jpg",
        },
      ],
      responsibilities: [],
      fromMonth: "July",
      fromYear: "2019",
      toMonth: "January",
      toYear: "2020",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [
        {
          group: "24d7d118-f0d2-4bc0-82a3-ef4ad014a62f",
          mediaType: "media",
          description: "",
          mediaItems: [
            {
              id: "vN8x6GNo",
              address:
                "https://res.cloudinary.com/torre-technologies-co/image/upload/v1604757748/origin/bio/experiences/WhatsApp_Image_2020-01-16_at_3.09.40_PM_gifiue.jpg",
            },
          ],
        },
      ],
      rank: 3,
    },
    {
      id: "gMRx08ky",
      category: "jobs",
      name: "Teacher assistant",
      organizations: [
        {
          id: 517040,
          name: "Universidad de los Andes",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1603835455/origin/bio/organizations/qxley5nfsfj5m23aj7jt.png",
        },
      ],
      responsibilities: [],
      fromMonth: "July",
      fromYear: "2016",
      toMonth: "January",
      toYear: "2019",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 4,
    },
  ],
  projects: [
    {
      id: "5ykrz9Pj",
      category: "projects",
      name: "N2X",
      contributions:
        "Work and support different teams of students from Andes university to develop ideas for entreprenuring",
      organizations: [],
      responsibilities: [],
      fromMonth: "June",
      fromYear: "2018",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 1,
    },
    {
      id: "mjlBbrBN",
      category: "projects",
      name: "Muvsic",
      contributions:
        "I was collaborating on web app design and implementation of the entrepreneuring",
      organizations: [
        {
          id: 448588,
          name: "Muvsic",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1601991846/origin/bio/organizations/dpubg7ct73ylrslc9don.png",
        },
      ],
      responsibilities: [],
      fromMonth: "January",
      fromYear: "2018",
      toMonth: "June",
      toYear: "2018",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [
        {
          group: "c8abf931-6b2d-49b7-93d0-aaf1f1e99147",
          mediaType: "media",
          description: "",
          mediaItems: [
            {
              id: "kybn0kyz",
              address:
                "https://res.cloudinary.com/torre-technologies-co/image/upload/v1604627626/origin/bio/experiences/27907935_319448105211470_4056226325024426942_o_ldpahy.png",
              metadata: '{"width":1000,"height":1000}',
            },
          ],
        },
      ],
      rank: 2,
    },
  ],
  publications: [],
  education: [
    {
      id: "BMLDWnBM",
      category: "education",
      name: "Master in Information Engineering",
      organizations: [
        {
          id: 517040,
          name: "Universidad de los Andes",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1603835455/origin/bio/organizations/qxley5nfsfj5m23aj7jt.png",
        },
      ],
      responsibilities: [],
      fromMonth: "July",
      fromYear: "2020",
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 1,
    },
    {
      id: "ANaB2oJM",
      category: "education",
      name: "Systems and Computing Engineering",
      organizations: [
        {
          id: 517040,
          name: "Universidad de los Andes",
          picture:
            "https://res.cloudinary.com/torre-technologies-co/image/upload/v1603835455/origin/bio/organizations/qxley5nfsfj5m23aj7jt.png",
        },
      ],
      responsibilities: [],
      fromMonth: "January",
      fromYear: "2015",
      toMonth: "June",
      toYear: "2020",
      remote: false,
      additionalInfo: "",
      highlighted: true,
      weight: 0,
      verifications: 0,
      recommendations: 0,
      media: [],
      rank: 2,
    },
  ],
  opportunities: [
    {
      id: "ybb8xZ8y",
      interest: "hiring",
      field: "active",
      data: false,
    },
    {
      id: "jw4XlAry",
      interest: "jobs",
      field: "active",
      data: true,
    },
    {
      id: "MEXDP02N",
      interest: "jobs",
      field: "private",
      data: false,
    },
    {
      id: "MLWBwQrN",
      interest: "jobs",
      field: "desirable-compensation-currency",
      data: "USD$",
    },
    {
      id: "y5E94mvy",
      interest: "jobs",
      field: "desirable-compensation-amount",
      data: 15000,
    },
    {
      id: "NaJa0RxM",
      interest: "jobs",
      field: "desirable-compensation-periodicity",
      data: "yearly",
    },
    {
      id: "jrb65Rvj",
      interest: "jobs",
      field: "desirable-compensation-publicly-visible",
      data: true,
    },
    {
      id: "NV2oqRKN",
      interest: "gigs",
      field: "active",
      data: true,
    },
    {
      id: "MBaqzP2N",
      interest: "gigs",
      field: "private",
      data: false,
    },
    {
      id: "jlb95RPN",
      interest: "gigs",
      field: "desirable-compensation-currency",
      data: "USD$",
    },
    {
      id: "yd087R2y",
      interest: "gigs",
      field: "desirable-compensation-amount",
      data: 25,
    },
    {
      id: "ykQB5R8M",
      interest: "gigs",
      field: "desirable-compensation-periodicity",
      data: "hourly",
    },
    {
      id: "yZVG8R9y",
      interest: "gigs",
      field: "desirable-compensation-publicly-visible",
      data: true,
    },
    {
      id: "jA768DRN",
      interest: "internships",
      field: "active",
      data: true,
    },
    {
      id: "jp4ebRJj",
      interest: "internships",
      field: "private",
      data: false,
    },
    {
      id: "yXYwgRpN",
      interest: "internships",
      field: "desirable-compensation-currency",
      data: "USD$",
    },
    {
      id: "N8g6mp7y",
      interest: "internships",
      field: "desirable-compensation-amount",
      data: 10000,
    },
    {
      id: "MWrWJRdN",
      interest: "internships",
      field: "desirable-compensation-periodicity",
      data: "yearly",
    },
    {
      id: "yDOpDYwj",
      interest: "internships",
      field: "desirable-compensation-publicly-visible",
      data: true,
    },
    {
      id: "NxX45pQN",
      interest: "mentoring",
      field: "active",
      data: true,
    },
    {
      id: "M7d83VGj",
      interest: "advising",
      field: "active",
      data: true,
    },
    {
      id: "yQPGmWXj",
      interest: "industries",
      field: "types",
      data: [
        {
          locale: "en",
          name: "Tecnologia",
        },
        {
          locale: "en",
          name: "Marketing",
        },
        {
          locale: "en",
          name: "Startups",
        },
        {
          code: 33411,
          locale: "en",
          name: "Talent acquisition",
        },
        {
          code: 33357,
          locale: "en",
          name: "Web Applications",
        },
        {
          code: 33363,
          locale: "en",
          name: "Fintech",
        },
        {
          code: 33352,
          locale: "en",
          name: "Data Science",
        },
      ],
    },
  ],
  languages: [
    {
      code: "es",
      language: "Spanish",
      fluency: "fully-fluent",
    },
    {
      code: "en",
      language: "English",
      fluency: "fully-fluent",
    },
  ],
  personalityTraitsResults: {
    groups: [
      {
        id: "extraversion",
        order: 0,
        median: 3.5,
        stddev: 0.57,
      },
      {
        id: "openness-to-experience",
        order: 1,
        median: 3.41,
        stddev: 0.6,
      },
      {
        id: "conscientiousness",
        order: 2,
        median: 3.44,
        stddev: 0.56,
      },
      {
        id: "agreeableness",
        order: 3,
        median: 2.94,
        stddev: 0.58,
      },
      {
        id: "honesty-humility",
        order: 4,
        median: 3.19,
        stddev: 0.62,
      },
      {
        id: "emotionality",
        order: 5,
        median: 3.43,
        stddev: 0.62,
      },
    ],
    analyses: [
      {
        groupId: "openness-to-experience",
        analysis: 3.94,
      },
      {
        groupId: "honesty-humility",
        analysis: 3.88,
      },
      {
        groupId: "agreeableness",
        analysis: 3.31,
      },
      {
        groupId: "altruism",
        analysis: 4,
      },
      {
        groupId: "conscientiousness",
        analysis: 4.38,
      },
      {
        groupId: "emotionality",
        analysis: 2.31,
      },
      {
        groupId: "extraversion",
        analysis: 3.69,
      },
    ],
  },
  professionalCultureGenomeResults: {
    groups: [
      {
        id: "2",
        text: "Action oriented",
        answer: "all-the-time",
        order: 0,
      },
      {
        id: "3",
        text: "Adaptability",
        answer: "all-the-time",
        order: 1,
      },
      {
        id: "10",
        text: "Being customer oriented",
        answer: "all-the-time",
        order: 2,
      },
      {
        id: "14",
        text: "Being honest",
        answer: "all-the-time",
        order: 3,
      },
      {
        id: "29",
        text: "Emphasis on professional growth",
        answer: "all-the-time",
        order: 4,
      },
      {
        id: "40",
        text: "Making your numbers",
        answer: "all-the-time",
        order: 5,
      },
      {
        id: "51",
        text: "Taking initiative",
        answer: "all-the-time",
        order: 6,
      },
      {
        id: "1",
        text: "Achievement oriented",
        answer: "most-of-the-time",
        order: 7,
      },
      {
        id: "6",
        text: "Being analytical",
        answer: "most-of-the-time",
        order: 8,
      },
      {
        id: "7",
        text: "Being calm",
        answer: "most-of-the-time",
        order: 9,
      },
      {
        id: "9",
        text: "Being competitive",
        answer: "most-of-the-time",
        order: 10,
      },
      {
        id: "13",
        text: "Being fair",
        answer: "most-of-the-time",
        order: 11,
      },
      {
        id: "15",
        text: "Being innovative",
        answer: "most-of-the-time",
        order: 12,
      },
      {
        id: "19",
        text: "Being quick to take advantage of opportunities",
        answer: "most-of-the-time",
        order: 13,
      },
      {
        id: "24",
        text: "Being team oriented",
        answer: "most-of-the-time",
        order: 14,
      },
      {
        id: "27",
        text: "Confronting conflict directly",
        answer: "most-of-the-time",
        order: 15,
      },
      {
        id: "28",
        text: "Cooperative",
        answer: "most-of-the-time",
        order: 16,
      },
      {
        id: "35",
        text: "Having integrity",
        answer: "most-of-the-time",
        order: 17,
      },
      {
        id: "38",
        text: "Learning from mistakes",
        answer: "most-of-the-time",
        order: 18,
      },
      {
        id: "39",
        text: "Listening to customers",
        answer: "most-of-the-time",
        order: 19,
      },
      {
        id: "42",
        text: "Paying attention to detail",
        answer: "most-of-the-time",
        order: 20,
      },
      {
        id: "45",
        text: "Respecting individuals",
        answer: "most-of-the-time",
        order: 21,
      },
      {
        id: "46",
        text: "Risk-taking",
        answer: "most-of-the-time",
        order: 22,
      },
      {
        id: "48",
        text: "Sharing information freely",
        answer: "most-of-the-time",
        order: 23,
      },
      {
        id: "50",
        text: "Taking individual responsibility",
        answer: "most-of-the-time",
        order: 24,
      },
      {
        id: "8",
        text: "Being careful",
        answer: "sometimes",
        order: 25,
      },
      {
        id: "11",
        text: "Being decisive",
        answer: "sometimes",
        order: 26,
      },
      {
        id: "17",
        text: "Being people oriented",
        answer: "sometimes",
        order: 27,
      },
      {
        id: "23",
        text: "Being supportive",
        answer: "sometimes",
        order: 28,
      },
      {
        id: "25",
        text: "Being tolerant",
        answer: "sometimes",
        order: 29,
      },
      {
        id: "26",
        text: "Being willing to experiment",
        answer: "sometimes",
        order: 30,
      },
      {
        id: "30",
        text: "Emphasizing quality",
        answer: "sometimes",
        order: 31,
      },
      {
        id: "31",
        text: "Fast moving",
        answer: "sometimes",
        order: 32,
      },
      {
        id: "33",
        text: "Having high ethical standards",
        answer: "sometimes",
        order: 33,
      },
      {
        id: "34",
        text: "Having high expectations for performance",
        answer: "sometimes",
        order: 34,
      },
      {
        id: "37",
        text: "Individual goals are transparent",
        answer: "sometimes",
        order: 35,
      },
      {
        id: "41",
        text: "Not being constrained by many rules",
        answer: "sometimes",
        order: 36,
      },
      {
        id: "43",
        text: "Predictability",
        answer: "sometimes",
        order: 37,
      },
      {
        id: "44",
        text: "Putting organization's goals before unit's goals",
        answer: "sometimes",
        order: 38,
      },
      {
        id: "52",
        text: "Urgency",
        answer: "sometimes",
        order: 39,
      },
      {
        id: "53",
        text: "What you know matters more than who you know",
        answer: "sometimes",
        order: 40,
      },
      {
        id: "54",
        text: "Working in collaboration with others",
        answer: "sometimes",
        order: 41,
      },
      {
        id: "12",
        text: "Being easygoing",
        answer: "rarely",
        order: 42,
      },
      {
        id: "16",
        text: "Being market driven",
        answer: "rarely",
        order: 43,
      },
      {
        id: "18",
        text: "Being precise",
        answer: "rarely",
        order: 44,
      },
      {
        id: "20",
        text: "Being reflective",
        answer: "rarely",
        order: 45,
      },
      {
        id: "21",
        text: "Being results oriented",
        answer: "rarely",
        order: 46,
      },
      {
        id: "22",
        text: "Being rule oriented",
        answer: "rarely",
        order: 47,
      },
      {
        id: "32",
        text: "Hard-driving",
        answer: "rarely",
        order: 48,
      },
      {
        id: "49",
        text: "Stability",
        answer: "rarely",
        order: 49,
      },
      {
        id: "4",
        text: "Avoiding conflict",
        answer: "never",
        order: 50,
      },
      {
        id: "5",
        text: "Being aggressive",
        answer: "never",
        order: 51,
      },
      {
        id: "36",
        text: "High levels of conflict",
        answer: "never",
        order: 52,
      },
      {
        id: "47",
        text: "Security of employment",
        answer: "never",
        order: 53,
      },
    ],
    analyses: [
      {
        groupId: "1",
        section: "adaptability",
        analysis: -0.15,
      },
      {
        groupId: "1",
        section: "integrity",
        analysis: -0.24,
      },
      {
        groupId: "1",
        section: "collaborative",
        analysis: -0.33,
      },
      {
        groupId: "1",
        section: "results-oriented",
        analysis: 1.59,
      },
      {
        groupId: "1",
        section: "customer-oriented",
        analysis: -0.24,
      },
      {
        groupId: "1",
        section: "detail-oriented",
        analysis: -0.27,
      },
      {
        groupId: "10",
        section: "adaptability",
        analysis: 0.2,
      },
      {
        groupId: "10",
        section: "integrity",
        analysis: 0.04,
      },
      {
        groupId: "10",
        section: "collaborative",
        analysis: 0.28,
      },
      {
        groupId: "10",
        section: "results-oriented",
        analysis: -0.16,
      },
      {
        groupId: "10",
        section: "customer-oriented",
        analysis: 3.2,
      },
      {
        groupId: "10",
        section: "detail-oriented",
        analysis: 0.2,
      },
      {
        groupId: "11",
        section: "adaptability",
        analysis: -0.18,
      },
      {
        groupId: "11",
        section: "integrity",
        analysis: -0.02,
      },
      {
        groupId: "11",
        section: "collaborative",
        analysis: -0.54,
      },
      {
        groupId: "11",
        section: "results-oriented",
        analysis: 0.18,
      },
      {
        groupId: "11",
        section: "customer-oriented",
        analysis: 0.16,
      },
      {
        groupId: "11",
        section: "detail-oriented",
        analysis: -0.24,
      },
      {
        groupId: "12",
        section: "adaptability",
        analysis: 0.11,
      },
      {
        groupId: "12",
        section: "integrity",
        analysis: -0.33,
      },
      {
        groupId: "12",
        section: "collaborative",
        analysis: 0.39,
      },
      {
        groupId: "12",
        section: "results-oriented",
        analysis: -0.36,
      },
      {
        groupId: "12",
        section: "customer-oriented",
        analysis: 0.08,
      },
      {
        groupId: "12",
        section: "detail-oriented",
        analysis: -0.1,
      },
      {
        groupId: "13",
        section: "adaptability",
        analysis: -0.06,
      },
      {
        groupId: "13",
        section: "integrity",
        analysis: 1.44,
      },
      {
        groupId: "13",
        section: "collaborative",
        analysis: 0.21,
      },
      {
        groupId: "13",
        section: "results-oriented",
        analysis: -0.93,
      },
      {
        groupId: "13",
        section: "customer-oriented",
        analysis: 0.15,
      },
      {
        groupId: "13",
        section: "detail-oriented",
        analysis: -0.3,
      },
      {
        groupId: "14",
        section: "adaptability",
        analysis: 0.04,
      },
      {
        groupId: "14",
        section: "integrity",
        analysis: 2.68,
      },
      {
        groupId: "14",
        section: "collaborative",
        analysis: 0.12,
      },
      {
        groupId: "14",
        section: "results-oriented",
        analysis: -0.16,
      },
      {
        groupId: "14",
        section: "customer-oriented",
        analysis: -0.24,
      },
      {
        groupId: "14",
        section: "detail-oriented",
        analysis: 0.16,
      },
      {
        groupId: "15",
        section: "adaptability",
        analysis: 1.8,
      },
      {
        groupId: "15",
        section: "integrity",
        analysis: 0.27,
      },
      {
        groupId: "15",
        section: "collaborative",
        analysis: -0.03,
      },
      {
        groupId: "15",
        section: "results-oriented",
        analysis: 0.18,
      },
      {
        groupId: "15",
        section: "customer-oriented",
        analysis: 0.12,
      },
      {
        groupId: "15",
        section: "detail-oriented",
        analysis: 0.27,
      },
      {
        groupId: "16",
        section: "adaptability",
        analysis: -0.05,
      },
      {
        groupId: "16",
        section: "integrity",
        analysis: -0.16,
      },
      {
        groupId: "16",
        section: "collaborative",
        analysis: -0.07,
      },
      {
        groupId: "16",
        section: "results-oriented",
        analysis: 0.09,
      },
      {
        groupId: "16",
        section: "customer-oriented",
        analysis: 0.52,
      },
      {
        groupId: "16",
        section: "detail-oriented",
        analysis: -0.23,
      },
      {
        groupId: "17",
        section: "adaptability",
        analysis: 0.04,
      },
      {
        groupId: "17",
        section: "integrity",
        analysis: 0.02,
      },
      {
        groupId: "17",
        section: "collaborative",
        analysis: 0.18,
      },
      {
        groupId: "17",
        section: "results-oriented",
        analysis: -0.02,
      },
      {
        groupId: "17",
        section: "customer-oriented",
        analysis: 0.4,
      },
      {
        groupId: "17",
        section: "detail-oriented",
        analysis: -0.9,
      },
      {
        groupId: "18",
        section: "adaptability",
        analysis: -0.27,
      },
      {
        groupId: "18",
        section: "integrity",
        analysis: -0.08,
      },
      {
        groupId: "18",
        section: "collaborative",
        analysis: -0.14,
      },
      {
        groupId: "18",
        section: "results-oriented",
        analysis: -0.08,
      },
      {
        groupId: "18",
        section: "customer-oriented",
        analysis: -0.12,
      },
      {
        groupId: "18",
        section: "detail-oriented",
        analysis: 0.62,
      },
      {
        groupId: "19",
        section: "adaptability",
        analysis: 1.38,
      },
      {
        groupId: "19",
        section: "integrity",
        analysis: -1.02,
      },
      {
        groupId: "19",
        section: "collaborative",
        analysis: -0.57,
      },
      {
        groupId: "19",
        section: "results-oriented",
        analysis: -0.03,
      },
      {
        groupId: "19",
        section: "customer-oriented",
        analysis: 0.45,
      },
      {
        groupId: "19",
        section: "detail-oriented",
        analysis: -0.24,
      },
      {
        groupId: "2",
        section: "adaptability",
        analysis: -0.16,
      },
      {
        groupId: "2",
        section: "integrity",
        analysis: -0.68,
      },
      {
        groupId: "2",
        section: "collaborative",
        analysis: -0.28,
      },
      {
        groupId: "2",
        section: "results-oriented",
        analysis: 0.48,
      },
      {
        groupId: "2",
        section: "customer-oriented",
        analysis: -0.2,
      },
      {
        groupId: "2",
        section: "detail-oriented",
        analysis: -0.96,
      },
      {
        groupId: "20",
        section: "adaptability",
        analysis: -0.02,
      },
      {
        groupId: "20",
        section: "integrity",
        analysis: -0.44,
      },
      {
        groupId: "20",
        section: "collaborative",
        analysis: -0.39,
      },
      {
        groupId: "20",
        section: "results-oriented",
        analysis: -0.01,
      },
      {
        groupId: "20",
        section: "customer-oriented",
        analysis: -0.23,
      },
      {
        groupId: "20",
        section: "detail-oriented",
        analysis: 0.01,
      },
      {
        groupId: "21",
        section: "adaptability",
        analysis: -0.12,
      },
      {
        groupId: "21",
        section: "integrity",
        analysis: -0.1,
      },
      {
        groupId: "21",
        section: "collaborative",
        analysis: -0.12,
      },
      {
        groupId: "21",
        section: "results-oriented",
        analysis: 0.6,
      },
      {
        groupId: "21",
        section: "customer-oriented",
        analysis: 0.11,
      },
      {
        groupId: "21",
        section: "detail-oriented",
        analysis: -0.12,
      },
      {
        groupId: "22",
        section: "adaptability",
        analysis: -0.63,
      },
      {
        groupId: "22",
        section: "integrity",
        analysis: -0.12,
      },
      {
        groupId: "22",
        section: "collaborative",
        analysis: -0.11,
      },
      {
        groupId: "22",
        section: "results-oriented",
        analysis: 0.05,
      },
      {
        groupId: "22",
        section: "customer-oriented",
        analysis: -0.05,
      },
      {
        groupId: "22",
        section: "detail-oriented",
        analysis: 0.11,
      },
      {
        groupId: "23",
        section: "adaptability",
        analysis: -0.14,
      },
      {
        groupId: "23",
        section: "integrity",
        analysis: 0.34,
      },
      {
        groupId: "23",
        section: "collaborative",
        analysis: 0.88,
      },
      {
        groupId: "23",
        section: "results-oriented",
        analysis: -0.72,
      },
      {
        groupId: "23",
        section: "customer-oriented",
        analysis: -0.06,
      },
      {
        groupId: "23",
        section: "detail-oriented",
        analysis: -0.02,
      },
      {
        groupId: "24",
        section: "adaptability",
        analysis: 0.06,
      },
      {
        groupId: "24",
        section: "integrity",
        analysis: 0.36,
      },
      {
        groupId: "24",
        section: "collaborative",
        analysis: 1.95,
      },
      {
        groupId: "24",
        section: "results-oriented",
        analysis: 0.3,
      },
      {
        groupId: "24",
        section: "customer-oriented",
        analysis: -0.09,
      },
      {
        groupId: "24",
        section: "detail-oriented",
        analysis: 0.06,
      },
      {
        groupId: "25",
        section: "adaptability",
        analysis: 1.12,
      },
      {
        groupId: "25",
        section: "integrity",
        analysis: 0.84,
      },
      {
        groupId: "25",
        section: "collaborative",
        analysis: 0.04,
      },
      {
        groupId: "25",
        section: "results-oriented",
        analysis: -0.54,
      },
      {
        groupId: "25",
        section: "customer-oriented",
        analysis: 0.02,
      },
      {
        groupId: "25",
        section: "detail-oriented",
        analysis: -0.68,
      },
      {
        groupId: "26",
        section: "adaptability",
        analysis: 1.18,
      },
      {
        groupId: "26",
        section: "integrity",
        analysis: -0.2,
      },
      {
        groupId: "26",
        section: "collaborative",
        analysis: -0.1,
      },
      {
        groupId: "26",
        section: "results-oriented",
        analysis: -0.24,
      },
      {
        groupId: "26",
        section: "customer-oriented",
        analysis: -0.16,
      },
      {
        groupId: "26",
        section: "detail-oriented",
        analysis: -0.18,
      },
      {
        groupId: "27",
        section: "adaptability",
        analysis: 0.33,
      },
      {
        groupId: "27",
        section: "integrity",
        analysis: 0.06,
      },
      {
        groupId: "27",
        section: "collaborative",
        analysis: -1.41,
      },
      {
        groupId: "27",
        section: "results-oriented",
        analysis: 0.33,
      },
      {
        groupId: "27",
        section: "customer-oriented",
        analysis: -0.48,
      },
      {
        groupId: "27",
        section: "detail-oriented",
        analysis: 0.36,
      },
      {
        groupId: "28",
        section: "adaptability",
        analysis: -0.27,
      },
      {
        groupId: "28",
        section: "integrity",
        analysis: 0.09,
      },
      {
        groupId: "28",
        section: "collaborative",
        analysis: 1.8,
      },
      {
        groupId: "28",
        section: "results-oriented",
        analysis: -0.48,
      },
      {
        groupId: "28",
        section: "customer-oriented",
        analysis: -0.24,
      },
      {
        groupId: "28",
        section: "detail-oriented",
        analysis: -0.06,
      },
      {
        groupId: "29",
        section: "adaptability",
        analysis: -0.32,
      },
      {
        groupId: "29",
        section: "integrity",
        analysis: -1.6,
      },
      {
        groupId: "29",
        section: "collaborative",
        analysis: -0.04,
      },
      {
        groupId: "29",
        section: "results-oriented",
        analysis: 0.32,
      },
      {
        groupId: "29",
        section: "customer-oriented",
        analysis: -0.04,
      },
      {
        groupId: "29",
        section: "detail-oriented",
        analysis: -0.96,
      },
      {
        groupId: "3",
        section: "adaptability",
        analysis: 1.64,
      },
      {
        groupId: "3",
        section: "integrity",
        analysis: -1.08,
      },
      {
        groupId: "3",
        section: "collaborative",
        analysis: 0.08,
      },
      {
        groupId: "3",
        section: "results-oriented",
        analysis: -0.28,
      },
      {
        groupId: "3",
        section: "customer-oriented",
        analysis: 0.12,
      },
      {
        groupId: "3",
        section: "detail-oriented",
        analysis: -0.48,
      },
      {
        groupId: "30",
        section: "adaptability",
        analysis: -0.08,
      },
      {
        groupId: "30",
        section: "integrity",
        analysis: 0.18,
      },
      {
        groupId: "30",
        section: "collaborative",
        analysis: 0,
      },
      {
        groupId: "30",
        section: "results-oriented",
        analysis: -0.22,
      },
      {
        groupId: "30",
        section: "customer-oriented",
        analysis: 0.5,
      },
      {
        groupId: "30",
        section: "detail-oriented",
        analysis: 1.24,
      },
      {
        groupId: "31",
        section: "adaptability",
        analysis: 1.02,
      },
      {
        groupId: "31",
        section: "integrity",
        analysis: -0.74,
      },
      {
        groupId: "31",
        section: "collaborative",
        analysis: -0.42,
      },
      {
        groupId: "31",
        section: "results-oriented",
        analysis: 0.2,
      },
      {
        groupId: "31",
        section: "customer-oriented",
        analysis: -0.26,
      },
      {
        groupId: "31",
        section: "detail-oriented",
        analysis: -0.2,
      },
      {
        groupId: "32",
        section: "adaptability",
        analysis: 0.04,
      },
      {
        groupId: "32",
        section: "integrity",
        analysis: -0.33,
      },
      {
        groupId: "32",
        section: "collaborative",
        analysis: -0.44,
      },
      {
        groupId: "32",
        section: "results-oriented",
        analysis: 0.28,
      },
      {
        groupId: "32",
        section: "customer-oriented",
        analysis: -0.17,
      },
      {
        groupId: "32",
        section: "detail-oriented",
        analysis: -0.07,
      },
      {
        groupId: "33",
        section: "adaptability",
        analysis: -0.1,
      },
      {
        groupId: "33",
        section: "integrity",
        analysis: 1.52,
      },
      {
        groupId: "33",
        section: "collaborative",
        analysis: 0.14,
      },
      {
        groupId: "33",
        section: "results-oriented",
        analysis: 0.02,
      },
      {
        groupId: "33",
        section: "customer-oriented",
        analysis: 0.04,
      },
      {
        groupId: "33",
        section: "detail-oriented",
        analysis: 0.08,
      },
      {
        groupId: "34",
        section: "adaptability",
        analysis: 0.26,
      },
      {
        groupId: "34",
        section: "integrity",
        analysis: -0.14,
      },
      {
        groupId: "34",
        section: "collaborative",
        analysis: -0.16,
      },
      {
        groupId: "34",
        section: "results-oriented",
        analysis: 1.16,
      },
      {
        groupId: "34",
        section: "customer-oriented",
        analysis: -0.14,
      },
      {
        groupId: "34",
        section: "detail-oriented",
        analysis: 0.04,
      },
      {
        groupId: "35",
        section: "adaptability",
        analysis: -0.03,
      },
      {
        groupId: "35",
        section: "integrity",
        analysis: 2.31,
      },
      {
        groupId: "35",
        section: "collaborative",
        analysis: 0.24,
      },
      {
        groupId: "35",
        section: "results-oriented",
        analysis: -0.06,
      },
      {
        groupId: "35",
        section: "customer-oriented",
        analysis: -0.09,
      },
      {
        groupId: "35",
        section: "detail-oriented",
        analysis: 0.06,
      },
      {
        groupId: "36",
        section: "adaptability",
        analysis: 0,
      },
      {
        groupId: "36",
        section: "integrity",
        analysis: 0,
      },
      {
        groupId: "36",
        section: "collaborative",
        analysis: 0,
      },
      {
        groupId: "36",
        section: "results-oriented",
        analysis: 0,
      },
      {
        groupId: "36",
        section: "customer-oriented",
        analysis: 0,
      },
      {
        groupId: "36",
        section: "detail-oriented",
        analysis: 0,
      },
      {
        groupId: "37",
        section: "adaptability",
        analysis: -0.04,
      },
      {
        groupId: "37",
        section: "integrity",
        analysis: 0.8,
      },
      {
        groupId: "37",
        section: "collaborative",
        analysis: 0.22,
      },
      {
        groupId: "37",
        section: "results-oriented",
        analysis: -0.32,
      },
      {
        groupId: "37",
        section: "customer-oriented",
        analysis: 0.14,
      },
      {
        groupId: "37",
        section: "detail-oriented",
        analysis: -0.6,
      },
      {
        groupId: "38",
        section: "adaptability",
        analysis: 2.37,
      },
      {
        groupId: "38",
        section: "integrity",
        analysis: -1.05,
      },
      {
        groupId: "38",
        section: "collaborative",
        analysis: -0.81,
      },
      {
        groupId: "38",
        section: "results-oriented",
        analysis: 0.06,
      },
      {
        groupId: "38",
        section: "customer-oriented",
        analysis: -0.69,
      },
      {
        groupId: "38",
        section: "detail-oriented",
        analysis: -0.54,
      },
      {
        groupId: "39",
        section: "adaptability",
        analysis: 0,
      },
      {
        groupId: "39",
        section: "integrity",
        analysis: 0.15,
      },
      {
        groupId: "39",
        section: "collaborative",
        analysis: 0.18,
      },
      {
        groupId: "39",
        section: "results-oriented",
        analysis: 0,
      },
      {
        groupId: "39",
        section: "customer-oriented",
        analysis: 2.37,
      },
      {
        groupId: "39",
        section: "detail-oriented",
        analysis: 0.24,
      },
      {
        groupId: "4",
        section: "adaptability",
        analysis: 0,
      },
      {
        groupId: "4",
        section: "integrity",
        analysis: 0,
      },
      {
        groupId: "4",
        section: "collaborative",
        analysis: 0,
      },
      {
        groupId: "4",
        section: "results-oriented",
        analysis: 0,
      },
      {
        groupId: "4",
        section: "customer-oriented",
        analysis: 0,
      },
      {
        groupId: "4",
        section: "detail-oriented",
        analysis: 0,
      },
      {
        groupId: "40",
        section: "adaptability",
        analysis: -1.72,
      },
      {
        groupId: "40",
        section: "integrity",
        analysis: -0.44,
      },
      {
        groupId: "40",
        section: "collaborative",
        analysis: -0.68,
      },
      {
        groupId: "40",
        section: "results-oriented",
        analysis: 1.56,
      },
      {
        groupId: "40",
        section: "customer-oriented",
        analysis: 0.72,
      },
      {
        groupId: "40",
        section: "detail-oriented",
        analysis: -1.2,
      },
      {
        groupId: "41",
        section: "adaptability",
        analysis: 0.84,
      },
      {
        groupId: "41",
        section: "integrity",
        analysis: -0.36,
      },
      {
        groupId: "41",
        section: "collaborative",
        analysis: 0.02,
      },
      {
        groupId: "41",
        section: "results-oriented",
        analysis: -0.54,
      },
      {
        groupId: "41",
        section: "customer-oriented",
        analysis: -0.46,
      },
      {
        groupId: "41",
        section: "detail-oriented",
        analysis: -0.48,
      },
      {
        groupId: "42",
        section: "adaptability",
        analysis: -0.24,
      },
      {
        groupId: "42",
        section: "integrity",
        analysis: -0.09,
      },
      {
        groupId: "42",
        section: "collaborative",
        analysis: 0.06,
      },
      {
        groupId: "42",
        section: "results-oriented",
        analysis: 0.27,
      },
      {
        groupId: "42",
        section: "customer-oriented",
        analysis: -0.36,
      },
      {
        groupId: "42",
        section: "detail-oriented",
        analysis: 2.22,
      },
      {
        groupId: "43",
        section: "adaptability",
        analysis: -1.26,
      },
      {
        groupId: "43",
        section: "integrity",
        analysis: -0.12,
      },
      {
        groupId: "43",
        section: "collaborative",
        analysis: -0.02,
      },
      {
        groupId: "43",
        section: "results-oriented",
        analysis: -0.36,
      },
      {
        groupId: "43",
        section: "customer-oriented",
        analysis: 0.1,
      },
      {
        groupId: "43",
        section: "detail-oriented",
        analysis: -0.18,
      },
      {
        groupId: "44",
        section: "adaptability",
        analysis: -0.02,
      },
      {
        groupId: "44",
        section: "integrity",
        analysis: -0.48,
      },
      {
        groupId: "44",
        section: "collaborative",
        analysis: 0.36,
      },
      {
        groupId: "44",
        section: "results-oriented",
        analysis: 0.08,
      },
      {
        groupId: "44",
        section: "customer-oriented",
        analysis: -0.1,
      },
      {
        groupId: "44",
        section: "detail-oriented",
        analysis: -0.26,
      },
      {
        groupId: "45",
        section: "adaptability",
        analysis: 0,
      },
      {
        groupId: "45",
        section: "integrity",
        analysis: 1.59,
      },
      {
        groupId: "45",
        section: "collaborative",
        analysis: 1.05,
      },
      {
        groupId: "45",
        section: "results-oriented",
        analysis: -0.6,
      },
      {
        groupId: "45",
        section: "customer-oriented",
        analysis: -0.09,
      },
      {
        groupId: "45",
        section: "detail-oriented",
        analysis: -0.33,
      },
      {
        groupId: "46",
        section: "adaptability",
        analysis: 1.77,
      },
      {
        groupId: "46",
        section: "integrity",
        analysis: -0.45,
      },
      {
        groupId: "46",
        section: "collaborative",
        analysis: -0.81,
      },
      {
        groupId: "46",
        section: "results-oriented",
        analysis: 0.03,
      },
      {
        groupId: "46",
        section: "customer-oriented",
        analysis: -0.06,
      },
      {
        groupId: "46",
        section: "detail-oriented",
        analysis: -0.39,
      },
      {
        groupId: "47",
        section: "adaptability",
        analysis: 0,
      },
      {
        groupId: "47",
        section: "integrity",
        analysis: 0,
      },
      {
        groupId: "47",
        section: "collaborative",
        analysis: 0,
      },
      {
        groupId: "47",
        section: "results-oriented",
        analysis: 0,
      },
      {
        groupId: "47",
        section: "customer-oriented",
        analysis: 0,
      },
      {
        groupId: "47",
        section: "detail-oriented",
        analysis: 0,
      },
      {
        groupId: "48",
        section: "adaptability",
        analysis: -1.02,
      },
      {
        groupId: "48",
        section: "integrity",
        analysis: -0.33,
      },
      {
        groupId: "48",
        section: "collaborative",
        analysis: 0.9,
      },
      {
        groupId: "48",
        section: "results-oriented",
        analysis: -0.72,
      },
      {
        groupId: "48",
        section: "customer-oriented",
        analysis: 0.09,
      },
      {
        groupId: "48",
        section: "detail-oriented",
        analysis: -0.27,
      },
      {
        groupId: "49",
        section: "adaptability",
        analysis: 0.01,
      },
      {
        groupId: "49",
        section: "integrity",
        analysis: -0.37,
      },
      {
        groupId: "49",
        section: "collaborative",
        analysis: -0.12,
      },
      {
        groupId: "49",
        section: "results-oriented",
        analysis: -0.08,
      },
      {
        groupId: "49",
        section: "customer-oriented",
        analysis: -0.21,
      },
      {
        groupId: "49",
        section: "detail-oriented",
        analysis: -0.65,
      },
      {
        groupId: "5",
        section: "adaptability",
        analysis: 0,
      },
      {
        groupId: "5",
        section: "integrity",
        analysis: 0,
      },
      {
        groupId: "5",
        section: "collaborative",
        analysis: 0,
      },
      {
        groupId: "5",
        section: "results-oriented",
        analysis: 0,
      },
      {
        groupId: "5",
        section: "customer-oriented",
        analysis: 0,
      },
      {
        groupId: "5",
        section: "detail-oriented",
        analysis: 0,
      },
      {
        groupId: "50",
        section: "adaptability",
        analysis: -0.48,
      },
      {
        groupId: "50",
        section: "integrity",
        analysis: -0.03,
      },
      {
        groupId: "50",
        section: "collaborative",
        analysis: -1.14,
      },
      {
        groupId: "50",
        section: "results-oriented",
        analysis: -0.33,
      },
      {
        groupId: "50",
        section: "customer-oriented",
        analysis: 0.06,
      },
      {
        groupId: "50",
        section: "detail-oriented",
        analysis: -0.96,
      },
      {
        groupId: "51",
        section: "adaptability",
        analysis: -0.12,
      },
      {
        groupId: "51",
        section: "integrity",
        analysis: -0.04,
      },
      {
        groupId: "51",
        section: "collaborative",
        analysis: -0.04,
      },
      {
        groupId: "51",
        section: "results-oriented",
        analysis: 0.44,
      },
      {
        groupId: "51",
        section: "customer-oriented",
        analysis: 0.16,
      },
      {
        groupId: "51",
        section: "detail-oriented",
        analysis: -2.8,
      },
      {
        groupId: "52",
        section: "adaptability",
        analysis: -0.1,
      },
      {
        groupId: "52",
        section: "integrity",
        analysis: -0.18,
      },
      {
        groupId: "52",
        section: "collaborative",
        analysis: -1.12,
      },
      {
        groupId: "52",
        section: "results-oriented",
        analysis: 0.26,
      },
      {
        groupId: "52",
        section: "customer-oriented",
        analysis: -0.08,
      },
      {
        groupId: "52",
        section: "detail-oriented",
        analysis: -0.3,
      },
      {
        groupId: "53",
        section: "adaptability",
        analysis: -1.26,
      },
      {
        groupId: "53",
        section: "integrity",
        analysis: -0.48,
      },
      {
        groupId: "53",
        section: "collaborative",
        analysis: -1.52,
      },
      {
        groupId: "53",
        section: "results-oriented",
        analysis: 0.48,
      },
      {
        groupId: "53",
        section: "customer-oriented",
        analysis: -1.26,
      },
      {
        groupId: "53",
        section: "detail-oriented",
        analysis: -0.12,
      },
      {
        groupId: "54",
        section: "adaptability",
        analysis: 0.06,
      },
      {
        groupId: "54",
        section: "integrity",
        analysis: 0.12,
      },
      {
        groupId: "54",
        section: "collaborative",
        analysis: 1.42,
      },
      {
        groupId: "54",
        section: "results-oriented",
        analysis: 0.22,
      },
      {
        groupId: "54",
        section: "customer-oriented",
        analysis: -0.06,
      },
      {
        groupId: "54",
        section: "detail-oriented",
        analysis: 0,
      },
      {
        groupId: "6",
        section: "adaptability",
        analysis: -0.39,
      },
      {
        groupId: "6",
        section: "integrity",
        analysis: -0.81,
      },
      {
        groupId: "6",
        section: "collaborative",
        analysis: -0.45,
      },
      {
        groupId: "6",
        section: "results-oriented",
        analysis: 0.12,
      },
      {
        groupId: "6",
        section: "customer-oriented",
        analysis: -0.81,
      },
      {
        groupId: "6",
        section: "detail-oriented",
        analysis: 0.27,
      },
      {
        groupId: "7",
        section: "adaptability",
        analysis: 0.48,
      },
      {
        groupId: "7",
        section: "integrity",
        analysis: -0.6,
      },
      {
        groupId: "7",
        section: "collaborative",
        analysis: 0.39,
      },
      {
        groupId: "7",
        section: "results-oriented",
        analysis: -0.3,
      },
      {
        groupId: "7",
        section: "customer-oriented",
        analysis: 0.09,
      },
      {
        groupId: "7",
        section: "detail-oriented",
        analysis: -0.48,
      },
      {
        groupId: "8",
        section: "adaptability",
        analysis: -1.28,
      },
      {
        groupId: "8",
        section: "integrity",
        analysis: -0.18,
      },
      {
        groupId: "8",
        section: "collaborative",
        analysis: 0.1,
      },
      {
        groupId: "8",
        section: "results-oriented",
        analysis: -0.5,
      },
      {
        groupId: "8",
        section: "customer-oriented",
        analysis: -0.18,
      },
      {
        groupId: "8",
        section: "detail-oriented",
        analysis: 0.3,
      },
      {
        groupId: "9",
        section: "adaptability",
        analysis: -0.03,
      },
      {
        groupId: "9",
        section: "integrity",
        analysis: -0.6,
      },
      {
        groupId: "9",
        section: "collaborative",
        analysis: -1.35,
      },
      {
        groupId: "9",
        section: "results-oriented",
        analysis: 0.03,
      },
      {
        groupId: "9",
        section: "customer-oriented",
        analysis: -0.27,
      },
      {
        groupId: "9",
        section: "detail-oriented",
        analysis: -0.9,
      },
    ],
  },
};
</script>

<style>
</style>