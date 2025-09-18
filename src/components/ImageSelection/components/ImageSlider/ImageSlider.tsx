// ImageSlider.tsx
import { useEffect, useRef, useState } from "react";
import "./ImageSlider.css";
import { aws_base_path } from "../ImageCard";
import type { ImagesType } from "../../../../hooks/ImageSelection/useImagesByFolderAndAlbum";

// const ImageSlider = ({ images, slideImg }: { images: { src: string }, slideImg: number }) => {
const ImageSlider = ({ images, slideImg, imageDetails, selectedEvent }: { images: ImagesType[] | undefined, slideImg: number; imageDetails: ImagesType[] | undefined; selectedEvent: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbnailRef = useRef<HTMLDivElement>(null);

    console.log("imageDetails: ", imageDetails)

    useEffect(() => {
        setCurrentIndex(slideImg)
    }, [slideImg])

    useEffect(() => {
        const container = thumbnailRef.current;
        const activeThumb = container?.children[currentIndex] as HTMLElement;
        if (activeThumb && container) {
            container.scrollTo({
                left: activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2,
                behavior: "smooth",
            });
        }
    }, [currentIndex]);

    if (!imageDetails) {
        return <p>please wait</p>
    }

    return (
        <div className="slider_container">
            <div className="relative" >
                <button className="close_btn" onClick={() => setCurrentIndex(currentIndex + 1)}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.3325 0.5H10.6675C4.2975 0.5 0.5 4.2975 0.5 10.6675V25.315C0.5 31.7025 4.2975 35.5 10.6675 35.5H25.315C31.685 35.5 35.4825 31.7025 35.4825 25.3325V10.6675C35.5 4.2975 31.7025 0.5 25.3325 0.5ZM23.88 22.025C24.3875 22.5325 24.3875 23.3725 23.88 23.88C23.6175 24.1425 23.285 24.265 22.9525 24.265C22.62 24.265 22.2875 24.1425 22.025 23.88L18 19.855L13.975 23.88C13.7125 24.1425 13.38 24.265 13.0475 24.265C12.715 24.265 12.3825 24.1425 12.12 23.88C11.6125 23.3725 11.6125 22.5325 12.12 22.025L16.145 18L12.12 13.975C11.6125 13.4675 11.6125 12.6275 12.12 12.12C12.6275 11.6125 13.4675 11.6125 13.975 12.12L18 16.145L22.025 12.12C22.5325 11.6125 23.3725 11.6125 23.88 12.12C24.3875 12.6275 24.3875 13.4675 23.88 13.975L19.855 18L23.88 22.025Z" fill="#DC6D80" />
                    </svg>
                </button>

                <button className="arrow left" onClick={() => setCurrentIndex(currentIndex - 1)}>
                    <div>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.82031 1.08V7.31V12.92C7.82031 13.88 6.66031 14.36 5.9803 13.68L0.800303 8.5C-0.0296974 7.67 -0.0296974 6.32 0.800303 5.49L2.7703 3.52L5.9803 0.309997C6.66031 -0.360003 7.82031 0.119997 7.82031 1.08Z" fill="#1E1E1E" fill-opacity="0.8" />
                        </svg>
                    </div>
                </button>
                <button className="arrow right" onClick={() => setCurrentIndex(currentIndex + 1)}>
                    <div>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.179688 1.08V7.31V12.92C0.179688 13.88 1.33969 14.36 2.0197 13.68L7.1997 8.5C8.0297 7.67 8.0297 6.32 7.1997 5.49L5.2297 3.52L2.0197 0.309997C1.33969 -0.360003 0.179688 0.119997 0.179688 1.08Z" fill="#1E1E1E" fill-opacity="0.8" />
                        </svg>
                    </div>
                </button>

                {/* <img src={images[currentIndex]} alt="Main" className="main-image" /> */}
                <img src={`${aws_base_path}/${imageDetails[currentIndex]?.project_id}/${selectedEvent}/${imageDetails[currentIndex]?.folder_id}/${images && images[currentIndex]?.image_id}.jpg`} alt="Main" className="main-image" />
            </div>
            <div className="thumbnails" ref={thumbnailRef} >
                {images?.map((src, index) => (
                    <img
                        key={index}
                        src={`${aws_base_path}/${imageDetails[currentIndex].project_id}/${selectedEvent}/${imageDetails[currentIndex].folder_id}/${src.image_id}.jpg`}
                        // src={`https://picsum.photos/id/${index + 10}/400/300`}
                        // src={src}
                        alt={`thumb-${index}`}
                        className={`thumbnail ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
