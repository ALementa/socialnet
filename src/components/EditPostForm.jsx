"use client";

import { useState } from "react";

export default function EditPostForm({ post }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  async function submit(e) {
    e.preventDefault();

    await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    location.href = `/posts/${post.id}`;
  }

  return (
    <form onSubmit={submit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button>Save</button>
    </form>
  );
}
