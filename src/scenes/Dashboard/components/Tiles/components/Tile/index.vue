<template>
  <div>
    <div v-if="!action" :class="['Tile', action && 'Tile--clickable']">
      <div class="Tile__content">
        <i :class="'Tile__icon ' + icon"></i>
        <div class="Tile__amount">{{ amount }}</div>
        <div class="Tile__title">{{ title }}</div>
      </div>
    </div>
    <div v-else :class="['Tile', action && 'Tile--clickable']" @click="action">
      <div class="Tile__content">
        <i :class="'Tile__icon ' + icon"></i>
        <div class="Tile__amount">{{ amount }}</div>
        <div class="Tile__title">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tile",
  props: {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
      default: "number", //number, currency, date / brug eksisterende komponent til formattering
    },
    icon: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.Tile {
	display: flex;
	align-items: center;
	justify-content: center;
  max-width: 240px;
  max-height: 240px;
  border-radius: 6px;
  border: 1px solid #e7e7e7;

  &.Tile--clickable:hover {
    cursor: pointer;
    .Tile__title {
      text-decoration: underline;
    }
  }
}

.Tile__content {
	text-align: center;
	padding: 2em;
}
</style>
