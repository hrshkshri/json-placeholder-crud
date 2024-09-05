import Navbar from "@/components/Navbar";
import EditForm from "./EditForm";
import { type Post } from "@/lib/types";
import axios from "axios";
import { BACKEND_URL } from "@/components/constants/backend";

const Edit = async ({ params }: { params: { post: string } }) => {
  let post: Post | null = null;

  try {
    const { data } = await axios(`${BACKEND_URL}/posts/${params.post}`);
    post = data;
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen">
      <Navbar page={0} />

      <section className="w-full lg:w-3/4 mx-auto px-8 lg:px-20 py-12">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-12">
          Update Post
        </h2>
        <EditForm post={post} />
      </section>
    </main>
  );
};

export default Edit;
