import { useEffect, useRef, useState } from "react";
import { cacheImage } from "../utils/imageCache";
import type { ImagesType } from "./ImageSelection/useImagesByFolderAndAlbum";

export const useLazyImage = (src: ImagesType) => {
    const [sourceLoaded, setSourceLoaded] = useState<string | null>(null);
    const imgRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = imgRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            async (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const base64 = await cacheImage(src.image_id);
                        setSourceLoaded(base64);
                        observer.disconnect();
                    }
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [src]);

    return { imgRef, sourceLoaded };
};


// import { useEffect, useRef, useState } from "react";

// export const useLazyImage = (src: string) => {
//     const [sourceLoaded, setSourceLoaded] = useState<string | null>(null);
//     const imgRef = useRef<HTMLImageElement | null>(null);

//     useEffect(() => {
//         const imgEl = imgRef.current;
//         if (!imgEl) return;

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         const image = new Image();
//                         image.src = src;
//                         image.onload = () => {
//                             setSourceLoaded(src);
//                         };
//                         observer.disconnect();
//                     }
//                 });
//             },
//             { threshold: 0.1 }
//         );

//         observer.observe(imgEl);

//         return () => observer.disconnect();
//     }, [src]);

//     return { imgRef, sourceLoaded };
// };
