<template>
  <div class="Schedule">
    <Event
      v-for="(event, index) in items"
      :key="index"
      :title="event.title"
      :description="event.description"
      :date="event.date"
      :action="event.action"
    />
  </div>
</template>

<script>
import Event from "./components/Event";

export default {
  name: "Schedule",
  components: {
    Event,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.Schedule {
  display: flex;
  flex-direction: column;
}
</style>
