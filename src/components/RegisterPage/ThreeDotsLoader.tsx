const ThreeDotsLoader = () => {
    return (
        <div className="flex justify-center items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.2s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
        </div>
    );
};

export default ThreeDotsLoader