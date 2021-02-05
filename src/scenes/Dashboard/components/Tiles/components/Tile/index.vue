<template>
  <div>
    <div
      :class="['Tile', action && 'Tile--clickable']"
      @click="action && action()"
    >
      <div class="Tile__content">
        <Emblem class="Tile__emblem">
          <i :class="icon"></i>
        </Emblem>
        <div class="Tile__amount">{{ amount }}</div>
        <div class="Tile__title">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Emblem from "./components/Emblem";

export default {
  name: "Tile",
  components: {
    Emblem,
  },
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
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
.Tile {
  display: flex;
  align-content: center;
  justify-content: center;
  max-width: 240px;
  max-height: 240px;
  border-radius: 3px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);

  .Tile__content {
    text-align: center;
    padding: 30px;
    font-family: "Roboto", sans-serif;
    margin: auto;
  }

  .Tile__emblem {
    margin: auto;
  }

  .Tile__amount {
    font-size: 20px;
    font-weight: bold;
  }

  .Tile__title {
    font-size: 12px;
    color: gray;
  }

  &.Tile--clickable:hover {
    cursor: pointer;
    background-color: rgb(250, 250, 250);
    .Tile__title {
      text-decoration: underline;
    }
  }
}
</style>
