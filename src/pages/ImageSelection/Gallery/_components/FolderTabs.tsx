import { useState, useRef, useEffect } from 'react';


export type folderType = { folder_id: string; folder_name: string }
const Tabs = ({ folders, isLoading, OnChangeFolder }: { folders: folderType[] | undefined; isLoading: boolean; OnChangeFolder: (value: folderType) => void }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    // const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);


    const handleOnChangeFolder = (value: folderType) => {
        OnChangeFolder(value)
    }

    // Position the underline
    useEffect(() => {
        const currentTab = tabRefs.current[activeIndex];
        if (currentTab && scrollRef.current) {
            const { offsetLeft, offsetWidth } = currentTab;
            setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
            scrollIntoViewIfNeeded(currentTab);
        }
    }, [activeIndex]);

    // Check scroll boundaries
    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', checkScroll);
        checkScroll();
        return () => el.removeEventListener('scroll', checkScroll);
    }, []);

    const scroll = (dir: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const scrollAmount = 200;
        el.scrollBy({
            left: dir === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    const scrollIntoViewIfNeeded = (element: HTMLElement) => {
        const container = scrollRef.current;
        if (!container) return;

        const elementLeft = element.offsetLeft;
        const elementRight = elementLeft + element.offsetWidth;
        const containerLeft = container.scrollLeft;
        const containerRight = containerLeft + container.clientWidth;

        if (elementLeft < containerLeft) {
            container.scrollTo({ left: elementLeft - 20, behavior: 'smooth' });
        } else if (elementRight > containerRight) {
            container.scrollTo({ left: elementRight - container.clientWidth + 20, behavior: 'smooth' });
        }
    };

    // if (isLoading) {
    //     return <p>wait</p>
    // }

    return (
        <div className="tabs_wrapper_full">
            <button className={`arrow_btn_folder ${!canScrollLeft ? 'disabled' : ''}`} onClick={() => scroll('left')}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.00285 6.79635C2.94156 6.79635 2.88027 6.77377 2.83188 6.72538C2.73833 6.63183 2.73833 6.47699 2.83188 6.38344L4.93511 4.28022C5.08994 4.12538 5.08994 3.87377 4.93511 3.71893L2.83188 1.61571C2.73833 1.52216 2.73833 1.36732 2.83188 1.27377C2.92543 1.18023 3.08027 1.18023 3.17382 1.27377L5.27704 3.37699C5.44156 3.54151 5.53511 3.76409 5.53511 3.99957C5.53511 4.23506 5.44478 4.45764 5.27704 4.62215L3.17382 6.72538C3.12543 6.77054 3.06414 6.79635 3.00285 6.79635Z" fill="white" />
                </svg>
            </button>

            <div className="tabs_scroll" ref={scrollRef}>
                <div className="tabs_list">
                    {/* {tabItems.map((label, index) => ( */}
                    {folders?.map((label, index) => (
                        <button
                            key={index}
                            ref={(el) => {
                                tabRefs.current[index] = el;
                            }}
                            // ref={(el) => (tabRefs.current[index] = el)}
                            className={`tabs_btn ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => {
                                handleOnChangeFolder(label)
                                setActiveIndex(index)
                            }}
                        >
                            {label.folder_name}
                        </button>
                    ))}
                    <span
                        className="active_underline"
                        style={{
                            left: underlineStyle.left,
                            width: underlineStyle.width,
                        }}
                    />
                </div>
            </div>

            <button className={`arrow_btn_folder ${!canScrollRight ? 'disabled' : ''}`} onClick={() => scroll('right')}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.00285 6.79635C2.94156 6.79635 2.88027 6.77377 2.83188 6.72538C2.73833 6.63183 2.73833 6.47699 2.83188 6.38344L4.93511 4.28022C5.08994 4.12538 5.08994 3.87377 4.93511 3.71893L2.83188 1.61571C2.73833 1.52216 2.73833 1.36732 2.83188 1.27377C2.92543 1.18023 3.08027 1.18023 3.17382 1.27377L5.27704 3.37699C5.44156 3.54151 5.53511 3.76409 5.53511 3.99957C5.53511 4.23506 5.44478 4.45764 5.27704 4.62215L3.17382 6.72538C3.12543 6.77054 3.06414 6.79635 3.00285 6.79635Z" fill="white" />
                </svg>
            </button>
        </div>
    );
};

export default Tabs;