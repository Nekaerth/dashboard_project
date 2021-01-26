<template>
  <div>
    <br />
    <br />
    <Tooltip :active="true" label="Se mere" position="right">
      <v-btn @click="someAction">Click here...</v-btn>
    </Tooltip>
    <Tiles :items="tiles" />
  </div>
</template>

<script>
import Tiles from "./components/Tiles";
import Tooltip from "../../components/Tooltip";

export default {
  name: "Dashboard",
  components: {
    Tiles,
    Tooltip,
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
