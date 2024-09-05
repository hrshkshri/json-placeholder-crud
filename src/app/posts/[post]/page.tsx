import axios from "axios";
import Link from "next/link";
import { type Post, type User, type Comment } from "@/lib/types";
import { MoveLeft } from "lucide-react";
import CommentSection from "@/components/sections/CommentSection";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { TOKEN_NAME, JWT_SECRET } from "@/components/constants/cookie";
import { BACKEND_URL } from "@/components/constants/backend";

const PostPage = async ({ params }: { params: { post: string } }) => {
  let post: Post | null = null;
  let author: User | null = null;
  let comments: Comment[] = [];

  let user: User | null = null;

  const cookieStore = cookies();
  const access_token = cookieStore.has(TOKEN_NAME);
  const token = cookieStore.get(TOKEN_NAME);

  try {
    const { data } = await axios(`${BACKEND_URL}/posts/${params.post}`);
    post = data;
    const res = await axios(`${BACKEND_URL}/comments?postId=${params.post}`);
    comments = res.data;

    if (access_token && token) {
      const { value } = token;
      const payload = verify(value, JWT_SECRET);
      if (typeof payload === "string") return;

      const res_2 = await axios(`${BACKEND_URL}/users/${payload.id}`);
      user = res_2.data;
    }
  } catch (error) {
    console.error(error);
  }

  if (post) {
    try {
      const { data } = await axios(`${BACKEND_URL}/users/${post.userId}`);
      author = data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen mt-12">
      <section className="w-full lg:w-3/4 mx-auto px-4 py-12 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          {post?.title}
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
          {post?.body}
        </p>
        <div className="h-[1px] w-full bg-gray-300 my-6"></div>
      </section>

      <CommentSection comments={comments} user={user} postId={params.post} />

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

export default PostPage;
