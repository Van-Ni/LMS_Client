import React, { FC } from 'react';
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from 'next/link';
type Props = {
    user: any;
    active: number;
    avatar: string | null; // Corrected type declaration
    setActive: (active: number) => void; // Corrected function type
    logoutHandler: any; // Assuming this is a function for logging out
}

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logoutHandler }) => {
    return (
        <div className="w-full">
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? 'bg-slate-800' : 'bg-transparent'}`} onClick={() => setActive(1)}>
                <img
                    src={user.avatar.url || 'avatar'} // Nếu user có avatar, sử dụng nó, ngược lại sử dụng 'avatar'
                    alt=""
                    className="w-[30px] h-[30px] 800px:w-[30px] rounded-full cursor-pointer"
                />
                <h5 className="block font-Poppins dark:text-white">
                    My Account
                </h5>
            </div>
            <div
                className={`flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "bg-blue-900" : ""}`}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine />
                <h5 className="ml-2 block font-Poppins dark:text-white">
                    Change Password
                </h5>
            </div>
            <div
                className={`flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "bg-blue-900" : ""}`}
                onClick={() => setActive(3)}
            >
                <SiCoursera />
                <h5 className="ml-2 block font-Poppins dark:text-white">
                    Enrolled Courses
                </h5>
            </div>
            {user?.role === "admin" && (
                <Link href={'/admin'}>
                    <div
                        className={`flex items-center px-3 py-4 cursor-pointer ${active === 6 ? "bg-blue-900" : ""}`}
                        onClick={() => setActive(6)}
                    >
                        <MdAdminPanelSettings />
                        <h5 className="ml-2 block font-Poppins dark:text-white">
                            Admin Dashboard
                        </h5>
                    </div>
                </Link>
            )}

            <div
                className={`flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "bg-blue-900" : ""}`}
                onClick={() => {
                    setActive(4)
                    logoutHandler()
                }}
            >
                <CiLogout />
                <h5 className="ml-2 block font-Poppins dark:text-white">
                    Log out
                </h5>
            </div>
        </div>

    );

}

export default SideBarProfile;
