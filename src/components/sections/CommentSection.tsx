"use client";

import { type Comment, type User } from "@/lib/types";
import AddComment from "@/server/add-comment";
import { Loader2, Lock, User as UserLogo } from "lucide-react";
import { FormEvent, useState } from "react";

const CommentSection = (props: {
  comments: Comment[];
  user: User | null;
  postId: string;
}) => {
  const [loading, setLoading] = useState(false);

  let all_comments = props.comments;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const comment = formdata.get("comment");
    if (typeof comment !== "string" || !props.user) {
      return;
    }

    const new_comment = await AddComment({
      postId: parseInt(props.postId),
      name: props.user?.name,
      email: props.user?.email,
      body: comment,
    });

    console.log(new_comment);

    all_comments.push(new_comment);
    all_comments.reverse();

    setLoading(false);
  };

  return (
    <section className="w-full lg:w-3/4 mx-auto mt-12">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Comments</h3>

      <div className="mb-8">
        {props.user ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4"
          >
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Enter your comment..."
              required={true}
              className="p-3 px-5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-3/4"
            />
            <button
              disabled={loading}
              type="submit"
              className="flex items-center justify-center p-3 px-6 bg-amber-500 text-white rounded-lg font-bold shadow-md hover:shadow-lg hover:bg-amber-600 transition-all duration-300 w-full md:w-1/4"
            >
              {loading ? "Adding..." : "Add Comment"}
              {loading && <Loader2 className="ml-2 animate-spin" />}
            </button>
          </form>
        ) : (
          <p className="text-amber-600 text-xl font-bold flex items-center">
            Log In to Add Comments
            <Lock className="ml-2" />
          </p>
        )}
      </div>

      {all_comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white shadow-md rounded-lg p-4 mb-6"
        >
          <div className="flex flex-row gap-4 items-start">
            <div className="h-12 w-12 rounded-full bg-amber-300 flex items-center justify-center">
              <UserLogo size={36} strokeWidth={1.5} className="text-gray-800" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{comment.name}</p>
              <p className="text-sm text-gray-600">{comment.email}</p>
              <p className="mt-2 text-gray-700">{comment.body}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CommentSection;
