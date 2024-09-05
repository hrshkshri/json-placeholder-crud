import { type User } from "@/lib/types";
import { User as UserLogo } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserTable = (props: { users: User[] }) => {
  return (
    <section className="w-full lg:w-4/5 mx-auto mt-16 px-4">
      <h2 className="text-4xl font-extrabold text-center my-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 tracking-wide drop-shadow-md">
        Meet Our Authors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {props.users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col items-center bg-white p-6 shadow-lg rounded-xl border border-amber-400 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="h-16 w-16 rounded-full bg-amber-500 text-white grid place-content-center mb-4">
              <UserLogo size={40} strokeWidth={1.5} />
            </div>

            <p className="text-xl font-semibold text-center mb-2">
              {user.name}
            </p>
            <p className="text-gray-500 text-center mb-1">{user.email}</p>
            <p className="text-amber-500 text-center mb-4 hover:underline">
              <Link href={`https://${user.website}`} target="_blank">
                {user.website}
              </Link>
            </p>

            <Link
              className="w-full text-center p-2 px-4 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-600 transition-colors duration-300"
              href={`/users/${user.id}`}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserTable;
