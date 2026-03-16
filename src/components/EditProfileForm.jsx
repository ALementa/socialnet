"use client";

import { useState } from "react";

export default function EditProfileForm({ user }) {
  const [bio, setBio] = useState(user.bio || "");

  async function submit(e) {
    e.preventDefault();

    await fetch("/api/users/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio }),
    });

    location.href = `/users/${user.clerk_id}`;
  }

  return (
    <form onSubmit={submit}>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Your bio"
      />
      <button>Save</button>
    </form>
  );
}
