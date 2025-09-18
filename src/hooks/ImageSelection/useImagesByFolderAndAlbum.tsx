// hooks/useImagesByFolderAndAlbum.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const base_url = "http://localhost:3000/image/findByFolderAndAlbum"
// interface ImageItem {
//   _id: string;
//   image_url: string;
//   image_name?: string;
//   [key: string]: any;
// }

export const useImagesByFolderAndAlbum = (
  folderId: string | null,
  albumId: string | null
) => {
  // return useQuery<ImageItem[]>({
  return useQuery<ImagesType[]>({
    queryKey: ['imagesByFolderAndAlbum', folderId, albumId],
    queryFn: async () => {
      const { data } = await axios.post(
        `${base_url}/${folderId}/${albumId}`
      );
      return data;
    },
    enabled: !!folderId && !!albumId,
  });
};


export type ImagesType = {
  folder_id: string;
  project_id: string;
  relative_path: string;
  image_order: 1,
  image_id: string;
  selected: string[];
  favourite: string[];
  imageSelected: true,
  imageFavourite: true
}