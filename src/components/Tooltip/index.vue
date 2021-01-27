<template>
  <div>
    <div v-if="active" :class="['Tooltip', 'Tooltip--' + position]">
      <span class="Tooltip__text">{{ label }}</span>
      <slot name="default" />
    </div>
    <slot v-else name="default" />
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    active: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "top", //top, bottom, left, right
    },
  },
};
</script>

<style lang="scss" scoped>
.Tooltip {
  position: relative;
  display: inline-block;

  .Tooltip__text {
    font-family: Verdana, sans-serif;
    font-size: 12px;
    visibility: hidden;
    width: max-content;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 0.3rem;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 1s;
  }

  &.Tooltip--top .Tooltip__text {
    top: 0%;
    left: 50%;
    transform: translateY(-100%) translateX(-50%);
  }

  &.Tooltip--bottom .Tooltip__text {
    bottom: 0%;
    left: 50%;
    transform: translateY(100%) translateX(-50%);
  }

  &.Tooltip--right .Tooltip__text {
    top: 50%;
    right: 0%;
    transform: translateY(-50%) translateX(100%);
  }

  &.Tooltip--left .Tooltip__text {
    top: 50%;
    left: 0%;
    transform: translateY(-50%) translateX(-100%);
  }

  &:hover .Tooltip__text {
    visibility: visible;
    opacity: 1;
  }
}
</style>
