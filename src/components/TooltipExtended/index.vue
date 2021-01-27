<template>
  <div class="TooltipExtended">
    <div v-if="active" class="TooltipExtended__content">
      <button @click="close">X</button>
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
  },
  data() {
    return {
      active: false,
      timeout: null,
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
  },
};
</script>

<style lang="scss" scoped>
.TooltipExtended {
  position: relative;
  display: inline-block;

  .TooltipExtended__content {
    width: max-content;
    background-color: rgb(90, 111, 226);
    border-radius: 6px;
    padding: 0.3rem;
    position: absolute;
    z-index: 1;

    /*Temporary position*/
    bottom: 0%;
    left: 50%;
    transform: translateY(105%) translateX(-50%);
  }
}
</style>
