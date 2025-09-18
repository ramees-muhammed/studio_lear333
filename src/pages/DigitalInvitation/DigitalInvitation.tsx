import { useNavigate } from "react-router-dom";
import CanvasWrapper, { CanvasBody, CanvasHead } from "../../components/CanvasWrapper";
import "./DigitalInvitation.css"
import { useCachedQuotations } from "../../hooks/useQuotationAPI";

export const generateQuotationNumber = (cachedQuotations: any) => {
    const shortName = "PHL"
    return `${shortName}-000${(cachedQuotations?.length || 0) + 1}`;
}

const DigitalInvitation = () => {
    return (
        <div className="digital_invitation" style={{ backgroundColor: "" }} >
            <CanvasWrapper>
                <CanvasHead>
                    <CreateInvitation />
                </CanvasHead>
                <CanvasBody>
                    <p className="invitations_title" >Recent invitations</p>
                    <div className="invitation_list" >
                        {
                            Array.from({ length: 20 }).map((_, i) => <div key={i} className="invitation" ></div>)
                        }
                    </div>
                </CanvasBody>
            </CanvasWrapper>
        </div>
    )
}

export default DigitalInvitation;


const CreateInvitation = () => {
    const navigate = useNavigate()
    const studio_id = localStorage.getItem("studio_id");
    const cachedQuotations = useCachedQuotations(studio_id);

    const handleCreateInvite = () => {
        const quotationNumber = generateQuotationNumber(cachedQuotations);
        navigate(`/digital-invitation/${quotationNumber}`);
    }

    return (
        <button onClick={handleCreateInvite} className="new_invitation_btn" >
            <span>Create New Invitation</span>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_239_5691)">
                    <mask id="mask0_239_5691" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                        <path d="M24.5 0H0.5V24H24.5V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_239_5691)">
                        <path d="M18.5 12.75H6.5C6.09 12.75 5.75 12.41 5.75 12C5.75 11.59 6.09 11.25 6.5 11.25H18.5C18.91 11.25 19.25 11.59 19.25 12C19.25 12.41 18.91 12.75 18.5 12.75Z" fill="white" />
                        <path d="M12.5 18.75C12.09 18.75 11.75 18.41 11.75 18V6C11.75 5.59 12.09 5.25 12.5 5.25C12.91 5.25 13.25 5.59 13.25 6V18C13.25 18.41 12.91 18.75 12.5 18.75Z" fill="white" />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_239_5691">
                        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                    </clipPath>
                </defs>
            </svg>
        </button >
    )
}