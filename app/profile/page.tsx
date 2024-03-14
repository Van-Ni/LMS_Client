'use client'

import React, { FC, useState } from 'react'
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Protected from '../hooks/useProtected';
import { useSelector } from 'react-redux';
import Profile from '../components/Profile/Profile';


interface Props { }
const Page: FC<Props> = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state: any) => state.auth);

    const handleSetOpen = (isOpen: boolean) => {
        setOpen(isOpen);
    };
    return (
        <div>
            <Protected>
                <Heading
                    title={`${user?.name} profile`}
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Prograaming, MERN, Redux, Machine Learning"
                />
                <Header
                    open={open}
                    onSetOpen={handleSetOpen}
                    activeItem={activeItem}
                    onSetRoute={setRoute}
                    route={route}
                />
                <Profile user={user}/>
            </Protected>
        </div>
    )
}

export default Page;