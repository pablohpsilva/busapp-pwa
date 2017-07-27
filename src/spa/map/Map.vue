<template lang="html">
  <div>
    <gmap-map
      :center="center"
      :zoom="14">
      <gmap-marker
        v-if="showMap && busPosition && busPosition.length"
        v-for="m in busPosition"
        :key="m"
        icon="https://github.com/pablohpsilva/busapp-pwa/blob/master/src/assets/img/bus.png?raw=true"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"/>

      <gmap-marker
        v-if="showMap && busStops && busStops.length"
        v-for="m in busStops"
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
  import { orionBusResource } from '../../common/resources/orion-bus';
  import { orionStopResource } from '../../common/resources/orion-stops';

  import jsonBus from '../../common/resources/bus.json';
  import jsonStop from '../../common/resources/stops.json';

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
        orionBusResources: orionBusResource(this.$resource),
        orionStopResources: orionStopResource(this.$resource),
        globalIndex: 0,
        center: {
          lat: -18.9176744,
          lng: -48.2604986,
        },
        entities: [],
        buses: [],
        busPosition: [],
        busStops: [],
        intervals: {},
        intervalTime: 2E3,
        hasError: null,
      };
    },
    computed: {
      // busPosition() {
      //   return this.buses.length ?
      //     this.buses.map(el => el.currentPosition) :
      //     [];
      // },
    },
    watch: {
      search() {
        this.resetAll();
      },
      hasError() {
        if (!this.hasError) {
          this.startRequestEventLoop();
        }
      },
    },
    methods: {
      clearIntervals() {
        const keys = Object.keys(this.intervals);
        if (keys.length) {
          keys.forEach(el => window.clearInterval(this.intervals[el]));
        }
        this.intervals = {};
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
      createEventLoop(bus) {
        bus.currentIndex = 0; // eslint-disable-line
        const id = bus._id; // eslint-disable-line
        const interval = window.setInterval(() => {
          const index = bus.currentIndex + 1;
          if (index >= bus.location.length) {
            bus.currentIndex = 0; // eslint-disable-line
          }
          bus.currentIndex = index; // eslint-disable-line
          this.extractBusPosition(bus.location[index]);
        }, this.intervalTime);

        this.registerInterval(id, interval);
      },
      extractBusPosition(position) {
        if ((this.busPosition.length + 1) > 5) {
          this.busPosition = [];
        }
        this.busPosition.push(position);
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
      registerInterval(id, interval) {
        if (this.intervals.hasOwnProperty(id)) { // eslint-disable-line
          // window.clearInterval(this.intervals[id]);
          // this.intervals[id] = 0;
          return;
        }
        this.intervals[id] = interval;
      },
      requestPopulateMap() {
        if (!this.search) {
          return;
        }
        this.requestPopulateBus();
        this.requestPopulateStop();
      },
      requestPopulateBus() {
        this.orionBusResources.get({ id: this.search })
          .then((res) => {
            this.renderBuses(res.body);
          })
          .catch((err) => {
            if (this.search.toLowerCase() === 't131') {
              return this.renderBuses(jsonBus);
            }
            this.hasError = err;
            this.$emit('error', this.hasError);
            return this;
          });
      },
      requestPopulateStop() {
        this.orionStopResources.get({ id: this.search })
          .then((res) => {
            this.renderStops(res.body);
          })
          .catch((err) => {
            if (this.search.toLowerCase() === 't131') {
              return this.renderStops(jsonStop);
            }
            this.hasError = err;
            this.$emit('error', this.hasError);
            return this;
          });
      },
      renderBuses(buses) {
        this.buses = buses;
        this.buses.forEach(el => this.createEventLoop(el));
        this.hasError = null;
      },
      renderStops(stops) {
        this.busStops = stops;
        this.hasError = null;
      },
      resetAll() {
        this.clearIntervals();
        this.busPosition = [];
        this.requestPopulateMap();
      },
      startRequestEventLoop() {
        this.resetAll();
      },
    },
    mounted() {
      this.resetAll();
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
