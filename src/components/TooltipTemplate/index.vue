<template>
  <div
    :class="['Tooltip', 'Tooltip--' + position, 'Tooltip--' + size]"
    ref="element"
    :style="'--color: ' + color"
  >
    <transition>
      <div v-if="active">
        <div class="Tooltip__arrow" />
        <div class="Tooltip__content" ref="tooltip">
          <slot name="content" :close="close" />
        </div>
      </div>
    </transition>
    <slot name="default" :show="show" :close="close" />
  </div>
</template>

<script>
export default {
  name: "TooltipTemplate",
  props: {
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
      default: "small", //small, medium, large
    },
    color: {
      type: String,
      default: "gray",
    },
  },
  data() {
    return {
      active: false,
      timeout: null,
      position: "top", //top, bottom, left, right, topleft, topright, bottomleft, bottomright
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

      //Edge case
      var pos = this.isAtEdge(rect, rectTooltip, windowWidth, windowHeight);
      if (pos) return pos;

      //Normal case
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
    isAtEdge(rect, rectTooltip, windowWidth, windowHeight) {
      var isLeftWindow = this.isLeftWindow(rect, windowWidth);
      var isTopWindow = this.isTopWindow(rect, windowHeight);
      var isAtLeft = rect.centerX - rectTooltip.width / 2 < 0;
      var isAtRight = rect.centerX + rectTooltip.width / 2 > windowWidth;
      var isAtTop = rect.centerY - rectTooltip.height / 2 < 0;
      var isAtBottom = rect.centerY + rectTooltip.height / 2 > windowHeight;

      //Vertical
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

  --font: "Roboto", sans-serif;
  --arrow-size: 7px;
  --translate-backward: calc(-100% - var(--arrow-size) + 1px);
  --translate-forward: calc(100% + var(--arrow-size) - 1px);

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.4s;
  }
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }

  .Tooltip__content {
    width: max-content;
    background-color: var(--color);
    box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    position: absolute;
    z-index: 1;
  }

  .Tooltip__arrow {
    content: "";
    border: var(--arrow-size) solid transparent;
    position: absolute;
    z-index: 2;
  }

  &.Tooltip--small .Tooltip__content {
    max-width: 160px;
  }
  &.Tooltip--medium .Tooltip__content {
    max-width: 280px;
  }
  &.Tooltip--large .Tooltip__content {
    max-width: 400px;
  }

  //Top
  &.Tooltip--top {
    .Tooltip__content {
      top: 0%;
      left: 50%;
      transform: translateY(var(--translate-backward)) translateX(-50%);
    }
    .Tooltip__arrow {
      border-top-color: var(--color);
      top: 0%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }
  //Bottom
  &.Tooltip--bottom {
    .Tooltip__content {
      bottom: 0%;
      left: 50%;
      transform: translateY(var(--translate-forward)) translateX(-50%);
    }
    .Tooltip__arrow {
      border-bottom-color: var(--color);
      bottom: 0%;
      left: 50%;
      transform: translateY(50%) translateX(-50%);
    }
  }
  //Right
  &.Tooltip--right {
    .Tooltip__content {
      top: 50%;
      right: 0%;
      transform: translateY(-50%) translateX(var(--translate-forward));
    }
    .Tooltip__arrow {
      border-right-color: var(--color);
      top: 50%;
      right: 0%;
      transform: translateY(-50%) translateX(50%);
    }
  }
  //Left
  &.Tooltip--left {
    .Tooltip__content {
      top: 50%;
      left: 0%;
      transform: translateY(-50%) translateX(var(--translate-backward));
    }
    .Tooltip__arrow {
      border-left-color: var(--color);
      top: 50%;
      left: 0%;
      transform: translateY(-50%) translateX(-50%);
    }
  }

  //Top-left cases
  &.Tooltip--topleft {
    .Tooltip__content {
      bottom: 0%;
      left: 0%;
      transform: translateX(var(--translate-backward));
    }
    .Tooltip__arrow {
      border-left-color: var(--color);
      top: 50%;
      left: 0%;
      transform: translateY(-50%) translateX(-50%);
    }
  }
  &.Tooltip--topleft2 {
    .Tooltip__content {
      top: 0%;
      right: 0%;
      transform: translateY(var(--translate-backward));
    }
    .Tooltip__arrow {
      border-top-color: var(--color);
      top: 0%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }

  //Top-right cases
  &.Tooltip--topright {
    .Tooltip__content {
      bottom: 0%;
      right: 0%;
      transform: translateX(var(--translate-forward));
    }
    .Tooltip__arrow {
      border-right-color: var(--color);
      top: 50%;
      right: 0%;
      transform: translateY(-50%) translateX(50%);
    }
  }
  &.Tooltip--topright2 {
    .Tooltip__content {
      top: 0%;
      left: 0%;
      transform: translateY(var(--translate-backward));
    }
    .Tooltip__arrow {
      border-top-color: var(--color);
      top: 0%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }

  //Bottom-left cases
  &.Tooltip--bottomleft {
    .Tooltip__content {
      top: 0%;
      left: 0%;
      transform: translateX(var(--translate-backward));
    }
    .Tooltip__arrow {
      border-left-color: var(--color);
      top: 50%;
      left: 0%;
      transform: translateY(-50%) translateX(-50%);
    }
  }
  &.Tooltip--bottomleft2 {
    .Tooltip__content {
      bottom: 0%;
      right: 0%;
      transform: translateY(var(--translate-forward));
    }
    .Tooltip__arrow {
      border-bottom-color: var(--color);
      bottom: 0%;
      left: 50%;
      transform: translateY(50%) translateX(-50%);
    }
  }

  //Bottom-right cases
  &.Tooltip--bottomright {
    .Tooltip__content {
      top: 0%;
      right: 0%;
      transform: translateX(var(--translate-forward));
    }
    .Tooltip__arrow {
      border-right-color: var(--color);
      top: 50%;
      right: 0%;
      transform: translateY(-50%) translateX(50%);
    }
  }
  &.Tooltip--bottomright2 {
    .Tooltip__content {
      bottom: 0%;
      left: 0%;
      transform: translateY(var(--translate-forward));
    }
    .Tooltip__arrow {
      border-bottom-color: var(--color);
      bottom: 0%;
      left: 50%;
      transform: translateY(50%) translateX(-50%);
    }
  }
}
</style>
