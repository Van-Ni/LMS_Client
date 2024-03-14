import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CiCamera } from "react-icons/ci";
type Props = {
    user: any;
    avatar: string | null;
}
const ProfileInfo: FC<Props> = ({ user, avatar }) => {
    const [updateAvatar, { data, isSuccess, error }] = useUpdateAvatarMutation();
    const [editProfile, { data: dataProfile, isSuccess: isSuccessProfile, error: errorProfile }] = useEditProfileMutation();

    const [loadUser, setLoadUser] = useState(false);
    const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    useEffect(() => {
        if (isSuccess || isSuccessProfile) {
            setLoadUser(true);
        }
        if (error || errorProfile) {
            console.log(error);
        }
        if (isSuccessProfile) {
            toast.success("Profile updated successfully")
        }
    }, [isSuccess, isSuccessProfile, error, errorProfile]);

    const handleAvatarChange = (event: any) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        updateAvatar(formData);
    };


    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name || !email) {
            toast.error("Please enter name and email")
        }
        await editProfile({ name });
    };
    return (
        <div className="p-6 bg-white rounded-lg shadow-md" style={{ width: "500px", height: "500px" }}>
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="relative mb-6">
                    {/* Input file ẩn */}
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {/* Hiển thị avatar hiện tại */}
                    <img src={user.avatar.url} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-4 border border-gray-300 cursor-pointer" />
                    {/* Biểu tượng chỉnh sửa */}
                    <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                        <CiCamera className="h-4 w-4 text-gray-600" />
                    </label>
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="appearance-none border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" disabled id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileInfo;
