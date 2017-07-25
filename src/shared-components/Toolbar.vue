<template lang="html">
  <md-toolbar>
    <!-- <md-button class="md-icon-button"
      v-show="!hideMenu"
      @click="toggleSidenav">
      <md-icon>menu</md-icon>
    </md-button> -->

    <!-- <h2 class="md-title"
      style="flex: 1">
      {{ title }}
    </h2> -->

    <!-- <md-input-container>
      <label>Money</label>
      <md-input type="text"></md-input>
      <md-icon>search</md-icon>
    </md-input-container> -->

    <md-input-container
      @keyup.native.enter="emitSearch">
      <label>Type 'T131' and press Enter</label>
      <md-input v-model="query"></md-input>
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
        query: '',
      };
    },
    components: {
    },
    methods: {
      toggleSidenav() {
        this.$emit('TOGGLE_SIDEBAR');
      },
      emitSearch() {
        const busRouteName = this.query;
        if (busRouteName) {
          this.$emit('search', busRouteName.trim().toUpperCase());
          return;
        }
        this.$emit('error');
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

  .Toolbar__Search {
    background: #fff;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    border-radius: 2px;
    color: rgba(0, 0, 0, .87) !important;
    padding: 0 1em;
    margin-bottom: 12px !important;
    margin-top: 12px !important;
  }

  .Toolbar__Search label {
    padding: 0 1em;
  }

  .md-input-container.Toolbar__Search,
  .md-input-container.md-input-focused.Toolbar__Search,
  .md-input-container.md-has-value.md-input-focused.Toolbar__Search,
  .md-input-container.Toolbar__Search input,
  .md-input-container.md-has-value.md-input-focused.Toolbar__Search input,
  .md-input-container.md-has-value.md-input-focused.Toolbar__Search textarea,
  .md-input-container.Toolbar__Search textarea {
    color: rgba(0, 0, 0, .87) !important;
    text-shadow: 0 0 0 rgba(0, 0, 0, 1) !important;
  }
  .Toolbar__Search input {
    color: rgba(0, 0, 0, .87) !important;
    text-shadow: 0 0 0 rgba(0, 0, 0, 1) !important;
  }
</style>
