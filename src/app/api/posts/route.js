import { db } from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const posts = await db.query(`SELECT * FROM posts ORDER BY created_at DESC`);

  return Response.json(posts.rows);
}

export async function POST(req) {
  const { userId } = await auth();

  const data = await req.json();

  // получаем пользователя из базы
  const user = (
    await db.query(`SELECT id FROM user_account WHERE clerk_id=$1`, [userId])
  ).rows[0];

  const newPost = await db.query(
    `INSERT INTO posts (title, content, user_id)
     VALUES ($1,$2,$3) RETURNING *`,
    [data.title, data.content, user.id],
  );

  return Response.json(newPost.rows[0]);
}
