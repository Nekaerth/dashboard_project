<template>
  <div
    :class="['Event', action && 'Event--clickable']"
    @click="action && action()"
  >
    <div class="Event__line"></div>
    <div class="Event__content">
      <div class="Event__title">{{ title }}</div>
      <div class="Event__description">{{ description }}</div>
    </div>
    <div class="Event__date">{{ getTime }}</div>
  </div>
</template>

<script>
export default {
  name: "Event",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
    action: {
      type: Function,
      default: undefined,
    },
  },
  computed: {
    getTime() {
      return (
        this.date
          .getHours()
          .toString()
          .padStart(2, "0") +
        ":" +
        this.date
          .getMinutes()
          .toString()
          .padStart(2, "0")
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.Event {
  display: flex;
  justify-content: space-between;
  font-family: "Roboto", sans-serif;

  --color: purple;
  --title-color: black;
  --title-size: 14px;
  --text-color: gray;
  --text-size: 12px;

  &.Event--clickable:hover {
    cursor: pointer;
    .Event__title {
      text-decoration: underline;
    }
  }

  .Event__line {
    background-color: var(--color);
    width: 4px;
    margin-right: 10px;
  }

  .Event__content {
    width: stretch;
  }

  .Event__title {
    font-size: var(--title-size);
    color: var(--title-color);
    font-weight: bold;
  }

  .Event__description {
    font-size: var(--text-size);
    color: var(--text-color);
  }

  .Event__date {
    font-size: var(--text-size);
    color: var(--text-color);
    min-width: max-content;
    margin: auto;
  }
}
</style>
