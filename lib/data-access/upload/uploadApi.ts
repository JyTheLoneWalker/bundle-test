const postUpload = async (file: File) => {
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};
const getUploadStatus = async (taskId: number) => {
  const response = await fetch(`/api/status/${taskId}`);
  return await response.json();
};

export { postUpload, getUploadStatus };
