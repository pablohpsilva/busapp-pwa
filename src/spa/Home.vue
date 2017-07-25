<template lang="html">
  <div>
    <toolbar
      id="toolbar"
      class="Home__PageTeller"
      :title="pageName"
      @search="shouldOpenMap"
      @error="showErrorDialog"
      @TOGGLE_SIDEBAR="toggleSidenav"/>

    <!-- <keep-alive>
      <transition name="slide-fade"
        mode="out-in">
        <router-view></router-view>
      </transition>
    </keep-alive> -->

    <map-g
      :show-map="showMap"
      :search="search"
      @error="showErrorDialog"/>

    <md-dialog ref="dialog2">
      <md-dialog-title>Ops...</md-dialog-title>

      <md-dialog-content>Sorry, but we don't have that route yet.</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog2')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
      <md-dialog-title>Hello! :D</md-dialog-title>

      <md-dialog-content>
        This is the Busapp PWA. There's only one route working so far: T131.<br>
        This message will be shown once.
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog1')">OK, Goodbye</md-button>
        <!-- <md-button class="md-primary" @click.native="closeDialog('dialog1')">Next</md-button> -->
      </md-dialog-actions>
    </md-dialog>

    <md-button id="custom" class="md-fab md-fab-bottom-center"
      @click.native="openDialog('dialog1')">
      <md-icon>help_outline</md-icon>
    </md-button>

    <!-- <sidebar ref="sidenav"></sidebar> -->
  </div>
</template>

<script>
  import Sidebar from '../shared-components/Sidebar';
  import Toolbar from '../shared-components/Toolbar';
  import MapG from './map/Map';

  export default {
    name: 'Home',
    data() {
      return {
        showDialog: false,
        showMap: false,
        search: '',
      };
    },
    computed: {
      pageName() {
        return this.$route.name;
      },
    },
    components: {
      MapG,
      Sidebar,
      Toolbar,
    },
    methods: {
      toggleSidenav() {
        this.$refs.sidenav.toggle();
      },
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
        window.localStorage.setItem('showDialog', true);
      },
      onOpen() {
        console.log('Opened'); // eslint-disable-line
      },
      onClose(type) {
        console.log('Closed', type); // eslint-disable-line
      },
      shouldShowDialog() {
        if (!window.localStorage.getItem('showDialog')) {
          this.openDialog('dialog1');
        }
      },
      shouldOpenMap(search) {
        this.search = search;

        if (this.showMap) {
          return;
        }
        this.showMap = true;
      },
      showErrorDialog() {
        this.$refs.dialog2.open();
      },
    },
    mounted() {
      setTimeout(() => {
        this.shouldShowDialog();
      }, 1E3);
    },
  };
</script>

<style>
  .Home__PageTeller .md-title {
    text-transform: capitalize;
  }
</style>
