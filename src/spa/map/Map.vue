<template lang="html">
  <div>
    <gmap-map
      :center="center"
      :zoom="14">
      <gmap-marker
        v-if="showMap && busStops && busStops.length"
        v-for="m in busStops"
        :key="m"
        :icon="m.stationName.indexOf('Terminal') !== -1 ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAbNQTFRF////v0BA359g/59g/99gs01mlUBVtklbv1VVk0VOlkhTvlJYwVRawFBak0lQlEdReJ2rdpqqfrPB5qZie6Svk0hRtl5adYaUhNrrv1FainFtinJteJCbh+P2h+T2iOb21IJdanSLbnGBcH6PcIGTcYOVdoqVeJGafm51rl5VanCHa2+Ffpigfpmhpl5WuHBbdHKDdbvifIOKhWxph3RlqJFhdJaqd21vd25wf21vf6mxaWmAbIepbXGBdm1wgK61gWhopFpVqoJptWNW2Yde6q5laml+dL3mamd6dWhtdmptuIppup9ebGl6bm57jfD5bZG2nlJTdGZrhsnPaWN2vIxowqZed63CgdrxzIhggtrxzYhha2Rza2NzeLHHh8zQya1clEhRal9wymdeymlezHNa5Z5l78Vbv1Fbl0xTal1uzpdo2ZZjbaLM2btbgNTskvj94MBZ4cFZgdfx2Z9obrHhbanXv1Fa5MRY5cRYbqvafs7of9Ts7ctYlEhRlP7/7MxYf9PrftPrlPr75qZogNfwlEhRlf7/8M9X6KdogNfwlEhRlf//v1Fa1oBc6aho8tBXqjXjNgAAAIp0Uk5TAAQICAgKDA4YGi5LXmmCnbS1tre5ubm6u7y+vr+/v7+/wMDAwMDAwMDAwcHBwcHBwsLCwsLCw8PDw8PExMTExMTExMTExMXFx8fHyMjJycnKysvLzMzMzc3Nzs7P0NDQ0dLU1NTU1NTW2Nnb3d7e4ODk5ebn6Orq6urx8fH09fb29/j4+Pn5+/z93MdGpQAAAbBJREFUOE+N0Ok7AlEUBvChLGXfZd/GErKvg6isZc+aNVkqoVAaCgmJGn+ye+fO3GZ40Pth7jPv+X04zyEIUeQFBXLi98iyXlSqlyzZL+PkTP/iKcOcLvozk8WTpFQ2+1YTw8Zk3UdNEgcUETaFbwyXt0LUKNA8Df1FLGB0VVpyBZ4DrkqD84QTARjouG4Ej4WrThIAyIgIQOfrZLsARDIIIsUjBPrWFr0QeFKI9EM+VXC/YBB+q3CZTkg/+RwzOMe4lMYF9rpBvBBoukA0EHhht8eBngWarj6DYNRN0+5RCM6qaXqhhwdGirIhMEFREwjYKMqIQe5doA6B4sfALQJF54E1DHbnn0kEnirDAQQaLi53MKhXZ88iMKjO6UVgTp1fywPXKogPAvsKiB0CH+xc8d7h4QYkJAYh2D3wO0wplWZ2h402kA12B7NSOYWXHHI4mlkw9g4yxoJmh2MIgxqS3P4OtkhyGIPl9TD5HZRVhGN32L3f/AEaPsoxMMyM9C05xcC5NNI/bfhxhxgQ3eFvIBnnk6fTNUHQpNPl4VJCJOLzHUWjWgi00egRLhP/BV9DyYUQAChaEAAAAABJRU5ErkJggg==' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAADdAAAA3QFwU6IHAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAASBQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAoABAQABgYADw4A/+EAHRYADw0ADAoAEA4ADw0ADAsAERAAFBEAHRYACwoADAoACwoACwoAEg4AJiIAEw4ACQgABwYAFRMAT0cAQDkAk4MACAcAUkMABQQADQwATEMACQgABgUAEhAAAgIAAwMABAQARjAAAAAAAQIBAgMCBwsIDg0AGDQ/HkBNHxsALmJ2MC8KNHCGPz4NQYqmUUwLUkoFY1oGY9P9d2kAiFoAiHgAkoEAnYsAoI0Ap4kAp5MAqIoAqJUAwp8AwqsAx6MAx68AyLAAyaUAybEAybIAz4gAz6oAz7cA5MkA6c4A7tIA79MA8sYA8tYA9dgA/9EA/+EAuObVHwAAADF0Uk5TAAsQFB8wOEBFaGt9fYSIjJqbs7a5xcjQ6Ovs7u/x8vP09PT29vf3+Pj4+f39/v7+/htdv50AAADoSURBVDjLY2CAAQFpLgZ8gEXLU4GBgY0TDtjQFLAqRhkyMEgoK0GAmoEMVgWSYfEQEBcih0NBjJ2NlZWNXTQWBZGGQkLqQf4mtubmtiZ+WE1QUdEJ8zZ2tLR0NPbCaQVhBUbWZmbWRrgVBJs62Ns7mAbiVBBmAfKlRShub7qCFLhG41QQHxsGBLG4Ayre3QII3LErYGKSwhfUkYaGhroBvk5g4IPVBD4+xTC8CoiJTRdPCPBwxq6AVxQKxMT5sSrAA0aIAnYNN0NG3NLMwqr6etrygjgV8GhGREVFhcty4FIgYggB3BgyABwrT4LkcnxSAAAAAElFTkSuQmCC'"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :title="m.stationName"
        :label="m.stationName"
        :zIndex="0"
        :animation="2"/>

      <gmap-marker
        v-if="showMap && busPosition && busPosition.length"
        v-for="m in busPosition"
        :key="m"
        icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAABCElEQVR4Ae3TP0oDURDH8W8wyiLoKUzwBIKtlacIChYSMIWVkGYLBQ3oLYRYpLBR8ABCGvUAGhDBQgQLlxTmzwjTWDzmvdnW5PNrdhn22y2zZZEtjunxyBvf/DBFGFPwzhPXnLDNEkkLHPKBJPbJEVUiqvQQ525iqT2kxFqY+qVCD5i+SoWGmETnIbp56B+G8vTSIedmPnRPjYwmk+DDMftk1On7QjUU3SB0iWLdF8pQdILQKYrlVGio5yYAqwyC0DMrABzoW4HpDkGY0KWjmXAvnHHFVJ9vMW0yQpwbsUHEhTt0TlSOJP64v7szZHGGdhHdAMsromsQVWGHnDZrWOq0yWlQoaS5X4SguOgaci88AAAAAElFTkSuQmCC"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :zIndex="1000"
        @click="center=m.position"/>
    </gmap-map>
  </div>
</template>

<script>
  import jsonBus from '@/common/resources/bus.json';
  import jsonStop from '@/common/resources/stops.json';
  import { orionBusResource } from '../../common/resources/orion-bus';
  import { orionStopResource } from '../../common/resources/orion-stops';

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
        this.buses = [];
        this.busPosition = [];
        this.busStops = [];
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
