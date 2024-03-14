import React, { FC, useState, useEffect } from 'react';
import SideBarProfile from './SidebarProfile';
import { useLogoutQuery } from '@/redux/features/auth/authApi';
import ProfileInfo from './ProfileInfo';
// import SideBarProfile from './SideBarProfile';

interface Props {
    user: any;
}

const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [active, setActive] = useState(1);
    const [logout, setLogout] = useState(false);
    const { } = useLogoutQuery(undefined, { skip: !logout ? true : false });

    const logoutHandler = async () => {
        // Add your logout logic here
        setLogout(true);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 85) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`flex h-screen overflow-hidden ${scroll ? 'ml-[260px]' : ''}`}>
            {/* Add other sidebar items/components here */}
            <div className="flex flex-col w-[260px] text-white" style={{ backgroundColor: "rgb(37 47 72)" }}>
                <SideBarProfile
                    user={user}
                    active={active}
                    setActive={setActive}
                    avatar={avatar}
                    logoutHandler={logoutHandler}
                />
            </div>
            {/* Main content of the profile page */}
            <div className="flex flex-1 bg-slate-900 overflow-y-auto justify-center items-center">
                {active === 1 && (
                    <ProfileInfo avatar={avatar} user={user} />
                )}
            </div>
        </div>
    );
};

export default Profile;
