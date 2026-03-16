import { db } from "@/utils/connect";
import { notFound } from "next/navigation";
import PostForm from "@/components/PostForm";
import FollowButton from "@/components/FollowButton";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default async function UserPage({ params }) {
  const { id } = await params;

  const user = (
    await db.query(`SELECT * FROM user_account WHERE clerk_id=$1`, [id])
  ).rows;

  if (user.length === 0) notFound();

  const userRow = user[0];

  const posts = (
    await db.query(
      `select * from posts where user_id=$1 order by created_at desc`,
      [userRow.id],
    )
  ).rows;

  const followers = (
    await db.query(`SELECT COUNT(*) FROM followers WHERE following_id=$1`, [
      userRow.id,
    ])
  ).rows[0].count;

  const following = (
    await db.query(`SELECT COUNT(*) FROM followers WHERE follower_id=$1`, [
      userRow.id,
    ])
  ).rows[0].count;

  return (
    <div>
      <h1>{userRow.username}</h1>
      <p>{userRow.bio}</p>

      {/* <Link href={`/users/${userRow.clerk_id}/edit`}>Edit profile</Link> */}
      <Link
        href={`/users/${userRow.clerk_id}/edit`}
        className="inline-flex items-center gap-2 mt-3 px-5 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 hover:shadow-lg transition-all"
      >
        <PencilSquareIcon className="w-5 h-5" />
        Edit profile
      </Link>

      <p>
        {followers} followers • {following} following
      </p>

      <FollowButton userId={userRow.id} />

      <h2>Create Post</h2>
      <PostForm />

      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>
            <Link href={`/posts/${post.id}/edit`}>Edit post</Link>
          </p>
        </div>
      ))}
    </div>
  );
}
