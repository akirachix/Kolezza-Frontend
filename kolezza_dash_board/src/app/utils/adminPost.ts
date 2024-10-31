
// import { AdminRegistrationData, RegistrationSuccessResponse,RegistrationErrorResponse,FetchAdminFunction } from './types';

// const url = '/api/create_admin';

// export const fetchAdmin: FetchAdminFunction = async (data: AdminRegistrationData) => {

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
    

//     const responseData: RegistrationSuccessResponse | RegistrationErrorResponse = await response.json();

//     if (!response.ok) {
//         throw new Error((responseData as RegistrationErrorResponse).error || 'Registration failed');
//     }
    
//     return responseData as RegistrationSuccessResponse;
// };

// import { AdminRegistrationData } from './types';

// const url = '/api/create-admin';

// export const fetchAdmin = async (data: AdminRegistrationData) => {
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });

//         const responseData = await response.json();

//         if (response.ok && responseData.message === "Successful SignUp") {
//             return responseData; // Return the response if signup is successful
//         } else {
//             throw new Error(responseData.error || "Unexpected response format");
//         }
//     } catch (error) {
//         console.error("Error in fetchAdmin:", error);
//         return { error: (error as Error).message || "There was an error during sign-up." };
//     }
// };
import { AdminRegistrationData } from './types';

const url = '/api/create-admin';

export const fetchAdmin = async (data: AdminRegistrationData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok && responseData.message === "Successful SignUp") {
            return responseData; // Return the response if signup is successful
        } else {
            throw new Error(responseData.error || "Unexpected response format");
        }
    } catch (error) {
        console.error("Error in fetchAdmin:", error);
        return { error: (error as Error).message || "There was an error during sign-up." };
    }
};

