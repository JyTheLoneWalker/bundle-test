const uploadQueryKeys = {
  upload: ['upload'],
  uploadStatus: (taskId: number) => ['upload', 'status', taskId],
};

export { uploadQueryKeys };
