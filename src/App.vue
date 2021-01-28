<template>
  <div id="app" class="Buttons">
    <TooltipExtended
      v-for="(item, index) in items"
      class="Button"
      :key="index"
      :positioning="item"
      ><template #content>
        <h1>Indhold</h1>
      </template>
      <template #default="{ show }">
        <button @click="show">{{ item }}</button>
      </template>
    </TooltipExtended>
  </div>
</template>

<script>
//import Dashboard from "./scenes/Dashboard";
//import Tooltip from "../components/Tooltip";
import TooltipExtended from "./components/TooltipExtended";

/*
<Tooltip label="This is a button">
  <button @click="someAction">Click here...</button>
</Tooltip>

<TooltipExtended >
  <template #content>
    <h1>Indhold</h1>
  </template>
  <template #default="{ show }">
    <button @click="show">{{ v }}</button>
  </template>
</TooltipExtended>
*/

export default {
  name: "App",
  components: {
    TooltipExtended,
  },
  data() {
    return {
      items: [
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "vertical",
        "horizontal",
        "horizontal",
      ],
    };
  },
};
</script>

<style scoped>
.Button {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: max-content;
  max-height: max-content;
}

.Buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 90px;
}
</style>
