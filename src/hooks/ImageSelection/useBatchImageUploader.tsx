// hooks/useBatchImageUploader.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface SelectedImage {
    albumId: string;
    imageId: string;
    isSelected: boolean;
}

const LOCAL_STORAGE_KEY = "selected_images";

export const useBatchImageUploader = () => {
    const mutation = useMutation({
        mutationFn: (images: SelectedImage[]) =>
            axios.post("http://localhost:3000/image/updateSelectedImages/", images),
        onSuccess: () => {
            console.log("Batch uploaded successfully");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        },
        onError: (error) => {
            console.error("Batch upload failed", error);
        },
    });

    const addImage = (image: SelectedImage) => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        let current: SelectedImage[] = stored ? JSON.parse(stored) : [];

        // Check if the image already exists
        const exists = current.some(
            (item) => item.albumId === image.albumId && item.imageId === image.imageId
        );

        if (exists) {
            // Remove it if it exists
            current = current.filter(
                (item) => !(item.albumId === image.albumId && item.imageId === image.imageId)
            );
        } else {
            // Add it if it doesn't exist
            current = [...current, image];
        }

        // Update localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));

        // if (current.length === 10) {
        if (current.length >= 10) {
            mutation.mutate(current);
        }
    };


    // const addImage = (image: SelectedImage) => {
    //     const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    //     const current: SelectedImage[] = stored ? JSON.parse(stored) : [];

    //     const updated = [...current, image];
    //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    //     if (updated.length === 10) {
    //         mutation.mutate(updated);
    //     }
    // };

    return { addImage, mutation };
};
