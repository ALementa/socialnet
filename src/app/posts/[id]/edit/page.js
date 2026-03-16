import { db } from "@/utils/connect";
import EditPostForm from "@/components/EditPostForm";

export default async function EditPostPage({ params }) {
  const { id } = await params;

  const post = (await db.query(`SELECT * FROM posts WHERE id=$1`, [id]))
    .rows[0];

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div>
      <h1>Edit post</h1>
      <EditPostForm post={post} />
    </div>
  );
}
