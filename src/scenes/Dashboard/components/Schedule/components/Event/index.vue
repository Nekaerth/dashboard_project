<template>
  <div class="Event">
    <div class="Event__line">line</div>
    <div class="Event__content">
      <div class="Event__title">{{ title }}</div>
      <div class="Event__description">{{ description }}</div>
    </div>
    <div class="Event__date">{{ date }}</div>
  </div>
</template>

<script>
export default {
  name: "Event",
  props: {
    title: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.Event {
  display: flex;

  .Event__line {
  }
}
</style>
