import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { styles } from '../styles/style';
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import { useActivationMutation } from '@/redux/features/auth/authApi';

type Props = {
    onSetRoute: (route: string) => void
};

type VerifyNumber = {
    "0": string,
    "1": string,
    "2": string,
    "3": string,
}

const Verification: React.FC<Props> = ({ onSetRoute }) => {
    const { token } = useSelector((state: any) => state.auth);
    const [activateUser, { isSuccess, error }] = useActivationMutation();
    const [invalidError, setInvalidError] = useState<boolean>(false);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Account activated successfully");
            onSetRoute("Login"); // Change "someRoute" to the appropriate route after successful activation
        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
                setInvalidError(true);

            } else {
                console.log("An error occurred:", error);
            }
        }
    }, [isSuccess, error]);
    const verifictionHandler = async () => {
        const verificationNumber = Object.values(verifyNumber).join("");
        if (verificationNumber.length !== 4) {
            setInvalidError(true);
            return;
        }
        await activateUser({ activation_token: token, activation_code: verificationNumber });
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        // const newVerifyNumber = { ...verifyNumber, [index]: value };
        // set new verify number
        setVerifyNumber((prev: VerifyNumber) => {
            return { ...prev, [index]: value }
        });
        // auto next input
        if (value === "" && index > 0) {
            // back
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3) {
            // up
            inputRefs[index + 1].current?.focus();
        }
    };
    return (
        <div>
            <h1 className={`${styles.title}`} >Verify Your Account</h1>
            <div className="w-full flex items-center justify-center mt-2">
                <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center bg-blue-200">
                    <VscWorkspaceTrusted size={40} /> {/* Assuming VscWorkspaceTrusted is an imported component */}
                </div>
            </div>
            <br />
            <div className="1100px:w-[70%] m-auto flex items-center justify-around">
                {Object.keys(verifyNumber).map((key, index) => (
                    <input
                        type='number'
                        key={key}
                        ref={inputRefs[index]}
                        placeholder=''
                        maxLength={1}
                        value={verifyNumber[key as keyof VerifyNumber]}
                        className={`mr-2 w-[65px] text-center h-[65px] border-[3px] bg-transparent flex items-center text-black 
                        ${invalidError ? "border-red-500 shake" : "border-gray-400 dark:border-white"}`}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))}
            </div>
            <br />
            <button type="submit"
                onClick={verifictionHandler}
                className={`bg-blue-500 text-white ${styles.button} py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 hover:bg-blue-600`}>
                Verify OTP
            </button>
            <div className="flex flex-col items-center mt-5">
                <h5 className="mt-4 font-Poppins text-sm text-gray-600">
                    Go back to sign in?{" "}
                    <span className="cursor-pointer text-blue-500" onClick={() => onSetRoute("Login")}>Login</span>
                </h5>
            </div>
        </div>
    );


};

export default Verification;
