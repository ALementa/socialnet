import Link from "next/link";
import { db } from "@/utils/connect";
import LikeButton from "@/components/LikeButton";

export default async function PostsPage() {
  const posts = (
    await db.query(`
    SELECT 
      posts.*, 
      user_account.username, 
      user_account.clerk_id,
      COUNT(likes.id) AS likes_count
    FROM posts
    JOIN user_account 
      ON posts.user_id = user_account.id
    LEFT JOIN likes 
      ON likes.post_id = posts.id
    GROUP BY posts.id, user_account.username, user_account.clerk_id
    ORDER BY posts.created_at DESC
  `)
  ).rows;

  return (
    <div>
      <h1>Global timeline</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>

          <p>{post.content}</p>

          <p>
            by
            <Link href={`/users/${post.clerk_id}`}>{post.username}</Link>
          </p>
          <p>
            <Link href={`/posts/${post.id}`}>Open post</Link>
          </p>
          <p>
            ❤️ {post.likes_count} likes
            <LikeButton postId={post.id} />
          </p>
        </div>
      ))}
    </div>
  );
}
