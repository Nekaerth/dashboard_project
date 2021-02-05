import { Status } from "./types";

export default {
  name: "UploadContainer",
  props: {
    fileTypes: {
      type: Array,
      default() {
        return [];
      },
    },
    fileSizeLimit: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      queue: [],
    };
  },
  computed: {
    status() {
      if (this.queue.some((e) => e.status == Status.UPLOADING))
        return Status.WORKING;
      return Status.IDLE;
    },
  },
  methods: {
    uploadFiles(files) {
      files.forEach((file) => {
        // check at de ikke findes og hvis de gør så tjek status (failed = retry)
        if (this.queueContain(file)) return; //notificer når man prøver at tilføje en eksisterende fil?
        if (this.isInvalidType(file))
          this.addFile(file, Status.INVALID_TYPE, -1);
        else if (this.isInvalidSize(file))
          this.addFile(file, Status.INVALID_SIZE, -1);
        else this.addFile(file, Status.UPLOADING, 0);
      });
      //this.simulateUploading(); //Only works if two valid files are added simultaneously
    },
    addFile(file, status, progress) {
      this.queue.push({ file: file, status: status, progress: progress });
    },
    set(item, status, progress) {
      item.status = status;
      item.progress = progress;
    },
    queueContain(file) {
      for (var i = 0; i < this.queue.length; i++) {
        var f = this.queue[i].file;
        if (
          file.name === f.name &&
          file.size === f.size &&
          file.lastModified === f.lastModified
        ) {
          return true;
        }
      }
      return false;
    },
    isInvalidType(file) {
      if (!this.fileTypes) return false;
      var fileType = file.name.split(".").pop();
      for (var i = 0; i < this.fileTypes.length; i++)
        if (fileType === this.fileTypes[i]) return false;
      return true;
    },
    isInvalidSize(file) {
      if (this.fileSizeLimit === -1) return false;
      else return file.size > this.fileSizeLimit;
    },
    simulateUploading() {
      setTimeout(() => {
        this.set(this.queue[0], Status.UPLOADING, 0.1);
        this.set(this.queue[1], Status.UPLOADING, 0.05);
      }, 500);
      setTimeout(() => {
        this.set(this.queue[0], Status.UPLOADING, 0.2);
        this.set(this.queue[1], Status.UPLOADING, 0.1);
      }, 1000);
      setTimeout(() => {
        this.set(this.queue[0], Status.UPLOADING, 0.3);
        this.set(this.queue[1], Status.UPLOADING, 0.15);
      }, 1500);
      setTimeout(() => {
        this.set(this.queue[0], Status.UPLOADING, 0.4);
        this.set(this.queue[1], Status.UPLOADING, 0.3);
      }, 2000);
      setTimeout(() => {
        this.set(this.queue[0], Status.UPLOADING, 0.5);
        this.set(this.queue[1], Status.UPLOADING, 0.45);
      }, 2500);
      setTimeout(() => {
        this.set(this.queue[0], Status.UPLOADING, 0.6);
        this.set(this.queue[1], Status.UPLOADING, 0.6);
      }, 3000);
      setTimeout(() => {
        this.set(this.queue[0], Status.UPLOADING, 0.7);
        this.set(this.queue[1], Status.UPLOADING, 0.75);
      }, 3500);
      setTimeout(() => {
        this.set(this.queue[0], Status.UPLOADING, 0.8);
        this.set(this.queue[1], Status.UPLOADING, 0.9);
      }, 4000);
      setTimeout(() => {
        this.set(this.queue[0], Status.UPLOADING, 0.9);
        this.set(this.queue[1], Status.FINISHED, 1.0);
      }, 4500);
      setTimeout(() => this.set(this.queue[0], Status.UPLOADING, 0.98), 5000);
      setTimeout(() => this.set(this.queue[0], Status.FINISHED, 1.0), 5500);
    },
  },
  render() {
    return this.$scopedSlots.default({
      uploadFiles: this.uploadFiles,
      queue: this.queue,
      status: this.status,
    });
  },
};
