<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <h2>Team Information</h2>
        <hr />
        <br />
        <h4>{{$store.state.teamName}}</h4>
        <br />

        <h4>Team Description:</h4>
        <p>{{$store.state.teamDescription}}</p>
        <hr />
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in
          dapibus ante, a blandit metus. Nulla gravida eros augue, lacinia
          dictum sem tincidunt in. Sed nec consequat quam, non posuere enim.
          Vestibulum mattis enim non lectus suscipit, condimentum malesuada nisi
          luctus.
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <h2>Team Selection</h2>

        <carousel-3d
          v-for="(profileList, i) in listsOfProfiles"
          :key="i"
          :controls-visible="true"
          :clickable="false"
          :loop="false"
        >
          <slide v-for="(profile, i) in profileList.profiles" v-bind:key="i" :index="i">
            <figure>
              <img src="https://placehold.it/360x270" />
              <figcaption>
                {{profile.name}}
              </figcaption>
            </figure>
          </slide>
        </carousel-3d>
      </v-col>
      <v-col cols="12" md="3">        

        <h2>Team Personality</h2>
        <hr />
        <br />
        <span>Personality Score: </span>
        <br />
        <span>Diversity Score: </span>
        <br />
        <br />
        <h4>Team´s Traits: </h4>
        
        <SlidersGroup :personalityTraits='personalityTraits' :teamPersonalityTraits='teamPersonalityTraits'></SlidersGroup>        

        <h2>Team Professional Culture</h2>
        <hr />
        <br />
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import SlidersGroup from '../components/SlidersGroup'

export default {
  name: "TeamResults",
  components: {
    Carousel3d,
    Slide,
    SlidersGroup
  },
  data: () => ({
    numberOfProfiles: 3,
    listsOfProfiles: [
      {
        name: "Nombre1",
        profiles: [
          { name: "Pepito1", description: "" },
          { name: "Pepito2", description: "" },
          { name: "Pepito3", description: "" },
          { name: "Pepito4", description: "" },
          { name: "Pepito5", description: "" },
        ],
      },
      {
        name: "Nombre2",
        profiles: [
          { name: "Carlos1", description: "" },
          { name: "Carlos2", description: "" },
          { name: "Carlos3", description: "" },
          { name: "Carlos4", description: "" },
          { name: "Carlos5", description: "" },
        ],
      },
      {
        name: "Nombre3",
        profiles: [
          { name: "Juan1", description: "" },
          { name: "Juan2", description: "" },
          { name: "Juan3", description: "" },
          { name: "Juan4", description: "" },
          { name: "Juan5", description: "" },
        ],
      },
    ],
    teamPersonalityTraits: [3, 3, 3, 3, 3, 3],
    personalityTraits: [
      { pre: "Solitary/\nreserved", post: "Outgoing/\nenergetic" },
      { pre: "Consistent/\ncautious", post: "Inventive/\ncurious" },
      { pre: "Easy-going/\nspontaneous", post: "Efficient/\norganized" },
      { pre: "Competitive/\nargumentative", post: "Friendly/\ncompassionate" },
      { pre: "Sly/\navaricious", post: "Sincere/\nmodest" },
      { pre: "Secure/\nconfident", post: "Sensitive/\nmodest" },
    ],
  }),
};
</script>

<style>
.carousel-3d-container figure {
  margin: 0;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  bottom: 0;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}
</style>