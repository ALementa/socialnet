// src/app/api/posts/[id]/route.js
import { db } from "@/utils/connect";

export async function PUT(req, { params }) {
  const { id } = params;
  const { title, content } = await req.json();

  await db.query(`UPDATE posts SET title=$1, content=$2 WHERE id=$3`, [
    title,
    content,
    id,
  ]);

  return Response.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await db.query(`DELETE FROM posts WHERE id=$1`, [id]);

  return Response.json({ success: true });
}
