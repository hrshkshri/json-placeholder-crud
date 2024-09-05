"use client";

import { Loader2 } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { UpdatePost } from "@/server/post";
import { type Post } from "@/lib/types";

const EditForm = (props: { post: Post | null }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!props.post) {
      return;
    }

    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const title = formdata.get("title");
    const content = formdata.get("content");

    if (typeof title !== "string" || typeof content !== "string") {
      setLoading(false);
      return;
    }

    await UpdatePost(
      {
        title,
        body: content,
      },
      props.post.id
    );

    const editedPost = {id: 102, title, body: content};
    localStorage.setItem("editedPost", JSON.stringify(editedPost));

    setLoading(false);
    router.push("/posts/" + 102);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="w-full flex flex-col gap-4">
        <label htmlFor="title" className="text-lg font-semibold text-gray-700">
          Post Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={props.post?.title || ""}
          placeholder="Enter updated post title"
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
          defaultValue={props.post?.body || ""}
          placeholder="Enter updated post content"
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
            Updating...
            <Loader2 className="ml-2 animate-spin" />
          </>
        ) : (
          "Update Post"
        )}
      </button>
    </form>
  );
};

export default EditForm;
