"use client";

export default function FollowButton({ userId }) {
  async function handleFollow() {
    await fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ following_id: userId }),
    });
  }

  return (
    <button
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
      onClick={handleFollow}
    >
      Follow
    </button>
  );
}
