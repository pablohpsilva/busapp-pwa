<template lang="html">
  <div>

    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2">
      <md-dialog-title>Create new note</md-dialog-title>

      <md-dialog-content>
        <md-input-container>
          <label>Entity ID *</label>
          <md-input v-model="newEntity.id"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Name</label>
          <md-input v-model="newEntity.name"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Latitude</label>
          <md-input v-model="newEntity.position[0].lat"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Longitude</label>
          <md-input v-model="newEntity.position[0].lon"></md-input>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('dialog2')">
          Cancel
        </md-button>
        <md-button class="md-primary" @click="closeCreateDialog('dialog2')">
          Create
        </md-button>
      </md-dialog-actions>
    </md-dialog>

    <gmap-map
      :center="center"
      :zoom="14">
      <gmap-marker
        v-if="markers && markers.length"
        v-for="m in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>

    <md-button class="md-fab floating-button" id="fab" @click="openDialog('dialog2')">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
  import { orionResource } from '../../common/resources/orion';

  export default {
    name: 'Map',
    data() {
      return {
        orionResources: orionResource(this.$resource),
        globalIndex: 0,
        newEntity: {
          id: 'T131',
          name: 'test T131',
          position: [
            { lat: -18.93808, lng: -48.2291771 },
            { lat: -18.9375523, lng: -48.2289625 },
            { lat: -18.9366897, lng: -48.2301748 },
            { lat: -18.9359185, lng: -48.2311404 },
            { lat: -18.9354923, lng: -48.2317413 },
            { lat: -18.9349442, lng: -48.2324386 },
            { lat: -18.934299, lng: -48.2332871 },
            { lat: -18.9338322, lng: -48.2338986 },
            { lat: -18.9333502, lng: -48.2345424 },
            { lat: -18.9329741, lng: -48.2351121 },
            { lat: -18.9325543, lng: -48.235727 },
            { lat: -18.9321788, lng: -48.2363493 },
            { lat: -18.9318338, lng: -48.236993 },
            { lat: -18.9314481, lng: -48.2376207 },
            { lat: -18.9311589, lng: -48.238259 },
            { lat: -18.9303267, lng: -48.2401956 },
            { lat: -18.9297939, lng: -48.2414777 },
            { lat: -18.9294641, lng: -48.2425881 },
            { lat: -18.9292256, lng: -48.2435001 },
            { lat: -18.9289414, lng: -48.2448626 },
            { lat: -18.9286821, lng: -48.2462498 },
            { lat: -18.9284386, lng: -48.2476392 },
            { lat: -18.9281747, lng: -48.2491251 },
            { lat: -18.9278855, lng: -48.2507344 },
            { lat: -18.9275302, lng: -48.2523062 },
            { lat: -18.9272461, lng: -48.2539155 },
            { lat: -18.9269163, lng: -48.2555409 },
            { lat: -18.9265966, lng: -48.257161 },
            { lat: -18.9261246, lng: -48.2595106 },
            { lat: -18.925399, lng: -48.2609215 },
            { lat: -18.9247652, lng: -48.2615728 },
            { lat: -18.9234256, lng: -48.2623506 },
            { lat: -18.9221417, lng: -48.2625706 },
            { lat: -18.9206396, lng: -48.2623882 },
            { lat: -18.9199393, lng: -48.2620609 },
            { lat: -18.9188585, lng: -48.2613153 },
            { lat: -18.9178232, lng: -48.2605321 },
            { lat: -18.916448, lng: -48.2595021 },
            { lat: -18.9160065, lng: -48.2591803 },
            { lat: -18.9157172, lng: -48.2587672 },
            { lat: -18.9151278, lng: -48.2586714 },
            { lat: -18.9139251, lng: -48.2586875 },
            { lat: -18.9130878, lng: -48.2588216 },
            { lat: -18.91222, lng: -48.2593527 },
            { lat: -18.9118312, lng: -48.2600081 },
            { lat: -18.9114963, lng: -48.2616067 },
            { lat: -18.9111817, lng: -48.2632965 },
            { lat: -18.9113847, lng: -48.2645947 },
            { lat: -18.912156, lng: -48.2657105 },
            { lat: -18.9129579, lng: -48.2666117 },
            { lat: -18.9138599, lng: -48.2676936 },
            { lat: -18.9144536, lng: -48.2684285 },
            { lat: -18.9151742, lng: -48.2692224 },
            { lat: -18.9157528, lng: -48.2699681 },
            { lat: -18.9160978, lng: -48.2709337 },
            { lat: -18.9161993, lng: -48.2719476 },
            { lat: -18.916311, lng: -48.2732028 },
            { lat: -18.9161638, lng: -48.2740987 },
            { lat: -18.9155447, lng: -48.2745171 },
            { lat: -18.9144029, lng: -48.2748658 },
            { lat: -18.9139198, lng: -48.2750203 },
            { lat: -18.9128108, lng: -48.2753883 },
            { lat: -18.9131893, lng: -48.275755 },
          ],
        },
        center: {
          lat: -18.9176744,
          lng: -48.2604986,
        },
        entities: [],
      };
    },
    computed: {
      markers() {
        // if (this.entities.length) {
        //   const a = this.entities
        //     .filter(el => el.hasOwnProperty('position'))
        //     .map(el => el.position.value);
        //   const b = a.map(el => el)
        //     .map(el => ({ position: el[0] }));
        //   return b;
        // }
        // return [
        //   { position: { lat: -18.9176744, lng: -48.2604986 } },
        //   { position: { lat: -18.9196445, lng: -48.2642169 } },
        // ];
        return [{ position: this.newEntity.position[this.globalIndex] }];
      },
    },
    watch: {
      markers() {
        const center = this.markers[0].position;
        if (center && center.hasOwnProperty('lat') && center.lat) {
          this.center = center;
        }
      },
    },
    methods: {
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeCreateDialog(ref) {
        const id = this.newEntity.id;

        this.orionResources.post( {
          options: 'keyValues',
        }, this.newEntity)
          .then((doc) => {
            this.entities.push(doc.data);
            this.center = doc.data.position;
            this.closeDialog(ref);
          })
          .catch((err) => {
            this.$toast.create(`Error! ${err.toString()}`, 'snack', 5E3);
          });
      },
      requestPopulateMap() {
        this.orionResources.list()
          .then((docs) => {
            console.warn(docs);
            this.entities = docs.data;
          })
          .catch((err) => {
            console.warn(err);
          });
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
      onOpen() {
        console.log('Opened');
      },
      onClose(type) {
        console.log('Closed', type);
      },
      moveMarker() {
        setInterval(() => {
          if (this.globalIndex > this.newEntity.position.length - 1) {
            this.newEntity.position = this.newEntity.position.reverse();
            this.globalIndex = -1;
          }
          this.globalIndex += 1;
        }, 1E3);
      },
    },
    mounted() {
      this.requestPopulateMap();
      this.moveMarker();
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
