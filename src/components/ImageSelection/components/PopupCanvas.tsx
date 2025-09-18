const PopupCanvas = ({ children }: { children: any }) => {
    return (
        <div className="modal_overlay" >
            <div className="popup_canvas" >{children}</div>
        </div>
    )
}

export default PopupCanvas;