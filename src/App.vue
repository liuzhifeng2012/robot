<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {},
  data() {
    return {};
  },
  watch: {
    $route(to, from) {},
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
@import "assets/css/style.scss";
</style>
