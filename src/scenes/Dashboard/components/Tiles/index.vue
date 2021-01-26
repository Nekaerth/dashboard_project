<template>
  <div class="Tiles">
    <Tile
      v-for="(tile, index) in items"
      :key="index"
      :title="tile.title"
      :amount="tile.amount"
      :format="tile.format"
      :icon="tile.icon"
      :action="tile.action"
    />
  </div>
</template>

<script>
import Tile from "./components/Tile";

export default {
  name: "Tiles",
  components: {
    Tile,
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
.Tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 10px;
}
</style>
