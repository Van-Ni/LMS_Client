import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillGithub } from "react-icons/ai";
import { styles } from '../styles/style';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
    onSetRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().email('Enter a valid email').required('Please enter your email'),
    password: Yup.string().required('Please enter your password').min(6, 'Password must be at least 6 characters'),
});

const SignUp: FC<Props> = ({ onSetRoute }) => {
    const [show, setShow] = useState(false);
    const initialValues = {
        name: "",
        email: "",
        password: ""
    };
    const [register, {data, error, isSuccess }] = useRegisterMutation();

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Registration successful";
            toast.success(message);
            onSetRoute("Verification");
        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message || "An error occurred during registration");
            }
        }

    }, [isSuccess, error]);


    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            // Handle form submission
            console.log(name, email, password);
            // onSetRoute("Verification")
            await register({ name, email, password });
        },
    });

    const { errors, touched, values, handleChange, handleBlur, handleSubmit } = formik;

    return (
        <div className="w-full">
            <h1 className={styles.title}>
                Sign Up for LMS
            </h1>
            <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className={`w-full mt-1 ${styles.input} ${errors.name && touched.name && "border-red-500"}`}
                        placeholder='Enter your name'
                    />
                    {errors.name && touched.name && (
                        <span className="text-red-500 text-sm">{errors.name}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`w-full mt-1 ${styles.input} ${errors.email && touched.email && "border-red-500"}`}
                        placeholder='Enter your email'
                    />
                    {errors.email && touched.email && (
                        <span className="text-red-500 text-sm">{errors.email}</span>
                    )}
                </div>
                <div className="mt-5 relative mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <input
                            type={!show ? "password" : "text"}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className={`w-full ${styles.input} ${errors.password && touched.password ? "border-red-500" : ""}`}
                            placeholder="Enter your password"
                        />
                        {!show ? (
                            <AiOutlineEyeInvisible
                                onClick={() => setShow(true)}
                                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            />
                        ) : (
                            <AiOutlineEye
                                onClick={() => setShow(false)}
                                className="absolute bottom-3 right-2 cursor-pointer"
                            />
                        )}
                    </div>
                    {errors.password && touched.password && (
                        <span className="text-red-500 text-sm">{errors.password}</span>
                    )}
                </div>
                <div className="flex flex-col items-center mt-5">
                    <button type="submit" className={`bg-blue-500 text-white ${styles.button} py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50`}>
                        Sign Up
                    </button>
                    <div className="flex items-center mt-5">
                        <span className="mr-2 text-gray-600">Or sign up with</span>
                    </div>
                    <div className="flex items-center justify-center mt-3">
                        <FcGoogle size={30} className="mr-2" />
                        <AiFillGithub size={30} className="" />
                    </div>
                    <h5 className="mt-4 font-Poppins text-sm text-gray-600">
                        Already have an account?{" "}
                        <span className="cursor-pointer text-blue-500" onClick={() => onSetRoute("Login")}>Login</span>
                    </h5>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
