<template lang="html">
  <md-toolbar>
    <md-button class="md-icon-button"
      v-show="!hideMenu"
      @click="toggleSidenav">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title"
      style="flex: 1">
      {{ title }}
    </h2>

    <!-- <md-input-container>
      <label>Money</label>
      <md-input type="text"></md-input>
      <md-icon>search</md-icon>
    </md-input-container> -->

    <md-input-container md-accent class="md-input-container-toolbar">
      <label md-accent>Cidade</label>
      <md-input type="text" md-accent></md-input>
      <md-icon md-accent>search</md-icon>
    </md-input-container>

  </md-toolbar>
</template>

<script type="text/javascript">
  export default {
    props: {
      hideMenu: {
        type: Boolean,
        default() { return false; },
      },
      title: {
        type: String,
        default() { return ''; },
      },
      options: {
        type: Array,
        default() { return []; },
      },
    },
    data() {
      return {
        progress: 0,
        progressInterval: null,
        done: false,
        transition: true,
      };
    },
    components: {
    },
    methods: {
      toggleSidenav() {
        this.$emit('TOGGLE_SIDEBAR');
      },
    },
  };
</script>

<style>
  .md-input-container-toolbar {
    flex: 1;
  }
  .md-theme-default.md-input-container.md-input-focused label {
    color: rgba(0, 0, 0, 0) !important;
  }
  .md-input-container.md-input-container.md-input-focused::after {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
  .md-theme-default.md-input-container .md-icon:not(.md-icon-delete)::after {
    background: none !important;
    background-color: none !important;
  }
</style>
