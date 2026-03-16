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

      <button>Create post</button>
    </form>
  );
}
