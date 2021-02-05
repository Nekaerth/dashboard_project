<template>
  <div>
    <Tiles :items="tiles" />
    <br />
    <Schedule :items="events" />
  </div>
</template>

<script>
import Tiles from "./components/Tiles";
import Schedule from "./components/Schedule";

export default {
  name: "Dashboard",
  components: {
    Tiles,
    Schedule,
  },
  computed: {
    tiles() {
      return [
        {
          title: "Dine ordrer",
          amount: 7,
          format: "currency",
          icon: "fal fa-list-alt",
        },
        {
          title: "Favoritter",
          amount: 11,
          icon: "fas fa-heart",
          action: this.someAction,
        },
        {
          title: "Favoritter",
          amount: 11,
          icon: "fal fa-heart",
          action: this.someAction,
        },
        {
          title: "Favoritter",
          amount: 11,
          icon: "fal fa-heart",
          action: this.someAction,
        },
        {
          title: "Favoritter",
          amount: 11,
          icon: "fal fa-heart",
          action: this.someAction,
        },
        {
          title: "Favoritter",
          amount: 11,
          icon: "fal fa-heart",
          action: this.someAction,
        },
        {
          title: "Favoritter",
          amount: 11,
          icon: "fal fa-heart",
          action: this.someAction,
        },
        {
          title: "Favoritter",
          amount: 11,
          icon: "fal fa-heart",
          action: this.someAction,
        },
        {
          title: "Favoritter",
          amount: 11,
          icon: "fal fa-heart",
          action: this.someAction,
        },
        {
          title: "Favoritter",
          amount: 11,
          icon: "fal fa-heart",
          action: this.someAction,
        },
        {
          title: "Favoritter",
          amount: 11,
          icon: "fal fa-heart",
          action: this.someAction,
        },
      ];
    },
    events() {
      return [
        {
          title: "Wedding photoshoot",
          description: "30 guests, vintage style",
          date: new Date("2021-12-26T09:20:00"),
          action: this.someAction,
        },
        {
          title: "Portrait photography",
          description: "Business center",
          date: new Date("2021-12-27T15:00:00"),
          action: this.someAction,
        },
        {
          title: "Retouch",
          description: "Can be rescheduled",
          date: new Date("2021-12-26T12:00:00"),
        },
        {
          title: "Personal photoshoot",
          description: "Guidance required",
          date: new Date("2021-12-27T18:20:00"),
          action: this.someAction,
        },
      ];
    },
  },
  methods: {
    someAction() {
      console.log("action!");
    },
  },
};
</script>

<style scoped></style>
