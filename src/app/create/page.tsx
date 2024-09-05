"use client";

import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import CreatePost from "@/server/post";
import { Post } from "@/lib/types";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const title = formdata.get("title");
    const content = formdata.get("content");

    if (typeof title !== "string" || typeof content !== "string") {
      setLoading(false);
      return;
    }

    const res = await CreatePost({
      title,
      body: content,
    });

    const newPost = { id: res.id, title, body: content };
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");

    // Check if post already exists
    const existingPostIndex = posts.findIndex(
      (post: Post) => post.id === res.id
    );

    if (existingPostIndex > -1) {
      // Update existing post
      posts[existingPostIndex] = newPost;
    } else {
      // Add new post
      posts.push(newPost);
    }

    // Save the new post locally because json placeholder doesn't persist data <<-- check console.log to see the new post -->>

    localStorage.setItem("posts", JSON.stringify(posts));

    setLoading(false);
    router.push("/posts/" + res.id);
  };

  return (
    <main className="min-h-screen">
      <Navbar page={0} />

      <section className="w-full lg:w-3/4 mx-auto px-8 lg:px-20 py-12">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-12">
          Create Post
        </h2>

        <form onSubmit={handleSubmit} className="mx-auto w-full space-y-12">
          <div className="w-full flex flex-col gap-4">
            <label
              htmlFor="title"
              className="text-lg font-semibold text-gray-700"
            >
              Post Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Post Title"
              required={true}
              className="p-3 rounded-lg text-black border border-gray-300 focus:ring-2 focus:ring-amber-500 transition-all w-full"
            />
          </div>

          <div className="w-full flex flex-col gap-4">
            <label
              htmlFor="content"
              className="text-lg font-semibold text-gray-700"
            >
              Post Content
            </label>
            <textarea
              name="content"
              id="content"
              placeholder="Enter Post Content"
              className="p-3 rounded-lg text-black border border-gray-300 focus:ring-2 focus:ring-amber-500 transition-all w-full"
              rows={8}
              required={true}
            ></textarea>
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`flex items-center justify-center p-3 rounded-full text-white font-bold transition-all ${
              loading
                ? "bg-amber-300 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600"
            } w-full lg:w-1/4 mx-auto`}
          >
            {loading ? (
              <>
                Creating...
                <Loader2 className="ml-2 animate-spin" />
              </>
            ) : (
              "+ Create Post"
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Create;
