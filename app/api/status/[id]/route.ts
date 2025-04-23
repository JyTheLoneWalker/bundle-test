import { NextResponse } from 'next/server';

const requestedTask: Record<number, { progress: number; name: string }> = [];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number((await params).id);

  if (!requestedTask?.[id]) {
    requestedTask[id] = {
      progress: 20,
      name: `Random Name ${Object.keys(requestedTask).length + 1}`,
    };
    return NextResponse.json({ task_id: id, ...requestedTask[id] });
  }

  if (requestedTask[id].progress >= 100) {
    return NextResponse.json({ task_id: id, ...requestedTask[id] });
  }

  requestedTask[id].progress = requestedTask[id].progress + 20;

  return NextResponse.json({ task_id: id, ...requestedTask[id] });
}
