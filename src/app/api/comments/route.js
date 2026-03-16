import { db } from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  const { userId } = await auth();

  const data = await req.json();

  const user = (
    await db.query(`SELECT id FROM user_account WHERE clerk_id=$1`, [userId])
  ).rows[0];

  const comment = await db.query(
    `INSERT INTO comments (content, post_id, user_id)
     VALUES ($1,$2,$3) RETURNING *`,
    [data.content, data.post_id, user.id],
  );

  return Response.json(comment.rows[0]);
}
