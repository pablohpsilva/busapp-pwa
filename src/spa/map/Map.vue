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
      :zoom="15">
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
            { lat: -18.9177685, lon: -48.260525 },
            { lat: -18.9168753, lon: -48.2598277 },
            { lat: -18.9155813, lon: -48.2586797 },
            { lat: -18.9134144, lon: -48.2587172 },
            { lat: -18.912134, lon: -48.2594809 },
            { lat: -18.9114346, lon: -48.2646522 },
            { lat: -18.9125526, lon: -48.2661536 },
            { lat: -18.9132732, lon: -48.2670119 },
            { lat: -18.914004, lon: -48.2677736 },
            { lat: -18.915567, lon: -48.2744148 },
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
        if (this.entities.length) {
          const a = this.entities
            .filter(el => el.hasOwnProperty('position'))
            .map(el => el.position.value);
          const b = a.map(el => el)
            .map(el => ({ position: el[0] }));
          return b;
        }
        return [
          { position: { lat: -18.9176744, lng: -48.2604986 } },
          { position: { lat: -18.9196445, lng: -48.2642169 } },
        ];
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
    },
    mounted() {
      this.requestPopulateMap();
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
