<template>
  <div
    :class="['DropZone', isOver != 0 && 'DropZone--isOver']"
    @click="chooseFiles"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <div class="DropZone__container">
      <i class="DropZone__icon fas fa-folder-download"></i>
      <span v-if="description" class="DropZone__description">{{
        description
      }}</span>
    </div>
    <input
      type="file"
      multiple="multiple"
      @change="handleFiles"
      ref="input"
      style="display: none"
    />
  </div>
</template>

<script>
export default {
  name: "DropZone",
  props: {
    description: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOver: 0,
    };
  },
  methods: {
    chooseFiles() {
      this.$refs.input.click();
    },
    handleFiles(e) {
      this.emitFiles(e.target.files);
    },
    preventEvent(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    onDragEnter() {
      this.isOver++;
    },
    onDragLeave() {
      this.isOver--;
    },
    onDragOver(e) {
      this.preventEvent(e);
    },
    onDrop(e) {
      this.preventEvent(e);
      this.isOver--;
      this.emitFiles(e.dataTransfer.files);
    },
    emitFiles(files) {
      this.$emit("addedFiles", files);
    },
  },
};
</script>

<style lang="scss" scoped>
.DropZone {
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 3px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;

  .DropZone__container {
    text-align: center;
    margin: auto;
    width: 100%;
  }

  .DropZone__icon {
    font-size: 40px;
    color: blue;
    width: 100%;
  }

  .DropZone__description {
    font-family: "Roboto", sans-serif;
    font-size: 12px;
    color: gray;
  }

  &.DropZone--isOver {
    background-color: rgb(196, 229, 240);
  }

  &:hover {
    cursor: pointer;
    .DropZone__description {
      text-decoration: underline;
    }
  }
}
</style>
