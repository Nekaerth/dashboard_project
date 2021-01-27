<template>
  <div style="text-align: center">
    <br />
    <br />
    <Tooltip :active="true" label="This is a button">
      <button @click="someAction">Click here...</button>
    </Tooltip>
    <br />
    <br />
    <TooltipExtended title="title" :timer="1000">
      <template #content>
        <h1>Indhold</h1>
      </template>
      <template #default="{ show }">
        <button @click="show">Click here...</button>
      </template>
    </TooltipExtended>
    <br />
    <br />
    <Tiles :items="tiles" />
  </div>
</template>

<script>
import Tiles from "./components/Tiles";
import Tooltip from "../../components/Tooltip";
import TooltipExtended from "../../components/TooltipExtended";

export default {
  name: "Dashboard",
  components: {
    Tiles,
    Tooltip,
    TooltipExtended,
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
