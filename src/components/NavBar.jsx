// import Link from "next/link";
// import { auth } from "@clerk/nextjs/server";

// export default async function NavBar() {
//   const { userId } = await auth();

//   return (
//     <nav className="flex gap-6 p-4 border-b">
//       <Link href="/">Home</Link>

//       <Link href="/posts">Posts</Link>

//       {/* <Link href={`/users/${userId}`}>Profile</Link> */}
//       {userId && <Link href={`/users/${userId}`}>Profile</Link>}

//       <Link href="/about">About</Link>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function NavBar() {
  const { user } = useUser();
  // bg-gray-100
  // bg-red-200
  return (
    <nav className="flex gap-6 p-4 border-b text-black='true' ">
      <Link href="/">Home</Link>

      <Link href="/posts">Timeline</Link>

      {user && <Link href={`/users/${user.id}`}>Profile</Link>}

      <Link href="/about">About</Link>
    </nav>
  );
}
