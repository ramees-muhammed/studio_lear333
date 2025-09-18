import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../../../components/RegisterPage/PrimaryBtn";


const RegisterSuccess = () => {
    const navigate = useNavigate()
    return (
        <div className="register_success" >
            <img src="/RegisterPage/images/register_success.png" alt="..." />
            <p>Your account has been succesfully created</p>
            <PrimaryBtn title="Explore Lear" onClick={() => navigate("/subscriptions")} />
        </div>
    )
}

export default RegisterSuccess;

// .register_success {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100%;
//     gap: 50px;

//     p {
//         font-weight: 500;
//         font-size: 28px;
//     }


//     button {
//         width: fit-content;

//     }
// }