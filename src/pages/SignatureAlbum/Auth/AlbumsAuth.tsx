import { useRef } from "react";
import "./AlbumsAuth.css"
import { useOtpVerification } from "../../../hooks/ImageSelection/usePinVerification";
import { useNavigate, useParams } from "react-router-dom";


const AlbumsAuth = () => {
    const pinRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return;

        e.target.value = value;

        if (value && index < 3) {
            pinRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            pinRefs.current[index - 1]?.focus();
        }
    };

    const params = useParams()
    const navigate = useNavigate()
    const { mutate } = useOtpVerification();

    const handleSubmit = () => {
        const otp = pinRefs.current.map(input => input?.value || "").join("");

        if (otp.length !== 4) {
            alert("Please enter the full 4-digit PIN");
            return;
        }
        mutate({
            album_id: params.album_id,
            otp: otp
        }, {
            onSuccess: (data) => {
                if (data.loginstatus === 'true') {
                    localStorage.setItem("album_id", params?.album_id || "")
                    navigate(`/albums/${params?.album_id}`)
                    console.log("fdklsj;", data)
                }
            }
        });
    };

    return (
        <div className="auth_page" >
            <div className="auth_title" >
                <h1>Lear Selection Suite <br /> <span>is ready for you</span> </h1>
            </div>

            <div className="auth_banner" >
                <img src="/ImageSelection/images/auth_banner.jpg" alt="" />

                <p className="auth_client_name" >{params?.project_name}</p>
            </div>
            <p className="auth_client_name_mobile" >Welcome message</p>

            <div className="auth_page_bottom" >

                <div className="auth_client_email" >
                    <p>Email: krishnakumar@gmail.com</p>
                </div>

                <div className="enter_pin_fields" >
                    <p>Enter PIN</p>
                    <div className="pin_input_group">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                ref={(el) => pinRefs.current[i] = el}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className="pin_input"
                            />
                        ))}
                    </div>
                    <button onClick={handleSubmit} >START SELECTION</button>
                </div>
            </div>
        </div>
    )
}

export default AlbumsAuth;