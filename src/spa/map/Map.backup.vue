<template lang="html">
  <div>
    <gmap-map
      :center="center"
      :zoom="14">
      <gmap-marker
        v-if="showMap && busMarkers && busMarkers.length"
        v-for="m in busMarkers"
        :key="m"
        icon="https://github.com/pablohpsilva/busapp-pwa/blob/master/src/assets/img/bus.png?raw=true"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"/>

      <gmap-marker
        v-if="showMap && busStopMarkers && busStopMarkers.length"
        v-for="m in busStopMarkers"
        :key="m"
        :icon="`https://github.com/pablohpsilva/busapp-pwa/blob/master/src/assets/img/${ m.stationName.indexOf('Terminal') !== -1 ? 'busstation' : 'busstop' }.png?raw=true`"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :title="m.stationName"
        :label="m.stationName"
        :animation="2"/>
    </gmap-map>
  </div>
</template>

<script>
  import { orionResource } from '../../common/resources/orion';

  export default {
    name: 'Map',
    props: {
      showMap: {
        type: Boolean,
        default() { return false; },
      },
      search: {
        type: String,
        default: 'T131',
      },
    },
    data() {
      return {
        orionResources: orionResource(this.$resource),
        globalIndex: 0,
        center: {
          lat: -18.9176744,
          lng: -48.2604986,
        },
        entities: [],
        buses: [],
        busStops: [],
        eventLoop: 0,
        interval: 5E3,
        hasError: null,
      };
    },
    computed: {
      busMarkers() {
        return (this.buses.length) ?
          this.buses.map(el => this.createBusMarker(el)) :
          [];
      },
      busStopMarkers() {
        return (this.busStops.length) ?
          this.busStops.map(el => this.createBusStopMarker(el)) :
          [];
      },
    },
    watch: {
      search() {
        this.requestPopulateMap();
      },
      hasError() {
        if (!this.hasError) {
          this.startRequestEventLoop();
        }
      },
    },
    methods: {
      closeDialog(ref) {
        this.$refs[ref].close();
      },
      createBusMarker(bus) {
        return {
          busPlateId: bus.busPlateId,
          isRunning: bus.isRunning,
          timeToNextStop: bus.timeToNextStop,
          position: {
            lat: bus.lastPosition.latitude,
            lng: bus.lastPosition.longitude,
          },
        };
      },
      createBusStopMarker(stop) {
        const position = {
          lat: Number(stop.position.latitude),
          lng: Number(stop.position.longitude),
        };
        return {
          description: stop.description,
          stationName: stop.stationName,
          routeIds: stop.routeIds,
          position,
        };
      },
      openDialog(ref) {
        this.$refs[ref].open();
      },
      onClose(type) {
        console.log('Closed', type); // eslint-disable-line
      },
      onOpen() {
        console.log('Opened'); // eslint-disable-line
      },
      removeRequestEventLoop() {
        window.clearInterval(this.eventLoop);
      },
      requestPopulateMap() {
        debugger;
        this.orionResources.get({ id: this.search })
          .then((res) => {
            this.buses = res.body.activeBuses;
            this.busStops = res.body.busStops;
            this.hasError = null;
          })
          .catch((err) => {
            this.hasError = err;
            this.$emit('error', this.hasError);
          });
      },
      startRequestEventLoop() {
        if (this.eventLoop) {
          this.removeRequestEventLoop();
        }
        this.eventLoop = window.setInterval(() => {
          if (this.hasError) {
            this.removeRequestEventLoop();
            return;
          }
          this.requestPopulateMap();
        }, this.interval);
      },
    },
    mounted() {
      this.requestPopulateMap();
    },
  };
</script>

<style>
  .vue-map-container {
    height: calc(100vh - 76px);
    /*height: 100vh;*/
  }
  .floating-button {
    position: fixed !important;
    left: 16px;
    bottom: 16px;
    transition: all .3s ease;
  }
</style>
