"use client";

export default function LikeButton({ postId }) {
  async function handleLike() {
    await fetch("/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: postId }),
    });
  }

  return <button onClick={handleLike}>❤️ Like</button>;
}
