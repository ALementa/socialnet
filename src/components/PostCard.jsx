export default function PostCard({ post, children }) {
  return (
    <div className="bg-white shadow-sm border rounded-lg p-5 mb-4">
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <p className="text-gray-700 mt-2">{post.content}</p>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
