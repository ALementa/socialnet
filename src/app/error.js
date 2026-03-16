"use client";

export default function Error({ error, reset }) {
  return (
    <div className="text-center mt-20">
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
