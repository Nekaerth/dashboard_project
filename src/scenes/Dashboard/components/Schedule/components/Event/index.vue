<template>
  <div class="Event">
    <div class="Event__line"></div>
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
      type: String,
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
  font-family: "Roboto", sans-serif;
  background-color: red;
  max-width: 300px;

  .Event__line {
    background-color: purple;
    width: 3px;
  }

  .Event__content {
    background-color: cyan;
    margin: 5px, 0px, 10px, 5px;
  }

  .Event__title {
    font-size: 14px;
    color: black;
    font-weight: bold;
  }

  .Event__description {
    font-size: 12px;
    color: gray;
  }

  .Event__date {
    font-size: 12px;
    color: gray;
  }
}
</style>
