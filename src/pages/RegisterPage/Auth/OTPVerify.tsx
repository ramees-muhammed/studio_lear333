import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import DateInBg from "./_components/DateInBg";
import WaveBg from "./_components/WaveBg";
import PrimaryBtn from "../../../components/RegisterPage/PrimaryBtn";

const OTPVerify = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [studioId, setStudioId] = useState(""); // Optional: fetch from localStorage or props;

    useEffect(() => {
        const id = localStorage.getItem("studio_id");
        if (id) setStudioId(id);
    }, []);


    // Handle OTP input change
    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLElement;
            nextInput?.focus();
        }
    };

    // Submit OTP to backend
    const handleVerify = async () => {
        const code = otp.join("");

        if (code.length !== 4 || !studioId) {
            alert("Enter a valid 4-digit OTP and studio ID.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/studio/verifyOtp", {
                studio_id: studioId,
                otp: code,
            });

            console.log("Verification success:", response.data);
            navigate("/registered-successfully");
        } catch (err: any) {
            console.error("Verification failed:", err.response?.data || err.message);
            alert("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="login_page">
            <DateInBg />
            <WaveBg img="otp_wave.png" width="100%" height="500px" />

            <div className="login_fields_wrapper">
                <div className="login_img">
                    <img src="/RegisterPage/images/otp_img.png" alt="OTP Illustration" />
                </div>

                <div className="login_fields">
                    <div className="forgot_pass">
                        <h1 className="title">Learn in</h1>
                        <p>Verify mobile</p>
                        <p>We’ve sent a 4-digit code to +91 974 714 7668</p>

                        <div className="flex gap-[50px] mt-[35px] mb-[25px]">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="otp_field"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    data-index={index}
                                    inputMode="numeric"
                                    autoComplete="off"
                                />
                            ))}
                        </div>

                        <PrimaryBtn title="Verify" onClick={handleVerify} />

                        <div className="mt-[15px]">
                            <p className="text-end text-[18px] font-normal text-[var(--light-black)]">
                                Resend OTP in <span>00:20</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerify;



// import { useNavigate } from "react-router-dom";
// import PrimaryBtn from "../../components/PrimaryBtn";
// import DateInBg from "./_components/DateInBg";
// import WaveBg from "./_components/WaveBg";

// const OTPVerify = () => {
//     const navigate = useNavigate()
//     return (

//         <div className="login_page" >
//             <DateInBg />
//             <WaveBg img="otp_wave.png" width="100%" height="500px" />

//             <div className="login_fields_wrapper" >
//                 <div className="login_img" ><img src="/images/otp_img.png" alt="" /></div>
//                 <div className="login_fields" >
//                     <div className="forgot_pass" >
//                         <h1 className="title" >Learn in</h1>
//                         <p>Verify mobile</p>
//                         <p>We’ve sent a 4-digit code to +91 974 714 7668</p>

//                         <div className="grid mt-[35px]" >
//                             <div className="grid gap-[25px]" >
//                                 {/* <OTPField /> */}
//                                 <div style={{ width: "fit-content" }} >
//                                     <div className="flex gap-[50px] mb-[50px]" >
//                                         <input type="number" className="otp_field" maxLength={1} data-index="0" inputMode="numeric" pattern="[0-9]*" autoComplete="off"></input>
//                                         <input type="number" className="otp_field" maxLength={1} data-index="0" inputMode="numeric" pattern="[0-9]*" autoComplete="off"></input>
//                                         <input type="number" className="otp_field" maxLength={1} data-index="0" inputMode="numeric" pattern="[0-9]*" autoComplete="off"></input>
//                                         <input type="number" className="otp_field" maxLength={1} data-index="0" inputMode="numeric" pattern="[0-9]*" autoComplete="off"></input>

//                                     </div>
//                                     <PrimaryBtn title='Verify' onClick={() => navigate("/registered-successfully")} />
//                                     <div className="mt-[15px]" >
//                                         <p className="text-end text-[18px] font-normal text-[var(--light-black)" >Resend OTP in <span>00:20</span></p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* <PrimaryBtn title='Verify' /> */}
//                         <div className="" >
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default OTPVerify;