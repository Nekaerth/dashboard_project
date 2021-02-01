<template>
  <div class="Schedule">
    <template v-for="(day, index) in days">
      <span class="Schedule__day" :key="'day' + index">
        {{ getDayString(day.day) }}</span
      >
      <Event
        v-for="event in day.events"
        :key="event.key"
        :title="event.title"
        :description="event.description"
        :date="event.date"
        :action="event.action"
      />
    </template>
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
  computed: {
    days() {
      var items = this.getSortedItems();
      var days = [];
      var previousDay = new Date(1970, 0, 1);
      var day = null;
      items.forEach((event, index) => {
        day = this.getDay(event.date);
        event = { ...event, key: index };
        if (day.getTime() !== previousDay.getTime()) {
          days.push({ day: day, events: [event] });
          previousDay = day;
        } else {
          days[days.length - 1].events.push(event);
        }
      });
      return days; //List of days, where each day contains a list of events for that day
    },
  },
  methods: {
    getSortedItems() {
      var items = [];
      this.items.forEach((event) => {
        items.push(event);
      });
      return items.sort(this.compareDay);
    },
    compareDay(eventOne, eventTwo) {
      var day1 = this.getDay(eventOne.date);
      var day2 = this.getDay(eventTwo.date);

      //Get days between
      var millisecondsPerDay = 1000 * 60 * 60 * 24;
      var millisBetween = day2.getTime() - day1.getTime();
      var days = millisBetween / millisecondsPerDay;

      if (days < 0) return 1;
      if (days > 0) return -1;
      return 0;
    },
    getDay(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },
    getDayString(day) {
      var month = [
        "Januar",
        "Februar",
        "Marts",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "December",
      ];
      return day.getDate() + ". " + month[day.getMonth()];
    },
  },
};
</script>

<style lang="scss" scoped>
.Schedule {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #e7e7e7;
  padding: 10px;
  width: 300px;

  .Schedule__day {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
  }
}
</style>
