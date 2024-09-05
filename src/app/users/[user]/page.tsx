import Navbar from "@/components/Navbar";
import { type Post, type User } from "@/lib/types";
import axios from "axios";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { TOKEN_NAME, JWT_SECRET } from "@/components/constants/cookie";
import PageLoader from "@/components/loader/PageLoader";
import PostButtons from "./PostButtons";
import { BACKEND_URL } from "@/components/constants/backend";

const page = async ({ params }: { params: { user: string } }) => {
  let user: User | null = null;
  let posts: Post[] = [];
  let authorIsUser = false;

  const cookieStore = cookies();
  const access_token = cookieStore.has(TOKEN_NAME);
  const token = cookieStore.get(TOKEN_NAME);

  if (access_token && token) {
    const { value } = token;
    try {
      const payload = verify(value, JWT_SECRET);
      if (typeof payload === "string") return;
      if (payload.id == params.user) {
        authorIsUser = true;
      }
    } catch (e) {
      console.error(e);
    }
  }

  try {
    const { data } = await axios(`${BACKEND_URL}/users/${params.user}`);
    const res = await axios(`${BACKEND_URL}/posts?userId=${params.user}`);
    user = data;
    posts = res.data;
  } catch (error) {
    console.error(error);
  }

  if (user === null) {
    return <PageLoader />;
  }

  return (
    <main>
      <Navbar page={2} />
      <section className="w-full lg:w-4/5 mx-auto mt-12 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-lg shadow-lg border border-amber-300">
          <img
            width={180}
            className="mb-6 md:mb-0 rounded-full border border-amber-500"
            src="/user.png"
            alt="User Avatar"
          />
          <div className="text-center md:text-left md:ml-8">
            <h4 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 mb-2">
              {user?.name}
            </h4>
            <span className="text-lg text-gray-600">{user?.username}</span>

            <ul className="mt-4 space-y-2">
              <li>
                <b className="font-bold">Email:</b> {user?.email}
              </li>
              <li>
                <b className="font-bold">Phone:</b> {user?.phone}
              </li>
              <li>
                <b className="font-bold">Website:</b>{" "}
                <a
                  href={`https://${user?.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:underline"
                >
                  {user?.website}
                </a>
              </li>
              <li>
                <b className="font-bold">Company Name:</b> {user?.company.name}
              </li>
            </ul>
            <div className="mt-4">
              <b className="font-bold">Address:</b>{" "}
              {`${user?.address.suite}, ${user?.address.street}, ${user?.address.city}, ${user?.address.zipcode}`}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full lg:w-4/5 mx-auto mt-24 mb-36">
        <h2 className="text-4xl font-extrabold text-center my-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 tracking-wide drop-shadow-md">
          All Posts By {user?.name}
        </h2>
        <PostButtons posts={posts} authorIsUser={authorIsUser} />
      </section>
    </main>
  );
};

export default page;
