"use client";

import { useState } from "react";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function submit(e) {
    e.preventDefault();

    // await fetch("/api/posts", {
    //   method: "POST",
    //   body: JSON.stringify({ title, content }),
    // });
    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    location.reload();
  }

  return (
    <form onSubmit={submit}>
      <p className="text-2xl font-bold mb-4">Title</p>
      <p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </p>
      <p className="text-2xl font-bold mb-4">Content</p>
      <p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
      </p>
      <p>
        <button className="inline-flex items-center gap-2 mt-3 px-5 py-2 bg-gray-200 text-black rounded-full shadow hover:bg-gray-500 active:scale-95 hover:shadow-lg transition-all">
          Create post
        </button>
      </p>
    </form>
  );
}
