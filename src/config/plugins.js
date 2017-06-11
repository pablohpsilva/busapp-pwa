import Vue from 'vue';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';

import * as VueGoogleMaps from 'vue2-google-maps';
import Toast from '../common/functions/toast';

// Adicionando plugins ao Core do Vue
Vue.use(Vuex);
Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(VueResource);
Vue.use(Toast);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAzDCg1d-pXblLwlmI4Rj7EYIDZAvdfpFs',
    // v: 'OPTIONAL VERSION NUMBER',
    // libraries: 'places', //// If you need to use place input
  },
});
