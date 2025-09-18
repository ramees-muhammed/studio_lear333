import './components.scss'
import ThreeDotsLoader from './ThreeDotsLoader';

const PrimaryBtn = ({ title, onClick, isLoading, type }: { title: string; onClick?: () => void; isLoading?: boolean; type?: "button" | "reset" | "submit" | undefined }) => {
    return (
        <button type={type} className="primary_btn" onClick={onClick} >{isLoading ? <ThreeDotsLoader /> : title}</button>
        // <button className="primary_btn" onClick={onClick} >{title}</button>
    )
}
export default PrimaryBtn;