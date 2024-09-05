"use client";

import Link from "next/link";
import { MoveRight, Pencil, Trash2 } from "lucide-react";
import { DeletePost } from "@/server/post";
import { truncateText } from "@/lib/utils";
import { type Post } from "@/lib/types";
import { useState } from "react";

const PostButtons = (props: { posts: Post[]; authorIsUser: boolean }) => {
  const [allPosts, setAllPosts] = useState<Post[]>(props.posts);

  const handleDelete = async (id: string | number) => {
    await DeletePost(id);
    const updatedPosts = allPosts.filter((post) => post.id !== id);
    setAllPosts(updatedPosts);
    console.log("deleted", id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
      {allPosts.map((post, index) => (
        <div
          key={index}
          className="flex flex-col justify-between w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
        >
          <h2 className="font-semibold text-xl mb-4 text-center text-amber-500">
            {truncateText(post.title, 4)}
          </h2>
          <p className="text-md text-gray-700 mb-6">{truncateText(post.body, 10)}...</p>
          <div className="mt-auto flex justify-between items-center">
            <Link
              href={`/posts/${post.id}`}
              className="text-amber-500 font-bold flex items-center hover:underline"
            >
              Read
              <MoveRight className="ml-2" />
            </Link>
            {props.authorIsUser && (
              <div className="flex space-x-4">
                <Link
                  className="text-blue-500 font-bold flex items-center hover:underline"
                  href={`/edit/${post.id}`}
                >
                  <Pencil size={18} />
                  <span className="ml-1">Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 font-bold flex items-center hover:underline"
                >
                  <Trash2 size={18} />
                  <span className="ml-1">Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostButtons;
