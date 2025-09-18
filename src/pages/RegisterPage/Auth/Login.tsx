// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import InputField from "../../components/InputField";
// import PrimaryBtn from "../../components/PrimaryBtn";

// const Credentials = () => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         businessEmail: "",
//         password: ""
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleLogin = async () => {
//         if (!formData.businessEmail || !formData.password) {
//             alert("Please enter both email and password.");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:3000/studio/validateLogin", formData);

//             if (response.data.loginProcess && response.data.status === "Success") {
//                 localStorage.setItem("studio_id", response.data.studio_id);
//                 localStorage.setItem("jwtToken", response.data.jwtToken);
//                 navigate("/");
//             } else {
//                 alert("Invalid credentials.");
//             }
//         } catch (err: any) {
//             console.error("Login error:", err);
//             alert("Login failed. Please try again.");
//         }
//     };

//     return (
//         <div className="credentials">
//             <h1 className="title">Learn in</h1>
//             <p className="desc">Enter your log in credentials</p>

//             <div className="grid mt-[35px]">
//                 <div className="grid gap-[25px]">
//                     <InputField
//                         label="Email"
//                         placeholder="sample@admin.com"
//                         name="businessEmail"
//                         value={formData.businessEmail}
//                         onChange={handleChange}
//                     />
//                     <InputField
//                         label="password"
//                         placeholder="Enter your password here"
//                         name="password"
//                         type="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <a
//                     style={{ textAlign: "end", textDecoration: "none", color: "var(--light-black)" }}
//                     className="mt-[15px] mb-[50px]"
//                     href="/forgot-pass"
//                 >
//                     Forgot password?
//                 </a>
//             </div>

//             <PrimaryBtn title="Lear in" onClick={handleLogin} />

//             <div className="mt-[35px]">
//                 <p className="text-center text-[18px] font-normal text-[var(--light-black)]">
//                     Don’t have an account?{" "}
//                     <a className="no-underline text-[var(--black)]" href="/register">
//                         Sign up
//                     </a>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Credentials;



import { useNavigate } from "react-router-dom";
import DateInBg from "./_components/DateInBg";
import WaveBg from "./_components/WaveBg";
import "./auth.scss"
import { useState } from "react";
import axios from "axios";
import InputField from "../../../components/RegisterPage/InputField";
import PrimaryBtn from "../../../components/RegisterPage/PrimaryBtn";

const Login = () => {

    return (
        <div className="login_page" >
            <DateInBg />
            <WaveBg img="sign_in_wave.png" />

            <div className="login_fields_wrapper" >
                <div className="login_img" ><img src="/RegisterPage/images/sign_in_img.png" alt="" /></div>
                <div className="login_fields" >
                    <Credentials />
                </div>
            </div>
        </div>
    )
}

export default Login;


const Credentials = () => {
    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        businessEmail: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        if (!formData.businessEmail || !formData.password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/studio/validateLogin", formData);

            if (response.data.loginProcess && response.data.status === "Success") {
                localStorage.setItem("studio_id", response.data.studio_id);
                localStorage.setItem("jwtToken", response.data.jwtToken);
                navigate("/");
            } else {
                alert("Invalid credentials.");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            alert("Login failed. Please try again.");
        }
    };
    return (
        <div className="credentials" >
            <h1 className="title" >Lear in</h1>
            <p className="desc" >Enter your log in credentials</p>

            <div className="grid mt-[35px]" >
                <div className="grid gap-[25px]" >
                    <InputField
                        label="Email"
                        placeholder="sample@admin.com"
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleChange}
                    />
                    <InputField
                        label="password"
                        placeholder="Enter your password here"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <a style={{ textAlign: "end", textDecoration: "none", color: "var(--light-black)" }} className="mt-[15px] mb-[50px]" href="/forgot-pass" >Forgot password?</a>
            </div>
            <PrimaryBtn title='Lear in' onClick={handleLogin} />
            <div className="mt-[35px]" >
                <p className="text-center text-[18px] font-normal text-[var(--light-black)" >Don’t have an account? <a className="no-underline text-[var(--black)]" href="/register">Sign up</a></p>
            </div>
        </div>
    )
}


// import { useNavigate } from "react-router-dom";
// import InputField from "../../components/InputField";
// import PrimaryBtn from "../../components/PrimaryBtn";
// import DateInBg from "./_components/DateInBg";
// import WaveBg from "./_components/WaveBg";
// import "./auth.scss"

// const Login = () => {

//     return (
//         <div className="login_page" >
//             <DateInBg />
//             <WaveBg img="sign_in_wave.png" />

//             <div className="login_fields_wrapper" >
//                 <div className="login_img" ><img src="/images/sign_in_img.png" alt="" /></div>
//                 <div className="login_fields" >
//                     <Credentials />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login;


// const Credentials = () => {
//     const navigate = useNavigate()
//     return (
//         <div className="credentials" >
//             <h1 className="title" >Learn in</h1>
//             <p className="desc" >Enter your log in credentials</p>

//             <div className="grid mt-[35px]" >
//                 <div className="grid gap-[25px]" >
//                     <InputField  label='Email' placeholder='sample@admin.com' />
//                     <InputField label='password' placeholder='Enter your password here' />
//                 </div>
//                 <a style={{ textAlign: "end", textDecoration: "none", color: "var(--light-black)" }} className="mt-[15px] mb-[50px]" href="/forgot-pass" >Forgot password?</a>
//             </div>
//             <PrimaryBtn title='Lear in' onClick={() => navigate("/")} />
//             <div className="mt-[35px]" >
//                 <p className="text-center text-[18px] font-normal text-[var(--light-black)" >Don’t have an account? <a className="no-underline text-[var(--black)]" href="/register">Sign up</a></p>
//             </div>
//         </div>
//     )
// }