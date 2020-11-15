<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Torre Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="130"
          src="./assets/logo.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-img
          alt="Torre Menu"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="600"
          src="./assets/menu.png"
          width="100"
        />
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>