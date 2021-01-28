<template>
  <div :class="['Tooltip', 'Tooltip--' + position]" ref="element">
    <div v-if="active" class="Tooltip__content" ref="tooltip">
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
      ready: false,
    };
  },
  methods: {
    show() {
      this.active = true;
      if (this.timer != -1) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => (this.active = false), this.timer);
      }
    },
    close() {
      this.active = false;
    },
    updatePosition() {
      if (this.active) this.position = this.calculatePosition();
    },
    calculatePosition() {
      var rect = this.getRect(this.$refs.element);
      var rectTooltip = this.$refs.tooltip.getBoundingClientRect();
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;

      //Corner case
      var res = this.isInCorner(rect, rectTooltip, windowWidth, windowHeight);
      if (res) return res;

      //Edge case
      res = this.isAtEdge(rect, rectTooltip, windowWidth, windowHeight);
      if (res) return res;

      //Normal case
      var pos = "";
      if (this.positioning == "vertical") {
        this.isTopWindow(rect, windowHeight) ? (pos = "bottom") : (pos = "top");
      } else {
        this.isLeftWindow(rect, windowWidth) ? (pos = "right") : (pos = "left");
      }
      return pos;
    },
    getRect(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };
    },
    isTopWindow(rect, windowHeight) {
      return rect.centerY < windowHeight / 2;
    },
    isLeftWindow(rect, windowWidth) {
      return rect.centerX < windowWidth / 2;
    },
    isInCorner(rect, rectTooltip, windowWidth, windowHeight) {
      var isLeftWindow = this.isLeftWindow(rect, windowWidth);
      var isTopWindow = this.isTopWindow(rect, windowHeight);
      var isAtLeft = rect.centerX - rectTooltip.width / 2 < 0;
      var isAtRight = rect.centerX + rectTooltip.width / 2 > windowWidth;
      var isAtTop = rect.centerY - rectTooltip.height / 2 < 0;
      var isAtBottom = rect.centerY + rectTooltip.height / 2 > windowHeight;

      //vertical
      if (this.positioning == "vertical") {
        if (isAtLeft && isTopWindow) return "bottomright2";
        if (isAtLeft && !isTopWindow) return "topright2";
        if (isAtRight && isTopWindow) return "bottomleft2";
        if (isAtRight && !isTopWindow) return "topleft2";
      }
      //Horizontal
      else {
        if (isAtTop && isLeftWindow) return "bottomright";
        if (isAtTop && !isLeftWindow) return "bottomleft";
        if (isAtBottom && isLeftWindow) return "topright";
        if (isAtBottom && !isLeftWindow) return "topleft";
      }
      return "";
    },
    isAtEdge() {
      return "";
    },
  },
  watch: {
    active(val, oldVal) {
      if (!oldVal && val) {
        this.$nextTick(() => {
          this.updatePosition();
          window.addEventListener("resize", this.updatePosition);
        });
      } else if (oldVal && !val) {
        window.removeEventListener("resize", this.updatePosition);
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updatePosition);
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

  //Normal cases
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

  //Top-left cases
  &.Tooltip--topleft .Tooltip__content {
    bottom: 0%;
    left: 0%;
    transform: translateX(-100%);
  }
  &.Tooltip--topleft2 .Tooltip__content {
    top: 0%;
    right: 0%;
    transform: translateY(-100%);
  }

  //Top-right cases
  &.Tooltip--topright .Tooltip__content {
    bottom: 0%;
    right: 0%;
    transform: translateX(100%);
  }
  &.Tooltip--topright2 .Tooltip__content {
    top: 0%;
    left: 0%;
    transform: translateY(-100%);
  }

  //Bottom-left cases
  &.Tooltip--bottomleft .Tooltip__content {
    top: 0%;
    left: 0%;
    transform: translateX(-100%);
  }
  &.Tooltip--bottomleft2 .Tooltip__content {
    bottom: 0%;
    right: 0%;
    transform: translateY(100%);
  }

  //Bottom-right cases
  &.Tooltip--bottomright .Tooltip__content {
    top: 0%;
    right: 0%;
    transform: translateX(100%);
  }
  &.Tooltip--bottomright2 .Tooltip__content {
    bottom: 0%;
    left: 0%;
    transform: translateY(100%);
  }

  .Tooltip__button {
    position: absolute;
    top: 3px;
    right: 3px;
    transform: translateY(0%) translateX(0%);
  }
}
</style>
