<template>
  <div></div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    active: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
