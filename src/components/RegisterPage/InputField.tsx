import { useState } from "react";

interface InputFieldProps {
    label: string;
    placeholder: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRequired?: boolean
}

const InputField = ({
    label,
    placeholder,
    type = "text",
    name,
    value,
    onChange,
    isRequired
}: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className={`input_field  ${isRequired ? "required" : ""}`}>
            <label>{label}</label>
            <div className="input_wrapper">
                <input
                    type={isPassword && !showPassword ? "password" : "text"}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {isPassword && (
                    <span className="eye_icon" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <img src="/RegisterPage/images/pw-eye-closed.svg" alt="hide" /> : "👁️"}
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputField;



// import { useState } from "react"

// interface InputFieldProps {
//     label: string
//     placeholder: string
//     type?: string
// }

// const InputField = ({ label, placeholder, type = "text" }: InputFieldProps) => {
//     const [showPassword, setShowPassword] = useState(false)

//     const isPassword = type === "password"

//     return (
//         <div className="input_field">
//             <label>{label}</label>
//             <div className="input_wrapper">
//                 <input
//                     type={isPassword && !showPassword ? "password" : "text"}
//                     placeholder={placeholder}
//                 />
//                 {isPassword && (
//                     <span className="eye_icon" onClick={() => setShowPassword(prev => !prev)}>
//                         {showPassword ? <img src="./images/pw-eye-closed.svg" /> : "👁️"}
//                     </span>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default InputField


// const InputField = ({ label, placeholder }: { label: string; placeholder: string }) => {
//     return (
//         <div className="input_field" >
//             <label htmlFor="">{label}</label>
//             <input placeholder={placeholder} type="password" />
//         </div>
//     )
// }

// export default InputField;