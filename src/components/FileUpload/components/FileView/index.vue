<template>
  <div class="FileView" :style="'--progress: ' + percentReverse">
    <i
      v-if="isUploading"
      class="FileView__icon fad fa-file-upload"
      style="color: blue;"
    />
    <i
      v-if="isFinished"
      class="FileView__icon fad fa-file-check"
      style="color: green;"
    />
    <i
      v-if="isFailed"
      class="FileView__icon fad fa-file-times"
      style="color: red;"
    />
    <div class="FileView__rightcontent">
      <div class="FileView__text">
        <span class="FileView__name">{{ file.name }}</span>
        <span class="FileView__status">{{ status }}</span>
        <span class="FileView__percent">{{ percent }}</span>
      </div>
      <div class="FileView__progressbar">
        <div class="FileView__progress" />
      </div>
    </div>
  </div>
</template>

<script>
import { Status as UploadStatus } from "../../containers/UploadContainer/types";

export default {
  name: "FileView",
  props: {
    file: {
      type: File,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isUploading() {
      return this.status == UploadStatus.UPLOADING;
    },
    isFinished() {
      return this.status == UploadStatus.FINISHED;
    },
    isFailed() {
      return (
        this.status == UploadStatus.FAILED ||
        this.status == UploadStatus.INVALID_TYPE ||
        this.status == UploadStatus.INVALID_SIZE
      );
    },
    percent() {
      if (this.progress === -1) return "";
      return this.progress * 100 + "%";
    },
    percentReverse() {
      if (this.progress === -1) return "100%";
      return 100 - this.progress * 100 + "%";
    },
  },
  created() {
    this.UploadStatus = UploadStatus;
  },
};
</script>

<style lang="scss" scoped>
.FileView {
  display: flex;
  align-content: center;
  justify-content: space-around;
  width: 100%;

  --font-family: "Roboto", sans-serif;
  --font-size: 14px;

  .FileView__icon {
    font-size: 32px;
  }

  .FileView__rightcontent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin: 2px;
  }

  .FileView__text {
    display: flex;
  }

  .FileView__name {
    font-family: var(--font-family);
    font-size: var(--font-size);
    width: stretch;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .FileView__status {
    font-family: var(--font-family);
    font-size: var(--font-size);
    min-width: 80px;
    color: gray;
  }

  .FileView__percent {
    font-family: var(--font-family);
    font-size: var(--font-size);
    min-width: 40px;
    text-align: right;
  }

  .FileView__progressbar {
    position: relative;
    background-color: lightgray;
    width: 100%;
    height: 6px;
  }

  .FileView__progress {
    position: absolute;
    background-color: rgb(0, 180, 0);
    top: 0;
    bottom: 0;
    left: 0;
    right: var(--progress);
  }
}
</style>
