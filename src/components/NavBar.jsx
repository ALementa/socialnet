"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import * as Avatar from "@radix-ui/react-avatar";

export default function NavBar() {
  const { user } = useUser();
  // bg-gray-100
  // bg-red-200
  return (
    <nav className="flex gap-6 p-4 border-b text-black='true' ">
      {/* {user && (
        <Avatar.Root className="inline-flex h-8 w-8 rounded-full overflow-hidden bg-gray-200">
          <Avatar.Image src={user.imageUrl} alt={user.fullName || "User"} />
          <Avatar.Fallback className="flex items-center justify-center text-sm">
            {user.firstName?.[0] || "U"}
          </Avatar.Fallback>
        </Avatar.Root>
      )} */}
      {user && (
        <Link href={`/users/${user.id}`} className="ml-auto">
          <Avatar.Root className="inline-flex h-10 w-10 rounded-full overflow-hidden bg-gray-200 hover:ring-2 hover:ring-purple-500 transition">
            <Avatar.Image
              src={user.imageUrl}
              alt={user.fullName || "User"}
              className="object-cover w-full h-full"
            />
            <Avatar.Fallback className="flex items-center justify-center text-sm bg-gray-300">
              {user.firstName?.[0] || "U"}
            </Avatar.Fallback>
          </Avatar.Root>
        </Link>
      )}
      <Link href="/">Home</Link>

      <Link href="/posts">Timeline</Link>

      {user && <Link href={`/users/${user.id}`}>Profile</Link>}

      <Link href="/about">About</Link>
    </nav>
  );
}
