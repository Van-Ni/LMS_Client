import React, { FC, useState } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';

type CourseInfo = {
    name: string;
    description: string;
    price: number;
    estimatedPrice: number;
    tags: string[];
    level: string;
    demoUrl: string;
    thumbnail: string;
};

type Props = {
    // Define your props here if needed
};

const CreateCourse: FC<Props> = () => {
    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState<CourseInfo>({
        name: '',
        description: '',
        price: 0,
        estimatedPrice: 0,
        tags: [],
        level: '',
        demoUrl: '',
        thumbnail: ''
    });
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState({
        videoUrl: '',
        title: '',
        description: '',
        videoSection: 'Untitled Section',
        links: [
            {
                title: '',
                url: ""
            }
        ],
        suggestion: '',
    });
    const [courseData, setCourseData] = useState({});

    return (
        <>
            <div className="w-[80%] bg-slate-900 mt-4">
                {active === 0 && <CourseInformation
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    setActive={setActive}
                    active={active}
                />}
                {active === 1 && <CourseData
                    benefits={benefits}
                    setBenefits={setBenefits}
                    prerequisites={prerequisites}
                    setPrerequisites={setPrerequisites}
                    setActive={setActive}
                    active={active}
                />}
            </div>
            <div className='h-[100%] w-[20%] flex  bg-slate-900 justify-center items-center'>
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </>
    );
};

export default CreateCourse;
