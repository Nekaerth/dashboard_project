<template>
  <div
    :class="['Emblem', action && 'Emblem--clickable']"
    @click="action && action()"
  >
    <div class="Emblem__container">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Emblem",
  props: {
    size: {
      type: Number,
      default: 20,
    },
    color: {
      type: String,
      default: "black",
    },
    action: {
      type: Function,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
.Emblem {
  --size: 40px;
  --font-size: 20px;
  --color: rgba(0, 128, 0, 0.1);
  //--color: rgba(240, 240, 240, 1);
  --font-color: rgba(0, 128, 0, 1);

  display: flex;
  align-content: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  background-color: var(--color);
  border-radius: 50%;

  .Emblem__container {
    margin: auto;
    color: var(--font-color);
    font-size: var(--font-size);
    opacity: 1;
  }

  &.Emblem--clickable:hover {
    cursor: pointer;
  }
}
</style>
