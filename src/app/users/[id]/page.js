import { db } from "@/utils/connect";
import { notFound } from "next/navigation";
import PostForm from "@/components/PostForm";
import FollowButton from "@/components/FollowButton";

export default async function UserPage({ params }) {
  // const user = (
  //   await db.query(`select * from user_account where clerk_id=$1`, [params.id])
  // ).rows;
  const { id } = await params;

  const user = (
    await db.query(`SELECT * FROM user_account WHERE clerk_id=$1`, [id])
  ).rows;

  if (user.length === 0) notFound();

  const posts = (
    await db.query(
      `select * from posts where user_id=$1 order by created_at desc`,
      [user[0].id],
    )
  ).rows;

  const followers = (
    await db.query(`SELECT COUNT(*) FROM followers WHERE following_id=$1`, [
      user.id,
    ])
  ).rows[0].count;

  const following = (
    await db.query(`SELECT COUNT(*) FROM followers WHERE follower_id=$1`, [
      user.id,
    ])
  ).rows[0].count;

  return (
    <div>
      <h1>{user[0].username}</h1>
      <p>{user[0].bio}</p>
      <p>
        {followers} followers • {following} following
      </p>

      <FollowButton userId={user.id} />

      <h2>Create Post</h2>

      <PostForm />

      <h2>Posts</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
