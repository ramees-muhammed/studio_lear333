import { useRef, useState, useEffect } from "react";
import "./EventsFilter.css";

export type EventType = { event_id: string; event_name: string }

const EventsFilter = ({ events, OnChangeEvent }: { events: EventType[] | undefined; OnChangeEvent: (value: EventType) => void; }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<EventType | undefined>(events && events[0]);

    // const [selected, setSelected] = useState<EventType | undefined>(events[0]?.event_name);
    // useEffect(() => {
    //     setSelected(events[0]?.event_name)
    // }, [])

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);


    const handleOnChangeEvent = (value: EventType) => {
        // console.log("value: ", value)
        OnChangeEvent(value)
    }

    const handleScrollCheck = () => {
        const container = scrollRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
            container.scrollLeft + container.clientWidth < container.scrollWidth
        );
    };

    useEffect(() => {
        handleScrollCheck(); // on mount
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", handleScrollCheck);
            return () => container.removeEventListener("scroll", handleScrollCheck);
        }
    }, []);

    const scroll = (dir: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = 200;
        container.scrollBy({
            left: dir === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="event_filter_wrapper" >
            <div className="events_filter">
                <div
                    className={`arrow_btn ${!canScrollLeft ? "disabled" : ""}`}
                    onClick={() => canScrollLeft && scroll("left")}
                >
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.09163 15.8305C7.26325 15.8305 7.43486 15.7673 7.57034 15.6318C7.83228 15.3699 7.83228 14.9364 7.57034 14.6744L1.68131 8.78539C1.24776 8.35184 1.24776 7.64732 1.68131 7.21377L7.57034 1.32477C7.83228 1.06283 7.83228 0.629286 7.57034 0.36735C7.30841 0.105415 6.87486 0.105415 6.61293 0.36735L0.723894 6.25636C0.26325 6.717 0.00131226 7.34023 0.00131226 7.99958C0.00131226 8.65894 0.254222 9.28216 0.723894 9.74281L6.61293 15.6318C6.74841 15.7583 6.92002 15.8305 7.09163 15.8305Z" fill="white" />
                    </svg>
                </div>

                <div className="list_events_scroll" ref={scrollRef}>
                    <div className="list_events">
                        {/* {stepsList.map((item, i) => ( */}
                        {events?.map((item, i) => (
                            <button
                                key={i}
                                className={selected?.event_name === item.event_name ? "active" : ""}
                                onClick={() => {
                                    handleOnChangeEvent(item)
                                    setSelected(item)
                                }}
                            >
                                {item.event_name}
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    className={`arrow_btn ${!canScrollRight ? "disabled" : ""}`}
                    onClick={() => canScrollRight && scroll("right")}
                >
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.20836 15.8305C1.03675 15.8305 0.865139 15.7673 0.729655 15.6318C0.467719 15.3699 0.467719 14.9364 0.729655 14.6744L6.61869 8.78539C7.05224 8.35184 7.05224 7.64732 6.61869 7.21377L0.729655 1.32477C0.467719 1.06283 0.467719 0.629286 0.729655 0.36735C0.99159 0.105415 1.42514 0.105415 1.68707 0.36735L7.57611 6.25636C8.03675 6.717 8.29869 7.34023 8.29869 7.99958C8.29869 8.65894 8.04578 9.28216 7.57611 9.74281L1.68707 15.6318C1.55159 15.7583 1.37998 15.8305 1.20836 15.8305Z" fill="white" />
                    </svg>
                </div>
            </div>

            <div className="gallery_btn" >
                <div>
                    <img src="/ImageSelection/gallery_icon.svg" alt="..." />
                </div>

            </div>
            <div className="gallery_img_count" >1000</div>
        </div>
    );
};

export default EventsFilter;



// <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M7.09163 15.8305C7.26325 15.8305 7.43486 15.7673 7.57034 15.6318C7.83228 15.3699 7.83228 14.9364 7.57034 14.6744L1.68131 8.78539C1.24776 8.35184 1.24776 7.64732 1.68131 7.21377L7.57034 1.32477C7.83228 1.06283 7.83228 0.629286 7.57034 0.36735C7.30841 0.105415 6.87486 0.105415 6.61293 0.36735L0.723894 6.25636C0.26325 6.717 0.00131226 7.34023 0.00131226 7.99958C0.00131226 8.65894 0.254222 9.28216 0.723894 9.74281L6.61293 15.6318C6.74841 15.7583 6.92002 15.8305 7.09163 15.8305Z" fill="white" />
//             </svg>


// <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M1.20836 15.8305C1.03675 15.8305 0.865139 15.7673 0.729655 15.6318C0.467719 15.3699 0.467719 14.9364 0.729655 14.6744L6.61869 8.78539C7.05224 8.35184 7.05224 7.64732 6.61869 7.21377L0.729655 1.32477C0.467719 1.06283 0.467719 0.629286 0.729655 0.36735C0.99159 0.105415 1.42514 0.105415 1.68707 0.36735L7.57611 6.25636C8.03675 6.717 8.29869 7.34023 8.29869 7.99958C8.29869 8.65894 8.04578 9.28216 7.57611 9.74281L1.68707 15.6318C1.55159 15.7583 1.37998 15.8305 1.20836 15.8305Z" fill="white" />
//             </svg>
// import "./EventsFilter.css";

// const stepsList = ["Engagement", "Save the date", "Wedding eve", "Wedding"];

// const EventsFilter = () => {


//     return (
// <div className="event_filter_wrapper">
//             <div className="events_filter" >

//                 <div className="list_events" >
//                     {
//                         stepsList.map((item, i) => <button className={item === "Engagement" ? "active" : ""} key={i} >{item}</button>)
//                     }
//                 </div>

//                 <div className="arraw_btn">
// <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M1.20836 15.8305C1.03675 15.8305 0.865139 15.7673 0.729655 15.6318C0.467719 15.3699 0.467719 14.9364 0.729655 14.6744L6.61869 8.78539C7.05224 8.35184 7.05224 7.64732 6.61869 7.21377L0.729655 1.32477C0.467719 1.06283 0.467719 0.629286 0.729655 0.36735C0.99159 0.105415 1.42514 0.105415 1.68707 0.36735L7.57611 6.25636C8.03675 6.717 8.29869 7.34023 8.29869 7.99958C8.29869 8.65894 8.04578 9.28216 7.57611 9.74281L1.68707 15.6318C1.55159 15.7583 1.37998 15.8305 1.20836 15.8305Z" fill="white" />
// </svg>
//                 </div>
//             </div>

// <div className="gallery_btn" >
//     <div>
//         <img src="/gallery_icon.svg" alt="..." />
//     </div>


// </div>
// <div className="gallery_img_count" >1000</div>
//         </div>
//     );
// };

// export default EventsFilter;