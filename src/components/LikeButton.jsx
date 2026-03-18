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

  return (
    <button
      className="px-5 py-2 bg-purple-600 text-white font-medium rounded-lg shadow hover:bg-purple-700 active:scale-95 transition-all"
      onClick={handleLike}
    >
      ❤️ Like
    </button>
  );
}
