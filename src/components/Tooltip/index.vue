<template>
  <div>
    <div v-if="active" :class="getClass">
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
      default: "right", //top, bottom, left, right
    },
  },
  computed: {
    getClass() {
      return "Tooltip__content Tooltip__" + this.position;
    },
  },
};
</script>

<style lang="scss" scoped>
.Tooltip__content {
  position: relative;
  display: inline-block;
}

.Tooltip__content .Tooltip__text {
  font-family: Verdana, sans-serif;
  font-size: 12px;
  visibility: hidden;
  width: max-content;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 0.3rem;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}
.Tooltip__content.Tooltip__top .Tooltip__text {
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.Tooltip__content.Tooltip__bottom .Tooltip__text {
  width: 120px;
  top: 100%;
  left: 50%;
  margin-left: -60px;
}

.Tooltip__content.Tooltip__right .Tooltip__text {
  top: -5px;
  left: 105%;
}

.Tooltip__content.Tooltip__left .Tooltip__text {
  top: -5px;
  right: 105%;
}

.Tooltip__content:hover .Tooltip__text {
  visibility: visible;
}
</style>
