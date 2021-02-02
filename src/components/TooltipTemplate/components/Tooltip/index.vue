<template>
  <div>
    <TooltipTemplate
      :positioning="positioning"
      :timer="-1"
      size="small"
      color="#555"
    >
      <template #content>
        <div class="Tooltip">
          <span class="Tooltip__text">{{ label }}</span>
        </div>
      </template>
      <template #default="{ show, close}">
        <div @mouseover="show" @mouseleave="close">
          <slot name="default" />
        </div>
      </template>
    </TooltipTemplate>
  </div>
</template>

<script>
import TooltipTemplate from "../../../TooltipTemplate";

export default {
  name: "Tooltip",
  components: {
    TooltipTemplate,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    positioning: {
      type: String,
      default: "vertical", //vertical, horizontal
    },
  },
};
</script>

<style lang="scss" scoped>
.Tooltip {
  .Tooltip__text {
    display: inline-block;
    padding: 6px;
    font-family: "Roboto", sans-serif;
    color: white;
    font-size: 12px;
  }
}
</style>
