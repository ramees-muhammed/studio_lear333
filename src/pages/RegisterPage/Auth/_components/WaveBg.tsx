const WaveBg = ({ img, width, height }: { img: string; width?: string; height?: string }) => {
    return (
        <img style={{ width: width, height: height }} className={`wave_bg`} src={`/RegisterPage/images/${img}`} alt="..." />
    )
}

export default WaveBg;