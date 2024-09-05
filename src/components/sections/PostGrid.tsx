"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { type Post } from "@/lib/types";
import { MoveRight } from "lucide-react";
import { truncateText } from "@/lib/utils";
import axios from "axios";
import { BACKEND_URL } from "@/components/constants/backend";

const PostGrid = (props: { posts: Post[] }) => {
  const [displayedPosts, setDisplayedPosts] = useState<number>(9);
  const [photos, setPhotos] = useState<any[]>([]);

  // Sort posts by 'created_at' to ensure latest posts are at the top
  const allPosts = [...props.posts].sort((a, b) => b.id - a.id);

  const last3Posts: Post[] = allPosts.slice(0, 3);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/photos`);
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const getRandomPhotoUrl = () => {
    const randomIndex = Math.floor(Math.random() * photos.length);
    return photos[randomIndex]?.url || "";
  };

  return (
    <section className="w-full lg:w-4/5 mx-auto px-4">
      <div className="my-8">
        <h2 className="text-4xl font-extrabold text-center my-12 mt-16 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 tracking-wide drop-shadow-md">
          Latest Posts
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-center">
          {last3Posts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col justify-between w-full md:w-80 p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={getRandomPhotoUrl()}
                alt="Post preview"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-semibold text-xl mb-2 text-center">
                  {truncateText(post.title, 4)}
                </h2>
                <p className="text-md text-gray-700 mb-4">
                  {truncateText(post.body, 10)}...
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-amber-500 font-bold flex items-center hover:underline"
                  >
                    Read More
                    <MoveRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px] w-4/5 bg-gray-300 my-16 mx-auto"></div>

      <div className="mx-auto">
        <h2 className="text-4xl font-extrabold text-center my-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 tracking-wide drop-shadow-md">
          All Posts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 mb-20">
          {allPosts.slice(0, displayedPosts).map((post, index) => (
            <div
              key={index}
              className="flex flex-col justify-between w-full p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={getRandomPhotoUrl()}
                alt="Post preview"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-semibold text-xl mb-2 text-center">
                  {truncateText(post.title, 4)}
                </h2>
                <p className="text-md text-gray-700 mb-4">
                  {truncateText(post.body, 10)}...
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-amber-500 font-bold flex items-center hover:underline"
                  >
                    Read More
                    <MoveRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-fit mx-auto mt-12 mb-44">
        <button
          onClick={() => {
            setDisplayedPosts(displayedPosts + 3);
          }}
          className="p-3 px-6 bg-amber-500 text-white rounded-full font-bold shadow-md hover:shadow-lg hover:bg-amber-600 transition-all duration-300"
        >
          Load More
        </button>
      </div>
    </section>
  );
};

export default PostGrid;
