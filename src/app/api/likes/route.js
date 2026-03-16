import { db } from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  const { userId } = await auth();
  const { post_id } = await req.json();

  // получаем пользователя из базы
  const user = (
    await db.query(`SELECT id FROM user_account WHERE clerk_id=$1`, [userId])
  ).rows[0];

  const like = await db.query(
    `INSERT INTO likes (post_id, user_id)
     VALUES ($1,$2)
     ON CONFLICT DO NOTHING
     RETURNING *`,
    [post_id, user.id],
  );

  return Response.json(like.rows[0]);
}
