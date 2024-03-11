'use client'

import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FcGoogle } from 'react-icons/fc';
import { styles } from '../styles/style';
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillGithub } from "react-icons/ai";
type Props = {
    onSetRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Please enter your email'),
    password: Yup.string().required('Please enter your password').min(6, 'Password must be at least 6 characters'),
});

const Login: FC<Props> = ({ onSetRoute }) => {
    const [show, setShow] = useState(false);
    const initialValues = {
        email: "",
        password: ""
    };
    // Formik initialization
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            // Handle form submission
            console.log(email, password);
        },
    });

    const { errors, touched, values, handleChange, handleBlur, handleSubmit } = formik;

    return (
        <div className="w-full">
            <h1 className={styles.title}>
                Login with LMS
            </h1>
            <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
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
                    <br />
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
                        Submit
                    </button>
                    <div className="flex items-center mt-5">
                        <span className="mr-2 text-gray-600">Or join with</span>
                    </div>
                    <div className="flex items-center justify-center mt-3">
                        <FcGoogle size={30} className="mr-2" />
                        <AiFillGithub size={30} className="" />
                    </div>
                    <h5 className="mt-4 font-Poppins text-sm text-gray-600">
                        Not have any account?{" "}
                        <span className="cursor-pointer text-blue-500" onClick={() => onSetRoute("Sign-Up")}>Sign up</span>
                    </h5>
                </div>

            </form>
        </div>
    );
};

export default Login;
