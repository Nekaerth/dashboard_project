<template>
  <UploadContainer
    v-slot="{ queue, status }"
    ref="uploadContainer"
    :fileTypes="['jpg', 'png', 'gif', 'svg', 'pdf']"
    :fileSizeLimit="1024"
  >
    <div class="FileUpload">
      <div class="FileUpload__dropzone">
        <DropZone
          @addedFiles="handleFiles"
          description="Træk fil herind eller vælg en fil"
        />
      </div>
      <span class="FileUpload__text">Uploading files: {{ status }}</span>
      <FileView
        v-for="item in orderedQueue(queue)"
        :key="item.file.name + item.file.size + item.file.lastModified"
        :file="item.file"
        :status="item.status"
        :progress="item.progress"
      />
    </div>
  </UploadContainer>
</template>

<script>
import UploadContainer from "./containers/UploadContainer";
import DropZone from "./components/DropZone";
import FileView from "./components/FileView";

export default {
  name: "FileUpload",
  components: {
    UploadContainer,
    DropZone,
    FileView,
  },
  methods: {
    orderedQueue(queue) {
      var orderedQueue = [];
      queue.forEach((item) => {
        orderedQueue.push(item);
      });
      return orderedQueue.sort(this.compareItem);
    },
    compareItem(itemOne, itemTwo) {
      if (itemOne.progress < itemTwo.progress) return 1;
      if (itemOne.progress > itemTwo.progress) return -1;
      return 0;
    },
    handleFiles(files) {
      this.$refs.uploadContainer.uploadFiles(files);
    },
  },
};
</script>

<style lang="scss" scoped>
.FileUpload {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;

  .FileUpload__dropzone {
    height: 300px;
  }

  .FileUpload__text {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    color: gray;
  }
}
</style>
