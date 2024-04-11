// api.ts
import axios from 'axios';
import {Post} from './types';

const base_url = 'https://660e99fb356b87a55c4f8cb9.mockapi.io';

export const fetchPosts = async (
  page: number,
  pageSize: number,
): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>(
      `${base_url}/posts?page=${page}&limit=${pageSize}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const savePost = async (
  postId: string,
  isSaved: boolean,
): Promise<void> => {
  try {
    await axios.put(`${base_url}/posts/${postId}`, {isSaved});
  } catch (error) {
    throw error;
  }
};
