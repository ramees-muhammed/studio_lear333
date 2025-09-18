import { useNavigate } from "react-router-dom";
import DateInBg from "./_components/DateInBg";
import WaveBg from "./_components/WaveBg";
import OTPField from "../../../components/RegisterPage/OTPField";
import InputField from "../../../components/RegisterPage/InputField";
import PrimaryBtn from "../../../components/RegisterPage/PrimaryBtn";


const ForgotPass = () => {
    const navigate = useNavigate()
    const isOTP = false

    return (

        <div className="login_page" >
            <DateInBg />
            <WaveBg img="forget_pass_wave.png" />

            <div className="login_fields_wrapper" >
                <div className="login_img" ><img src="/RegisterPage/images/forget_pass_img.png" alt="" /></div>
                <div className="login_fields" >
                    <div className="forgot_pass" >
                        <h1 className="title" >Learn in</h1>
                        {!isOTP && <p className="desc" >Enter your log in credentials</p>}
                        {isOTP && <p>Verify mobile</p>}
                        {isOTP && <p>We’ve sent a 4-digit code to +91 974 714 7668</p>}

                        <div className="grid mt-[35px] mb-[50px]" >
                            <div className="grid gap-[25px]" >
                                {isOTP ? <OTPField /> : <InputField label='Email' placeholder='sample@admin.com' />}
                            </div>
                        </div>
                        {!isOTP && <PrimaryBtn title='Reset' onClick={() => navigate("/verify-account")} />}
                        {/* {!isOTP && <PrimaryBtn title='Reset' onClick={() => navigate("/forgot-pass")} />} */}
                        {!isOTP && <div className="mt-[35px]" >
                            <p className="text-center text-[18px] font-normal text-[var(--light-black)" >Remember password? <a className="no-underline text-[var(--black)]" href="/login">Log in</a></p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ForgotPass;