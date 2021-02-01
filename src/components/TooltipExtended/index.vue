<template>
  <div
    :class="[
      'Tooltip',
      'Tooltip--' + position,
      size ? 'Tooltip--' + size : undefined,
    ]"
    ref="element"
  >
    <div v-if="active" class="Tooltip__arrow" />
    <div v-if="active" class="Tooltip__content" ref="tooltip">
      <Close @click="close" size="small" class="Tooltip__button" />
      <div class="Tooltip__topcontent">
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
    <slot name="default" :show="show" />
  </div>
</template>

<script>
import Close from "../Close";
export default {
  name: "TooltipExtended",
  components: {
    Close,
  },
  props: {
    title: {
      type: String,
      default: "",
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
      default: "", //small, medium, large
    },
  },
  data() {
    return {
      active: false,
      timeout: null,
      position: "top", //top, bottom, left, right, topleft, topright, bottomleft, bottomright
      ready: false,
    };
  },
  computed: {
    hasImageSlot() {
      return !!this.$slots.image;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
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

  --color: white;
  --text-color: rgb(16, 24, 45);
  --font: "Roboto", sans-serif;
  --arrow-size: 7px;
  --translate-backward: calc(-100% - var(--arrow-size) + 1px);
  --translate-forward: calc(100% + var(--arrow-size) - 1px);

  .Tooltip__content {
    width: max-content;
    min-height: 50px;
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

  .Tooltip__button {
    position: absolute;
    top: 0%;
    right: 0%;
  }

  .Tooltip__topcontent {
    display: flex;
    margin: 10px;
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

  &.Tooltip--small .Tooltip__content {
    max-width: 200px;
  }
  &.Tooltip--medium .Tooltip__content {
    max-width: 300px;
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
      transform: translateY(-50%);
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
      transform: translateY(50%);
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
      right: 0%;
      transform: translateX(50%);
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
      left: 0%;
      transform: translateX(-50%);
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
      left: 0%;
      transform: translateX(-50%);
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
      transform: translateY(-50%);
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
      right: 0%;
      transform: translateX(50%);
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
      transform: translateY(-50%);
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
      left: 0%;
      transform: translateX(-50%);
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
      transform: translateY(50%);
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
      right: 0%;
      transform: translateX(50%);
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
      transform: translateY(50%);
    }
  }
}
</style>
