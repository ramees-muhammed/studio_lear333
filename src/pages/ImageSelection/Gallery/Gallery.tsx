import { useState } from "react";
import FolderTabs, { type folderType } from "./_components/FolderTabs";
import "./Gallery.css"
import Banner_bg from "../../../components/ImageSelection/components/Banner_bg";
import EventsFilter, { type EventType } from "../../../components/ImageSelection/components/EventsFilter/EventsFilter";
import PushStudioBtn from "../../../components/ImageSelection/components/PushStudioBtn";
import ImageSlider from "../../../components/ImageSelection/components/ImageSlider/ImageSlider";
import CanvasBody from "../../../components/ImageSelection/components/CanvasBody";
import ImageCard from "../../../components/ImageSelection/components/ImageCard";
import { useProjectDetails } from "../../../hooks/ImageSelection/useProjectDetails";
import { useImagesByFolderAndAlbum } from "../../../hooks/ImageSelection/useImagesByFolderAndAlbum";
import { useBatchImageUploader, type SelectedImage } from "../../../hooks/ImageSelection/useBatchImageUploader";

const Gallery = () => {
    const [isSlider, setIslider] = useState(0)
    const handleSlider = (value: number) => {
        setIslider(value)
    }

    const [selectedEvent, setSelectedEvent] = useState<EventType>({ event_id: "", event_name: "" });
    const [selectedFolder, setSelectedFolder] = useState<folderType>({ folder_id: "", folder_name: "" });

    const project_id = localStorage.getItem("project_id")

    const { data, isLoading, isError } = useProjectDetails(project_id, selectedEvent?.event_id);

    const album_id = localStorage.getItem("album_id")
    const { data: images, isLoading: imagesLoading, isError: imagesError } = useImagesByFolderAndAlbum(selectedFolder?.folder_id, album_id);
    console.log(imagesLoading, imagesError)


    const { mutation } = useBatchImageUploader();
    const handlePushImages = () => {
        const stored = localStorage.getItem("selected_images");
        const current: SelectedImage[] = stored ? JSON.parse(stored) : [];

        mutation.mutate(current, {
            onSuccess: (data) => console.log("helo", data),
            onError: (err) => console.log("error", err)
        });
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching project details</p>;

    return (
        <div className="gallery_page" >
            <Banner_bg>
                <p className="banner_title" >Pick the moments that stole your heart</p>
                <div className="sticky-filter">
                    <EventsFilter OnChangeEvent={setSelectedEvent} events={data?.data.events} />
                </div>
            </Banner_bg>

            <div style={{ position: "sticky", top: "15px" }} >
                <div style={{ margin: "25px 10px 25px 10px" }} >
                    <FolderTabs OnChangeFolder={setSelectedFolder} isLoading={isLoading || isError} folders={data?.data.folders} />
                </div>
                <div className="push_studio_Btn_wrapper">
                    <PushStudioBtn onClick={handlePushImages} />
                </div>
            </div>

            <div style={{ display: isSlider ? "block" : "none", marginTop: "25px" }} >
                <ImageSlider images={images} slideImg={isSlider} imageDetails={images} selectedEvent={selectedEvent?.event_id || ""} />
            </div>

            <div style={{ display: !isSlider ? "block" : "none" }} >
                <CanvasBody>
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {images?.map((imageDetails, index) => (
                            <ImageCard OnHandleSlider={handleSlider} selectedEvent={selectedEvent?.event_id || ""} key={index} value={index} imageDetails={imageDetails} alt={`Image ${index}`} />
                        ))}
                    </div>
                </CanvasBody>
            </div>

            {/* <PopupCanvas>
                <p className='modal_title' >100 images selected</p>
                <div>
                    <img src="/sendModalIcon.svg" alt="" />
                </div>
                <p className='modal_content' >Proceed with pushing images to the studio?</p>

                <div className='modal_buttons' >
                    <button>Discard</button>
                    <button>Proceed</button>
                </div>
            </PopupCanvas> */}
        </div>
    )
}

export default Gallery;