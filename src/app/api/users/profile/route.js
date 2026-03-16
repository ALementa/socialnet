import { db } from "@/utils/connect";
import { auth } from "@clerk/nextjs/server";

export async function PUT(req) {
  const { userId } = await auth();
  const { bio } = await req.json();

  await db.query(`UPDATE user_account SET bio=$1 WHERE clerk_id=$2`, [
    bio,
    userId,
  ]);

  return Response.json({ success: true });
}
