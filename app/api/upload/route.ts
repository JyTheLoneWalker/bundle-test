const uploaded = [];

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const randomId = Math.floor(Math.random() * 10000);
  uploaded.push({ taskId: randomId, uploadDate: Date.now() });

  return Response.json({ task_id: randomId });
}
