<template>
  <div>
    <TooltipTemplate
      :positioning="positioning"
      :timer="timer"
      :size="size"
      color="white"
    >
      <template #content="{ close }">
        <div class="Tooltip">
          <Close @click="close" size="small" class="Tooltip__button" />
          <div class="Tooltip__content">
            <div v-if="hasImageSlot" class="Tooltip__image">
              <slot name="image" />
            </div>
            <div class="Tooltip__rightcontent">
              <span class="Tooltip__title">{{ title }}</span>
              <div class="Tooltip__body">
                <slot name="content" />
              </div>
            </div>
          </div>
          <div v-if="hasFooterSlot" class="Tooltip__footer">
            <slot name="footer" :close="close" />
          </div>
        </div>
      </template>
      <template #default="{ show }">
        <slot name="default" :show="show" />
      </template>
    </TooltipTemplate>
  </div>
</template>

<script>
import TooltipTemplate from "../../../TooltipTemplate";
import Close from "../../../Close";

export default {
  name: "TooltipExtended",
  components: {
    TooltipTemplate,
    Close,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    positioning: {
      type: String,
      default: "vertical", //vertical, horizontal
    },
    timer: {
      type: Number,
      default: -1,
    },
    size: {
      type: String,
      default: "medium", //small, medium, large
    },
  },
  computed: {
    hasImageSlot() {
      return !!this.$slots.image;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
  },
};
</script>

<style lang="scss" scoped>
.Tooltip {
  --font: "Roboto", sans-serif;
  --text-color: rgb(16, 24, 45);

  .Tooltip__button {
    position: absolute;
    top: 0%;
    right: 0%;
  }

  .Tooltip__content {
    display: flex;
    padding: 10px 10px 10px 10px;
  }

  .Tooltip__image {
    margin: auto;
    padding-right: 10px;
  }

  .Tooltip__rightcontent {
    font-family: var(--font);
    color: var(--text-color);
  }

  .Tooltip__title {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 10px;
  }

  .Tooltip__body {
    font-size: 12px;
  }

  .Tooltip__footer {
    display: flex;
    justify-content: space-between;
    font-family: var(--font);
    color: var(--text-color);
    padding: 0px 10px 10px 10px;
  }
}
</style>
