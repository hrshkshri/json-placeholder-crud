"use server";

import axios from "axios";
import { BACKEND_URL } from "@/components/constants/backend";

const CreatePost = async (post: { title: string; body: string }) => {
  try {
    console.log("Attempting to create post:", post);
    const res = await axios.post(`${BACKEND_URL}/posts`, post);
    console.log("Response from server:", res.data);
    return res.data;
  } catch (error: any) {
    // Type assertion to 'any'
    console.error(
      "Error creating post:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create post");
  }
};

export const UpdatePost = async (
  post: { title: string; body: string },
  id: string | number
) => {
  try {
    console.log("Attempting to update post:", post);
    const res = await axios.patch(`${BACKEND_URL}/posts/${id}`, post);
    console.log("Response from server:", res.data);
    return res.data;
  } catch (error: any) {
    // Type assertion to 'any'
    console.error(
      "Error updating post:",
      error.response?.data || error.message
    );
    throw new Error("Failed to update post");
  }
};

export const DeletePost = async (id: string | number) => {
  try {
    console.log(`Attempting to delete post with id: ${id}`);
    const res = await axios.delete(`${BACKEND_URL}/posts/${id}`);
    console.log("Response from server:", res.data);
    return res.data;
  } catch (error: any) {
    // Type assertion to 'any'
    console.error(
      "Error deleting post:",
      error.response?.data || error.message
    );
    throw new Error("Failed to delete post");
  }
};

export default CreatePost;
