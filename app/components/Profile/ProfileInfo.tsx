import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { CiCamera } from "react-icons/ci";
type Props = {
    user: any;
    avatar: string | null;
}
const ProfileInfo: FC<Props> = ({ user, avatar }) => {
    const [updateAvatar, { data, isSuccess, error }] = useUpdateAvatarMutation();
    const [loadUser, setLoadUser] = useState(false);
    const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

    const handleAvatarChange = (event: any) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        updateAvatar(formData);
    };

    useEffect(() => {
        if(isSuccess){
            setLoadUser(true);
        }
        if(error){
            console.log(error);
        }
    }, [isSuccess, error]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md" style={{ width: "500px", height: "500px" }}>
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
            <form>
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
                    <input type="text" id="name" name="name" className="appearance-none border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" id="password" name="password" className="appearance-none border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
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
