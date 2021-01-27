<template>
  <div :class="['Tooltip', 'Tooltip--' + position]" ref="content">
    <div v-show="active" class="Tooltip__content">
      <i @click="close" class="Tooltip__button fad fa-times-square"></i>
      <slot name="content" :close="close" />
    </div>
    <slot name="default" :show="show" />
  </div>
</template>

<script>
export default {
  name: "TooltipExtended",
  props: {
    title: {
      type: String,
      default: "",
    },
    timer: {
      type: Number,
      default: -1,
    },
    positioning: {
      type: String,
      default: "vertical", //vertical, horizontal
    },
  },
  data() {
    return {
      active: false,
      timeout: null,
      position: "top", //top, bottom, left. right, topleft, topright, bottomleft, bottomright
    };
  },
  methods: {
    show() {
      this.setPosition();
      this.active = true;
      if (this.timer != -1) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => (this.active = false), this.timer);
      }
    },
    close() {
      this.active = false;
    },
    setPosition() {
      this.position = this.getPosition();
    },
    getPosition() {
      var rect = this.$refs.content.getBoundingClientRect();
      var rectWidth = rect.right - rect.left;
      var rectHeight = rect.bottom - rect.top;
      var rectX = rect.left + rectWidth / 2;
      var rectY = rect.top + rectHeight / 2;

      var rectBody = document.body.getBoundingClientRect();
      var rectBodyWidth = rectBody.right - rectBody.left;
      var rectBodyHeight = rectBody.bottom - rectBody.top;
      var rectBodyX = rectBody.left + rectBodyWidth / 2;
      var rectBodyY = rectBody.top + rectBodyHeight / 2;

      if (this.positioning == "vertical") {
        if (rectY > rectBodyY) {
          return "top";
        } else {
          return "bottom";
        }
      } else {
        if (rectX > rectBodyX) {
          return "left";
        } else {
          return "right";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Tooltip {
  position: relative;
  display: inline-block;

  .Tooltip__content {
    width: max-content;
    background-color: rgb(140, 154, 235);
    border-radius: 4px;
    padding: 0.3rem;
    position: absolute;
    z-index: 1;
  }

  &.Tooltip--top .Tooltip__content {
    top: 0%;
    left: 50%;
    transform: translateY(-100%) translateX(-50%);
  }

  &.Tooltip--bottom .Tooltip__content {
    bottom: 0%;
    left: 50%;
    transform: translateY(100%) translateX(-50%);
  }

  &.Tooltip--right .Tooltip__content {
    top: 50%;
    right: 0%;
    transform: translateY(-50%) translateX(100%);
  }

  &.Tooltip--left .Tooltip__content {
    top: 50%;
    left: 0%;
    transform: translateY(-50%) translateX(-100%);
  }

  &.Tooltip--topleft .Tooltip__content {
    top: 0%;
    left: 0%;
    transform: translateY(-100%) translateX(-100%);
  }

  &.Tooltip--topright .Tooltip__content {
    top: 0%;
    right: 0%;
    transform: translateY(-100%) translateX(100%);
  }

  &.Tooltip--bottomleft .Tooltip__content {
    bottom: 0%;
    left: 0%;
    transform: translateY(100%) translateX(-100%);
  }

  &.Tooltip--bottomright .Tooltip__content {
    bottom: 0%;
    right: 0%;
    transform: translateY(100%) translateX(100%);
  }

  .Tooltip__button {
    position: absolute;
    top: 3px;
    right: 3px;
    transform: translateY(0%) translateX(0%);
  }
}
</style>
