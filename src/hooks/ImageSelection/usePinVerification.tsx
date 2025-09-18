import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface OtpVerificationPayload {
    album_id: string | undefined
    otp: string | undefined
}

interface OtpVerificationResponse {
    loginstatus: string;
    jwtToken: string;
    project_id: string;
}

const verifyOtp = async (payload: OtpVerificationPayload): Promise<OtpVerificationResponse> => {
    const response = await axios.post('http://localhost:3000/api/album/optverification', payload);

    localStorage.setItem('project_id', response.data.project_id);
    localStorage.setItem('loginstatus', response.data.loginstatus);
    localStorage.setItem('jwtToken', response.data.jwtToken);

    return response.data;
};

export const useOtpVerification = () => {
    return useMutation<OtpVerificationResponse, Error, OtpVerificationPayload>({
        mutationFn: verifyOtp,
    });
};


// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';

// interface OtpVerificationPayload {
//     album_id: string;
//     otp: string;
// }

// interface OtpVerificationResponse {
//     loginstatus: string;
//     jwtToken: string;
// }

// const verifyOtp = async (payload: OtpVerificationPayload): Promise<OtpVerificationResponse> => {
//     const response = await axios.post('http://localhost:3000/api/album/optverification', payload);
//     return response.data;
// };

// export const useOtpVerification = () => {
//     return useMutation<OtpVerificationResponse, Error, OtpVerificationPayload>({
//         mutationFn: verifyOtp,
//     });
// };