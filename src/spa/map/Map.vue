<template lang="html">
  <div>
    <gmap-map
      :center="center"
      :zoom="15">
      <gmap-marker
        v-for="m in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>

    <md-button class="md-fab floating-button">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        center: {
          lat: -18.9220586,
          lng: -48.3337765,
        },
        markers: [
          {
            position: { lat: -18.9176744, lng: -48.2604986 },
          },
          {
            position: { lat: -18.9196445, lng: -48.2642169 },
          },
        ],
      };
    },
  };
</script>

<style>
  .vue-map-container {
    height: calc(100vh - 76px);
  }
  .floating-button {
    position: fixed !important;
    left: 16px;
    bottom: 16px;
    transition: all .3s ease;
  }
</style>
