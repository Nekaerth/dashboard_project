<template>
  <button
    :class="['Close', size ? 'Close--' + size : undefined]"
    aria-label="Close"
    @click.prevent="$emit('click')"
  ></button>
</template>
<script>
export default {
  name: "Close",
  props: {
    size: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.Close {
  position: relative;
  width: 48px;
  height: 48px;
  opacity: 0.3;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  display: block;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:before,
  &:after {
    position: absolute;
    left: calc(50% - 1px);
    top: calc(50% - 10px);
    content: " ";
    height: 20px;
    width: 2px;
    background-color: #333;
  }
  &.Close--small:before,
  &.Close--small:after {
    height: 14px;
    top: calc(50% - 7px);
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
}
.Close:hover {
  opacity: 1;
}
.Close:before,
.Close:after {
  position: absolute;
  left: calc(50% - 1px);
  top: calc(50% - 10px);
  content: " ";
  height: 20px;
  width: 2px;
  background-color: #333;
}
.Close:before {
  transform: rotate(45deg);
}
.Close:after {
  transform: rotate(-45deg);
}
</style>
