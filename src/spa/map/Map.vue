<template lang="html">
  <div>
    <gmap-map
      :center="center"
      :zoom="14">
      <gmap-marker
        v-if="markers && markers.length"
        v-for="m in markers"
        :key="m"
        icon="https://s28.postimg.org/xxji5m6y5/bus.png"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"/>
    </gmap-map>
    <!--icon="https://s28.postimg.org/xxji5m6y5/bus.png"-->
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
      };
    },
    computed: {
      markers() {
        return (this.buses.length) ?
          this.buses.map(el => this.createMarker(el)) :
          [];
        // return (this.entities.length && this.entities[0].position[this.globalIndex]) ?
        //   [this.entities[0].position[this.globalIndex]] :
        //   [];
      },
    },
    watch: {
    },
    methods: {
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeCreateDialog() {
        // const id = this.newEntity.id;
        this.orionResources.post({
          options: 'keyValues',
        }, this.newEntity)
          .then((doc) => {
            this.entities.push(doc.data);
            this.center = doc.data.position;
            // this.closeDialog(ref);
          })
          .catch((err) => {
            this.$toast.create(`Error! ${err.toString()}`, 'snack', 5E3);
          });
      },
      requestPopulateMap() {
        this.orionResources.get({ id: 'T131' })
          .then((res) => {
            this.buses = res.body.activeBuses;
            this.busStops = res.body.busStops;
          })
          .catch((err) => {
            console.warn('requestPopulateMap error', err); // eslint-disable-line
          });
        // this.orionResources.list()
        //   .then((docs) => {
        //     this.entities = this.processOrionEntity(docs.data);
        //     window
        //       .localStorage
        //       .setItem('busLocations', JSON.stringify(this.processOrionEntity(docs.data)));
        //   })
        //   .catch((err) => {
        //     console.warn('requestPopulateMap error', err); // eslint-disable-line
        //     const aux = (window.localStorage.getItem('busLocations')) ?
        //       JSON.parse(window.localStorage.getItem('busLocations')) :
        //       this.processOrionEntity([JSON.parse(JSON.stringify(this.newEntity))]);

        //     window.aux1 = aux;
        //     this.entities = aux;
        //   });
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
      onOpen() {
        console.log('Opened'); // eslint-disable-line
      },
      onClose(type) {
        console.log('Closed', type); // eslint-disable-line
      },
      createMarker(bus) {
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
      processOrionEntity(entities) {
        return entities.map((el) => {
          const obj = {};
          obj.id = el.id;
          obj.name = el.name.value || el.name;
          obj.position = this.processOrionEntityPosition(el.position.value || el.position);
          return obj;
        });
      },
      processOrionEntityPosition(positions) {
        return positions.map(el => ({ position: el }));
      },
      saveBusRoute() {
        this.orionResources.post(
          {
            options: 'keyValues',
          },
          this.newEntity)
          .then((doc) => {
            this.entities.push(doc.data);
            this.center = doc.data.position;
            // this.closeDialog(ref);
          })
          .catch((err) => {
            this.$toast.create(`Error! ${err.toString()}`, 'snack', 5E3);
          });
      },
      moveMarker() {
        setInterval(() => {
          if (!this.entities.length) {
            return;
          }
          if (this.globalIndex === this.entities[0].position.length - 1) {
            this.entities[0].position = this.entities[0].position.reverse();
            this.globalIndex = -1;
          }
          this.globalIndex += 1;
        }, 1E3);
      },
    },
    mounted() {
      this.requestPopulateMap();
      // this.moveMarker();
      // this.saveBusRoute();
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
