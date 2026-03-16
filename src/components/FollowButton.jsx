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

  return <button onClick={handleFollow}>Follow</button>;
}
