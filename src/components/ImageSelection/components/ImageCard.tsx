import React from "react";
import { useLazyImage } from "../../../hooks/useLazyImage";
import type { ImagesType } from "../../../hooks/ImageSelection/useImagesByFolderAndAlbum";
import { useBatchImageUploader } from "../../../hooks/ImageSelection/useBatchImageUploader";

type Props = {
    imageDetails: ImagesType;
    alt?: string;
    OnHandleSlider: (val: number) => void;
    value: number;
    selectedEvent: string
};

export const aws_base_path = "https://compress-image-bucket-1234.s3.ap-south-1.amazonaws.com/studio"

const ImageCard: React.FC<Props> = ({ imageDetails, alt, OnHandleSlider, value, selectedEvent }) => {
    const { imgRef, sourceLoaded } = useLazyImage(imageDetails);
    console.log("imageDetails", imageDetails)

    const handleSlider = (val: number) => {
        OnHandleSlider(val)
    }

    const isFav = true;


    const { addImage } = useBatchImageUploader();



    const album_id = localStorage.getItem('album_id');

    const handleSelectImage = (imageId: string, isSelected: boolean) => {
        addImage({
            albumId: album_id || "",
            imageId,
            isSelected,
        });
    }

    const selected_images: any = localStorage.getItem("selected_images")
    console.log(JSON.parse(selected_images))

    // const [checkSelected, setCheckSelected] = useState(false)

    // useEffect(() => {
    //     setCheckSelected(selected_images?.includes(imageDetails?.image_id))
    // }, [imageDetails, selected_images, mutation])

    // const isSelected = (imageDetails?.imageSelected || selected_images?.includes(imageDetails?.image_id))
    // const isSelected = (selected_images?.includes(imageDetails?.image_id))
    // console.log("seleleee", checkSelected)

    return (
        <div className="w-full h-[120px] overflow-hidden rounded-lg shadow-md relative">
            {sourceLoaded ? (
                <div ref={imgRef} >
                    <img
                        onClick={() => handleSlider(value)}
                        src={`${aws_base_path}/${imageDetails.project_id}/${selectedEvent}/${imageDetails.folder_id}/${imageDetails.image_id}.jpg`}
                        // src={sourceLoaded}
                        alt={alt}
                        className="w-full h-full object-cover transition duration-300"
                    />
                </div>
            ) : (
                <div ref={imgRef} className="w-full h-full bg-gray-200 animate-pulse" />
            )}

            <div className="fav_btn" style={{ position: "absolute", top: "5px", right: "5px" }} >
                {isFav ? <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_343_2122)">
                        <mask id="mask0_343_2122" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="23">
                            <path d="M23.036 0.97998H0.962891V22.98H23.036V0.97998Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_343_2122)">
                            <path d="M16.0834 3.82129C14.4187 3.82129 12.9288 4.62796 11.9999 5.86546C11.0709 4.62796 9.58101 3.82129 7.91633 3.82129C5.09282 3.82129 2.80273 6.11296 2.80273 8.94546C2.80273 10.0363 2.97748 11.0446 3.28098 11.9796C4.73413 16.5629 9.21313 19.3038 11.4296 20.0554C11.7423 20.1654 12.2574 20.1654 12.5701 20.0554C14.7866 19.3038 19.2656 16.5629 20.7187 11.9796C21.0222 11.0446 21.197 10.0363 21.197 8.94546C21.197 6.11296 18.9069 3.82129 16.0834 3.82129Z" fill="#DC6D80" />
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0_343_2122">
                            <rect x="0.962891" y="0.97998" width="22.0731" height="22" rx="5" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                    :

                    <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_341_1630)">
                            <mask id="mask0_341_1630" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="23">
                                <path d="M23.036 0.97998H0.962891V22.98H23.036V0.97998Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_341_1630)">
                                <path d="M16.0834 3.82129C14.4187 3.82129 12.9288 4.62796 11.9999 5.86546C11.0709 4.62796 9.58101 3.82129 7.91633 3.82129C5.09282 3.82129 2.80273 6.11296 2.80273 8.94546C2.80273 10.0363 2.97748 11.0446 3.28098 11.9796C4.73413 16.5629 9.21313 19.3038 11.4296 20.0554C11.7423 20.1654 12.2574 20.1654 12.5701 20.0554C14.7866 19.3038 19.2656 16.5629 20.7187 11.9796C21.0222 11.0446 21.197 10.0363 21.197 8.94546C21.197 6.11296 18.9069 3.82129 16.0834 3.82129Z" fill="white" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_341_1630">
                                <rect x="0.962891" y="0.97998" width="22.0731" height="22" rx="5" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                }
            </div>

            <div onClick={() => handleSelectImage(imageDetails.image_id, !selected_images)} className="selection_btn cursor-pointer" style={{ position: "absolute", bottom: "5px", right: "5px" }} >
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10.5" cy="10.5" r="9.5" fill="#67CED8" stroke="white" stroke-width="2" />
                    {(selected_images?.includes(imageDetails?.image_id) || imageDetails.imageSelected) && <path d="M9.57746 14.1675C9.37746 14.1675 9.18746 14.0875 9.04746 13.9475L6.2175 11.1175C5.9275 10.8275 5.9275 10.3475 6.2175 10.0575C6.5075 9.76749 6.9875 9.76749 7.2775 10.0575L9.57746 12.3575L14.7175 7.2175C15.0075 6.9275 15.4875 6.9275 15.7775 7.2175C16.0675 7.5075 16.0675 7.9875 15.7775 8.2775L10.1075 13.9475C9.96746 14.0875 9.77746 14.1675 9.57746 14.1675Z" fill="white" />}
                </svg>
            </div>
        </div>
    );
};

export default ImageCard;
