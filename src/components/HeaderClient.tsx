"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LogIn from "@/server/login";
import LogOut from "@/server/logout"; // Assuming you have a logout server function
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { type User } from "@/lib/types";

const HeaderClient = (props: { user: User | null }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const id = formdata.get("id");
    if (typeof id !== "string") {
      return;
    }
    await LogIn(parseInt(id));

    setLoading(false);
    router.refresh();
  };

  const handleLogout = async () => {
    setLoading(true);
    await LogOut();
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex justify-center items-center">
      {!props.user ? (
        <Dialog>
          <DialogTrigger className="p-3 px-6 rounded-full bg-white text-black font-bold border border-gray-300 shadow-sm hover:bg-gray-100 focus:outline-none">
            Log In
          </DialogTrigger>
          <DialogContent className="text-center sm:rounded-2xl w-full max-w-md mx-auto bg-white shadow-lg border border-gray-200 p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">
                Log In to <span className="text-amber-500">{`CRUD App`}</span>
              </DialogTitle>
              <DialogDescription>
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col mb-6">
                    <label
                      htmlFor="userId"
                      className="text-lg font-medium text-gray-800"
                    >
                      Enter Your User ID
                    </label>
                    <input
                      id="userId"
                      name="id"
                      type="number"
                      min={1}
                      max={10}
                      required
                      placeholder="Enter Between 1 and 10"
                      className="mt-2 p-3 rounded-full border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex items-center p-3 px-6 bg-amber-500 text-white rounded-full font-bold shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {loading ? "Logging In..." : "Log In"}
                      {loading && <Loader2 className="ml-2 animate-spin" />}
                    </button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            className="p-2 px-4 bg-white rounded-full text-black font-bold hover:text-amber-500"
            href={`/users/${props.user.id}`}
          >
            My Posts
          </Link>
          <Link
            className="p-2 px-4 bg-white rounded-full text-black font-bold hover:text-amber-500"
            href={"/create"}
          >
            Add Post
          </Link>
          <div className="h-10 w-10 rounded-full bg-white font-bold text-xl grid place-content-center text-amber-600">
            {props.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 px-4 bg-red-500 text-white rounded-full font-bold hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Logging out..." : "Log Out"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderClient;
