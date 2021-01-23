<template>
  <div>详情页{{ id }}</div>
</template>
<script>
export default {
  name: "Detail",
  data() {
    return {
      id: "",
    };
  },
  created() {},
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {},
};
</script>