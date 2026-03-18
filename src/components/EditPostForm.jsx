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
      <h2 className="text-2xl font-bold mb-4">Title</h2>
      <p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </p>
      <h2 className="text-2xl font-bold mb-4">Content</h2>
      <p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
      </p>
      <p>
        <button className="px-5 py-2 bg-purple-600 text-white font-medium rounded-lg shadow hover:bg-purple-700 active:scale-95 transition-all">
          Save
        </button>
      </p>
    </form>
  );
}
