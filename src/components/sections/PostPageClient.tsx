"use client";

import { useEffect, useState } from "react";
import { type Post, type User, type Comment } from "@/lib/types";
import CommentSection from "@/components/sections/CommentSection";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const PostPageClient = ({
  post,
  author,
  comments,
  user,
  postId
}: {
  post: Post | null;
  author: User | null;
  comments: Comment[];
  user: User | null;
  postId: string;
}) => {
  const [localPost, setLocalPost] = useState<Post | null>(null);

  useEffect(() => {
    // Fallback to local storage if API call failed and post is not available
    if (!post) {
      const localPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      const foundPost = localPosts.find((p: Post) => p.id === parseInt(postId)) || null;
      setLocalPost(foundPost);
    }
  }, [post, postId]);

  const displayPost = post || localPost;

  return (
    <main className="min-h-screen mt-12">
      <section className="w-full lg:w-3/4 mx-auto px-4 py-12 bg-white shadow-lg rounded-lg border border-gray-200">
        {displayPost ? (
          <>
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
              {displayPost.title}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              By{" "}
              <Link
                className="text-amber-600 font-bold hover:underline"
                href={`/users/${author?.id}`}
              >
                {author?.name}
              </Link>
            </p>
            <img
              className="w-full h-60 object-cover rounded-lg mb-6"
              src="https://picsum.photos/800/500"
              alt="Post Image"
            />
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              {displayPost.body}
            </p>
            <div className="h-[1px] w-full bg-gray-300 my-6"></div>
          </>
        ) : (
          <p className="text-center text-gray-600">Post not found.</p>
        )}
      </section>

      {displayPost && (
        <CommentSection comments={comments} user={user} postId={postId} />
      )}

      <div className="w-fit mx-auto mt-8 mb-24">
        <Link
          className="flex items-center p-3 px-6 bg-amber-500 text-white rounded-full font-bold shadow-md hover:shadow-lg hover:bg-amber-600 transition-all duration-300"
          href={"/"}
        >
          <MoveLeft className="mr-2" />
          All Posts
        </Link>
      </div>
    </main>
  );
};

export default PostPageClient;
