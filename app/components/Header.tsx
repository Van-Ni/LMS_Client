'use client'

import Link from 'next/link';
import React, { FC, useState } from 'react'
import NavItems from '../utils/NavItems';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import CustomModal from '../utils/CustomModal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Verification from './Auth/Verification';

type Props = {
    open: boolean;
    onSetOpen: (open: boolean) => void;
    activeItem: number;
    onSetRoute: (route: string) => void;
    route: string
}
const Header: FC<Props> = ({ activeItem, open, onSetOpen, route, onSetRoute }) => {
    const [active, setActive] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
    }

    return (
        <div className="w-full relative">
            <div className={`${active
                ? "bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : " w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow bg-white"
                }`}>
                <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link href={"/"} className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                                LMS
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItems activeItem={activeItem} isMobile={false} />
                            <ThemeSwitcher />
                            {/* only for mobile */}
                            <div className="800px:hidden">
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>
                            <HiOutlineUserCircle
                                size={25}
                                className="cursor-pointer dark:text-white text-black"
                                onClick={() => onSetOpen(true)}
                            />

                        </div>
                    </div>
                </div>
                {/*  */}
                {openSidebar && (
                    <div className="fixed w-full h-screen top-0 left-0 dark:bg-opacity-90" id="sidebar">
                        <div className="fixed h-screen bg-white dark:bg-opacity-90 top-0 right-0">
                            <NavItems activeItem={activeItem} isMobile={true} />
                            <HiOutlineUserCircle
                                size={25}
                                className="cursor-pointer mt-5 my-2 text-black dark:text-white"
                                onClick={() => onSetOpen(true)}
                            />
                            <br />
                            <br />
                            <div className="px-2 pl-5 text-black dark:text-white">
                                Copyright @ 2023 ELearning
                            </div>
                        </div>
                    </div>
                )}

            </div>
            {
                route === "Login" && (
                    <>
                        {open && (<CustomModal open={open}
                            onSetOpen={onSetOpen}
                            activeItem={activeItem}
                            component={Login}
                            onSetRoute={onSetRoute} />)}
                    </>
                )
            }
            {
                route === "Sign-Up" && (
                    <>
                        {open && (<CustomModal open={open}
                            onSetOpen={onSetOpen}
                            activeItem={activeItem}
                            component={SignUp}
                            onSetRoute={onSetRoute} />)}
                    </>
                )
            }
            {
                route === "Verification" && (
                    <>
                        {open && (<CustomModal open={open}
                            onSetOpen={onSetOpen}
                            activeItem={activeItem}
                            component={Verification}
                            onSetRoute={onSetRoute} />)}
                    </>
                )
            }
        </div>
    );

}

export default Header;