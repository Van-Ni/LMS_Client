import React, { FC, useState } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import axios from 'axios';
import CoursePreview from './CoursePreview';

type CourseInfo = {
    name: string;
    description: string;
    price: number;
    estimatedPrice: number;
    tags: string;
    level: string;
    demoUrl: string;
    thumbnail: string;
};

type Props = {
    // Define your props here if needed
};

const CreateCourse: FC<Props> = () => {
    const [active, setActive] = useState(3);

    // CourseInformation
    const [courseInfo, setCourseInfo] = useState<CourseInfo>({
        name: '',
        description: '',
        price: 0,
        estimatedPrice: 0,
        tags: "",
        level: '',
        demoUrl: '',
        thumbnail: ''
    });
    console.log('🚀 ~ courseInfo:', courseInfo)

    // CourseData
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

    // CourseContent
    const [courseContentData, setCourseContentData] = useState(
        [{
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
        }]
    );
    const [courseData, setCourseData] = useState({});

    const handleSubmit = async () => {
        const formData = new FormData();

        // Create a single object for course info to improve readability
        const courseData = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price.toString(),
            estimatedPrice: courseInfo.estimatedPrice.toString(),
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            image: courseInfo.thumbnail,
        };
        console.log('🚀 ~ handleSubmit ~ courseData:', courseData)

        // Add course data efficiently
        Object.entries(courseData).forEach(([key, value]) => {
            formData.append(key, value);
        });


        // Create benefit and prerequisite objects for cleaner structure
        const benefitsData = benefits.map((benefit) => ({ title: benefit.title }));
        console.log('🚀 ~ handleSubmit ~ benefitsData:', benefitsData)
        const prerequisitesData = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));
        console.log('🚀 ~ handleSubmit ~ prerequisitesData:', prerequisitesData)

        // Append benefit and prerequisite data efficiently
        formData.append('benefits', JSON.stringify(benefitsData));
        formData.append('prerequisites', JSON.stringify(prerequisitesData));

        // Create course content objects for better organization
        const nextcourseContentData = courseContentData.map((content) => ({
            videoUrl: content.videoUrl,
            title: content.title,
            description: content.description,
            videoSection: content.videoSection,
            links: content.links.map((link: any) => ({ title: link.title, url: link.url })),
            suggestion: content.suggestion,
        }));
        console.log('🚀 ~ nextcourseContentData ~ nextcourseContentData:', nextcourseContentData)

        // Append course content data efficiently
        formData.append('courseContent', JSON.stringify(nextcourseContentData));

        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            thumbnail: courseInfo.thumbnail,
            benefits: benefitsData,
            prerequisites: prerequisitesData,
            courseContent: nextcourseContentData
        }
        setCourseData(data);

    }

    const handleCreateCourse = async () => {

    }
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
                {active === 2 && <CourseContent
                    setActive={setActive}
                    active={active}
                    courseContentData={courseContentData}
                    setCourseContentData={setCourseContentData}
                    handleSubmit={handleSubmit}
                />}
                {active === 3 && <CoursePreview
                    setActive={setActive}
                    active={active}
                    courseData={courseData}
                    handleCreateCourse={handleCreateCourse}
                />}
            </div>
            <div className='h-[100%] w-[20%] flex  bg-slate-900 justify-center items-center'>
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </>
    );
};

export default CreateCourse;
