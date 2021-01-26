<template>
  <div>
    <Tiles :items="tiles" />
  </div>
</template>

<script>
import Tiles from "./components/Tiles";

export default {
  name: "Dashboard",
  components: {
    Tiles,
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
        {
          title: "Favoritter",
          amount: 11,
          icon: "fal fa-heart",
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
