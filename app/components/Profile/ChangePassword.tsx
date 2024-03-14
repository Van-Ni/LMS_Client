import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
type Props = {
    user: any;
}

const ChangePassword: FC<Props> = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updatePassword, { data, isSuccess, error }] = useUpdatePasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password updated successfully")
        }
        if (error && "data" in error) {
            const errorData = error as any;
            toast.error(errorData.data.message);
        }
    }, [isSuccess, error]);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // Validate passwords
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }
        await updatePassword({ oldPassword, newPassword });
        // Reset form fields
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md" style={{ width: "500px", height: "500px" }}>
            <h2 className="text-xl font-semibold mb-6">Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                    <input type="password" id="oldPassword" name="oldPassword" value={oldPassword} onChange={handleChange} className="appearance-none border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="mb-6">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={handleChange} className="appearance-none border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleChange} className="appearance-none border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
