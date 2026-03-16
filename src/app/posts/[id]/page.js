import { db } from "@/utils/connect";
import Link from "next/link";

export default async function PostPage({ params }) {
  const { id } = await params;

  const post = (
    await db.query(
      `SELECT posts.*, user_account.username, user_account.clerk_id
       FROM posts
       JOIN user_account ON posts.user_id = user_account.id
       WHERE posts.id=$1`,
      [id],
    )
  ).rows[0];

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        by <Link href={`/users/${post.clerk_id}`}>{post.username}</Link>
      </p>
      <p>
        <Link href={`/posts/${post.id}/comments`}>View comments</Link>
      </p>
      <p>
        <Link href={`/posts/${post.id}/comment`}>Add comment</Link>
      </p>
      <p>
        <Link href={`/posts/${post.id}/likes`}>View likes</Link>
      </p>
      <p>
        <Link href={`/posts/${post.id}/edit`}>Edit post</Link>
      </p>
    </div>
  );
}
