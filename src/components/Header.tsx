import HeaderClient from "./HeaderClient";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { TOKEN_NAME, JWT_SECRET } from "@/components/constants/cookie";
import { type User } from "@/lib/types";
import axios from "axios";
import { BACKEND_URL } from "./constants/backend";
import { LayoutDashboard } from "lucide-react";

const MainNavigation = async () => {
  let user: User | null = null;
  const cookieStore = cookies();
  const access_token = cookieStore.has(TOKEN_NAME);
  const token = cookieStore.get(TOKEN_NAME);

  if (access_token && token) {
    const { value } = token;
    try {
      const payload = verify(value, JWT_SECRET);
      // Get the name of the user
      if (typeof payload === "string") return;

      const { data } = await axios(`${BACKEND_URL}/users/${payload.id}`);
      user = data;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <header className="bg-gradient-to-r from-amber-500 to-orange-400 w-full fixed top-0 z-50 shadow-md">
      <div className="h-16 flex justify-between items-center w-11/12 lg:w-4/5 mx-auto">
        {/* Brand/Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <LayoutDashboard className="h-8 w-8 text-amber-600" /> {/* Icon */}
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-wide">
            CRUD App
          </h1>
        </div>

        {/* User Info/Navigation */}
        <HeaderClient user={user} />
      </div>
    </header>
  );
};

export default MainNavigation;
