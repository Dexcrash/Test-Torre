import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
         dark: true,
         themes: {
            light: {
              primary: colors.purple,              
              accent: colors.shades.black,
              error: colors.red.accent3,
            },
            dark: {
                primary: '#27292d',
                secondary: '#cddc39',
            },
          },
    },
});
