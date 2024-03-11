'use client'

import React, { FC, useState } from 'react'
import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Route/Hero';

interface Props { }
const Page: FC<Props> = () => {
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Verification");
  return (
    <div>
      <Heading
        title="LMS"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming, MERN, Redux, Machine Learning"
      />
      <Header
        open={open}
        onSetOpen={setOpen}
        activeItem={activeItem}
        onSetRoute={setRoute}
        route={route}
      />
      <Hero />
    </div>
  )
}

export default Page;