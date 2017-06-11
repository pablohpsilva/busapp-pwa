<template lang="html">
  <div>
    <md-layout class="Form__Wrapper">
      <md-input-container>
        <label>ID *</label>
        <md-input type="text" v-model="entity.id"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Name</label>
        <md-input type="text" v-model="entity.type"></md-input>
      </md-input-container>

      <md-input-container>
        <label>Description</label>
        <md-input type="text" v-model="entity.description"></md-input>
      </md-input-container>
    </md-layout>

    <md-layout class="Form__Wrapper">
      <!-- v-for="position in entity.positions" -->
      <!-- v-if="entity.positions.length"> -->
      <md-layout>
        <md-input-container>
          <label>Lat,Lon</label>
          <md-input type="text" v-model="positionString"></md-input>
        </md-input-container>
      </md-layout>
      <!-- <md-layout>
        <md-input-container>
          <label>Lon</label>
          <md-input type="number"></md-input>
        </md-input-container>
      </md-layout> -->

      <hr>
    </md-layout>

    <md-button @click="addPosition">
      Add position
    </md-button>
    <md-button @click="saveEntity">
      test
    </md-button>
  </div>
</template>

<script>
  import { orionResource } from '../../common/resources/orion';

  export default {
    name: 'Form',
    data() {
      return {
        orionResources: orionResource(this.$resource),
        positionString: '-18.9372405,-48.2296338/-18.9358784,-48.2313869/-18.9327109,-48.2356402/-18.9291998,-48.2441778/-18.9267472,-48.25774/-18.9208731,-48.2624222/-18.9177161,-48.2604962/-18.9141981,-48.2587369/-18.9115122,-48.2611777/-18.9116693,-48.2649965/@-18.9145268,-48.2734196',
        entity: {
          id: '',
          type: '',
          description: '',
          positions: [],
        },
      };
    },
    methods: {
      addPosition() {
        this.entity.positions.push({ position: '' });
      },
      explodePositionString() {
        return this.positionString.split('/');
      },
      createLatLon(position) {
        const splitPosition = position.split(','),
          lat = Number(splitPosition[0]),
          lon = Number(splitPosition[1]);
        return { lat, lon };
      },
      saveEntity() {
        const entity = Object.assign({}, this.entity);
        entity.positions = this.explodePositionString().map(el => this.createLatLon(el));
        console.log(entity); // eslint-disable-line
        this.orionResources.post(entity)
          .then(() => {
            console.log('saved!'); // eslint-disable-line
          })
          .catch((err) => {
            throw err;
          });
      },
    },
  };
</script>

<style lang="css">
  .Form__Wrapper {
    padding: 0 16px;
  }
</style>
