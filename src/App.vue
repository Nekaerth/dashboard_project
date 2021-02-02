<template>
  <div id="app">
    <div class="Buttons">
      <TooltipExtended
        v-for="(item, index) in items"
        class="Button"
        :key="index"
        title="What inspires you?"
        :positioning="item"
        :timer="-1"
        size="medium"
        ><template #image>
          <i class="fas fa-ambulance" style="font-size: 40px;"></i>
        </template>
        ><template #content>
          <span>
            Tell us your interests and we'll pick the best articles just for
            you.
          </span>
        </template>
        ><template #footer>
          <button
            style="background-color: rgb(12, 82, 156); color: white; border-width: 0px;"
          >
            Learn more
          </button>
        </template>
        <template #default="{ show }">
          <button @click="show">{{ item }}</button>
        </template>
      </TooltipExtended>
    </div>
  </div>
</template>

<script>
//import Dashboard from "./scenes/Dashboard";
//import Tooltip from "./components/TooltipTemplate/components/Tooltip";
import TooltipExtended from "./components/TooltipTemplate/components/TooltipExtended";

/*
<div class="Buttons">
  <Tooltip
    v-for="(item, index) in items"
    class="Button"
    :key="index"
    :label="item + ': just some tooltip'"
    :positioning="item"
  >
    <button>{{ item }}</button>
  </Tooltip>
</div>

<div class="Buttons">
  <TooltipExtended
    v-for="(item, index) in items"
    class="Button"
     :key="index"
    title="What inspires you?"
    :positioning="item"
    :timer="5000"
    size="medium"
    ><template #image>
      <i class="fas fa-ambulance" style="font-size: 40px;"></i>
    </template>
    ><template #content>
      <span
        >Tell us your interests and we'll pick the best articles just for
        you.</span
      >
    </template>
    ><template #footer>
      <button
        style="background-color: rgb(12, 82, 156); color: white; border-width: 0px"
      >
        Learn more
      </button>
    </template>
    <template #default="{ show }">
      <button @click="show">{{ item }}</button>
    </template>
  </TooltipExtended>
</div>
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
