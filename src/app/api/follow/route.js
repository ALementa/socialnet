import { db } from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  const { userId } = await auth();
  const { following_id } = await req.json();

  const user = (
    await db.query(`SELECT id FROM user_account WHERE clerk_id=$1`, [userId])
  ).rows[0];

  const follow = await db.query(
    `INSERT INTO followers (follower_id, following_id)
     VALUES ($1,$2)
     ON CONFLICT DO NOTHING
     RETURNING *`,
    [user.id, following_id],
  );

  return Response.json(follow.rows[0]);
}
