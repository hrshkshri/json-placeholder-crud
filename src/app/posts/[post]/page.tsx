import axios from "axios";
import { type Post, type User, type Comment } from "@/lib/types";
import CommentSection from "@/components/sections/CommentSection";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { TOKEN_NAME, JWT_SECRET } from "@/components/constants/cookie";
import { BACKEND_URL } from "@/components/constants/backend";
import PostPageClient from "@/components/sections/PostPageClient";

const PostPageServer = async ({ params }: { params: { post: string } }) => {
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
    // Handle API errors here
  }

  if (post) {
    try {
      const { data } = await axios(`${BACKEND_URL}/users/${post.userId}`);
      author = data;
    } catch (error) {
      console.error(error);
    }
  }

  // Determine if we should pass editing = true based on post ID
  const isEditing = params.post === "102";

  return (
    <PostPageClient
      post={post}
      author={author}
      comments={comments}
      user={user}
      postId={params.post}
      editing={isEditing} // Pass editing prop conditionally
    />
  );
};

export default PostPageServer;
