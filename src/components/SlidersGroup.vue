<template>
  <div>
    <v-slider
      v-on:click="setPersonalized"
      v-for="(item, index) in personalityTraits"
      v-bind:key="index"
      v-model="teamPersonalityTraits[index]"
      step="0.5"
      thumb-label
      :max="5"
      :min="1"
      
      color="#cddc39"
      ticks="always"
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
  </div>
</template>

<script>
export default {
  name: "SlidersGroup",
  props:['setPersonalized', 'personalityTraits', 'teamPersonalityTraits'],
  data: () => ({
  }),
};
</script>
