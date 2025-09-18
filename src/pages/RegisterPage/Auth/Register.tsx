import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axios from "axios";
import InputField from "../../../components/RegisterPage/InputField";
import MobileNumberField from "../../../components/RegisterPage/MobileNumberField";
import PrimaryBtn from "../../../components/RegisterPage/PrimaryBtn";


const Register = () => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        businessEmail: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreed: false
    });
    const [isRequired, setIsRequired] = useState({
        fullName: true,
        businessEmail: true,
        phone: true,
        password: true,
        confirmPassword: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;

        setFormData(prev => ({ ...prev, [name]: val }));

        if (name in isRequired) {
            setIsRequired(prev => ({ ...prev, [name]: !!val.trim() }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Check required fields
        const requiredFields = ["fullName", "businessEmail", "phone", "password", "confirmPassword"];
        const updatedRequiredState: any = {};

        let hasEmptyFields = false;

        requiredFields.forEach(field => {
            const isFilled = !!formData[field as keyof typeof formData]?.trim?.();
            updatedRequiredState[field] = isFilled;
            if (!isFilled) hasEmptyFields = true;
        });

        setIsRequired(updatedRequiredState);

        if (hasEmptyFields) {
            // alert("Please fill in all required fields.");
            return;
        }

        if (!formData.agreed) {
            alert("You must agree to the Privacy Policy.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                companyName: formData.fullName,
                businessEmail: formData.businessEmail,
                contact: formData.phone,
                password: formData.password,
            };

            const response = await axios.post("http://localhost:3000/studio/createStudio", payload);
            console.log("Studio created:", response.data);
            localStorage.setItem("studio_id", response.data.studio_id);
            navigate("/verify-account");
        } catch (error: any) {
            console.error("Error creating studio:", error.response?.data || error.message);
            alert("Failed to register. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: type === "checkbox" ? checked : value
    //     }));
    // };
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value, type, checked } = e.target;
    //     const val = type === "checkbox" ? checked : value;

    //     setFormData(prev => ({ ...prev, [name]: val }));

    //     if (name in isRequired) {
    //         setIsRequired(prev => ({ ...prev, [name]: !!val.trim() }));
    //     }
    // };


    // const handleSubmit = async (e: any) => {
    //     e.preventDefault()
    //     if (!formData.agreed) {
    //         alert("You must agree to the Privacy Policy.");
    //         return;
    //     }

    //     if (formData.password !== formData.confirmPassword) {
    //         alert("Passwords do not match.");
    //         return;
    //     }

    //     setIsLoading(true); // Only set loading when all validations pass

    //     try {
    //         const payload = {
    //             companyName: formData.fullName,
    //             businessEmail: formData.businessEmail,
    //             contact: formData.phone,
    //             password: formData.password
    //         };

    //         const response = await axios.post("http://localhost:3000/studio/createStudio", payload);
    //         console.log("Studio created:", response.data);
    //         localStorage.setItem("studio_id", response.data.studio_id);
    //         navigate("/verify-account");
    //     } catch (error: any) {
    //         console.error("Error creating studio:", error.response?.data || error.message);
    //         alert("Failed to register. Please try again.");
    //     } finally {
    //         setIsLoading(false); // Always stop loading regardless of success or failure
    //     }
    // };


    const handlePhoneChange = useCallback((val: string) => {
        setFormData(prev => ({ ...prev, phone: val }));
    }, []);

    return (
        <div className="register_page" >
            <div className="privacy_policy">
                <div className="privacy_policy_box">
                    <div className="privacy_policy_contents">
                        <p>...</p>
                    </div>
                </div>
                <div className="policy_submit">
                    <input
                        type="checkbox"
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleChange}
                    />
                    <p>I have read and agree to the Privacy Policy and Terms of Service.</p>
                </div>
            </div>

            <div className="register_fields p-[69px]">
                <p className="title">Lear up</p>
                <p className="desc">Create a new account</p>

                <div className="grid gap-[25px] mt-[35px] mb-[50px]">
                    <InputField isRequired={isRequired.fullName} label="Full name" placeholder="Sample name" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <InputField isRequired label="Email" placeholder="Sample@gmail.com" name="businessEmail" value={formData.businessEmail} onChange={handleChange} />
                    <MobileNumberField value={formData.phone} onChange={handlePhoneChange} />

                    <InputField isRequired type="password" label="Password" placeholder="Enter your password here" name="password" value={formData.password} onChange={handleChange} />
                    <InputField isRequired type="password" label="Confirm password" placeholder="Re-enter your password here" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>

                <PrimaryBtn type="submit" isLoading={isLoading} title="Learn up" onClick={handleSubmit} />

                <div className="mt-[25px]">
                    <p className="text-center text-[18px] font-normal text-[var(--light-black)">
                        Already have an account? <a className="no-underline text-[var(--black)]" href="/login">Log in</a>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Register;

// import { useNavigate } from "react-router-dom";
// import InputField from "../../components/InputField";
// import PrimaryBtn from "../../components/PrimaryBtn";

// const Register = () => {
//     const navigate = useNavigate()

//     const [formData, setFormData] = useState({
//         fullName: "",
//         businessEmail: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//         agreed: false
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === "checkbox" ? checked : value
//         }));
//     };

//     const handleSubmit = async () => {
//         if (!formData.agreed) {
//             alert("You must agree to the Privacy Policy.");
//             return;
//         }

//         if (formData.password !== formData.confirmPassword) {
//             alert("Passwords do not match.");
//             return;
//         }

//         try {
//             const payload = {
//                 companyName: formData.fullName,
//                 businessEmail: formData.businessEmail,
//                 contact: formData.phone,
//                 password: formData.password
//             };

//             const response = await axios.post("http://localhost:3000/studio/createStudio", payload);
//             console.log("Studio created:", response.data);
//             navigate("/verify-account");
//         } catch (error: any) {
//             console.error("Error creating studio:", error.response?.data || error.message);
//             alert("Failed to register. Please try again.");
//         }
//     };


//     return (
//         <div className="register_page" >
//             <div className="privacy_policy">
//                 <div className="privacy_policy_box" >
//                     <div className="privacy_policy_contents" >
//                         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum voluptatem culpa ratione et voluptate, rerum modi voluptas eaque aut similique sed debitis vero voluptates ducimus reprehenderit assumenda quidem nesciunt labore?</p>
//                         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum voluptatem culpa ratione et voluptate, rerum modi voluptas eaque aut similique sed debitis vero voluptates ducimus reprehenderit assumenda quidem nesciunt labore?</p>
//                     </div>
//                 </div>
//                 <div className="policy_submit" >
//                     <input type="checkbox" name="" id="" />
//                     <p>I have read and agree to the Privacy Policy and Terms of Service.</p>
//                 </div>
//             </div>
//             <div className="register_fields p-[69px]">
//                 <p className="title" >Lear up</p>
//                 <p className="desc" >Create a new account</p>

//                 <div className="grid gap-[25px] mt-[35px] mb-[50px]" >
//                     <InputField label="Full name" placeholder="Sample name" />
//                     <InputField label="Email" placeholder="Sample@gmail.com" />
//                     <InputField label="Number" placeholder="974 714  7668" />
//                     <InputField label="Password" placeholder="Enter your password here" />
//                     <InputField label="Confirm password" placeholder="Re-enter your password here" />
//                 </div>
//                 <PrimaryBtn title="Learn up" onClick={() => navigate("/verify-account")} />
//                 <div className="mt-[25px]" >
//                     <p className="text-center text-[18px] font-normal text-[var(--light-black)" >Already have an account? <a className="no-underline text-[var(--black)]" href="/login">Log in</a></p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Register;