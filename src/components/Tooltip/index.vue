<template>
  <div>
    <v-tooltip v-bind="getPosition">
      <template v-slot:activator="{ on }">
        <div v-if="active" class="Tooltip__content" v-on="on">
          <slot name="default" />
        </div>
        <div v-else class="Tooltip__content">
          <slot name="default" />
        </div>
      </template>
      <span>{{ label }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    active: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "bottom", //top, bottom, left, right
    },
  },
  computed: {
    getPosition() {
      return {
        [`${this.position}`]: true,
      };
    },
  },
};
</script>

<style scoped>
.Tooltip__content {
  display: inline-block;
}
</style>
