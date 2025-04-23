const postUpload = (file: File) =>
  fetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export { postUpload };
