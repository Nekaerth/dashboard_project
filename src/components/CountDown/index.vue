<template>
  <div>
    <span>{{ timeLeft }}</span>
  </div>
</template>

<script>
export default {
  name: "CountDown",
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  computed: {
    timeLeft() {
      return this.date;
    },
  },
};
</script>

<style></style>
