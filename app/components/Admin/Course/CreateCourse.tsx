import React, { FC, useEffect, useState } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import axios from 'axios';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation } from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

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
    const [active, setActive] = useState(0);
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
    const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();


    useEffect(() => {
        if (isSuccess) {
            toast.success("Course created successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message || "An error occurred during registration");
            }
        }

    }, [isSuccess, error]);

    const handleSubmit = async () => {
        const benefitsData = benefits.map((benefit) => ({ title: benefit.title }));
        const prerequisitesData = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));
        const nextcourseContentData = courseContentData.map((content) => ({
            videoUrl: content.videoUrl,
            title: content.title,
            description: content.description,
            videoSection: content.videoSection,
            links: content.links.map((link: any) => ({ title: link.title, url: link.url })),
            suggestion: content.suggestion,
        }));
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
        const formData = new FormData();

        // Thêm thông tin về khóa học (courseInfo) vào FormData
        formData.append('name', courseInfo.name);
        formData.append('description', courseInfo.description);
        formData.append('price', courseInfo.price.toString());
        formData.append('estimatedPrice', courseInfo.estimatedPrice.toString());
        formData.append('tags', courseInfo.tags);
        formData.append('level', courseInfo.level);
        formData.append('demoUrl', courseInfo.demoUrl);

        // Nếu có ảnh thumbnail, bạn có thể thêm vào FormData
        if (courseInfo.thumbnail) {
            formData.append('image', courseInfo.thumbnail);
        }

        // Thêm thông tin về lợi ích của khóa học (benefits) vào FormData
        benefits.forEach((benefit, index) => {
            formData.append(`benefits[${index}][title]`, benefit.title);
        });

        // Thêm thông tin về các yêu cầu tiên quyết (prerequisites) vào FormData
        prerequisites.forEach((prerequisite, index) => {
            formData.append(`prerequisites[${index}][title]`, prerequisite.title);
        });

        // Thêm thông tin về nội dung khóa học (courseContentData) vào FormData
        courseContentData.forEach((content, index) => {
            formData.append(`courseContent[${index}][videoUrl]`, content.videoUrl);
            formData.append(`courseContent[${index}][title]`, content.title);
            formData.append(`courseContent[${index}][description]`, content.description);
            formData.append(`courseContent[${index}][videoSection]`, content.videoSection);
            formData.append(`courseContent[${index}][suggestion]`, content.suggestion);

            // Thêm các liên kết (links) cho mỗi phần nội dung
            content.links.forEach((link, linkIndex) => {
                formData.append(`courseContent[${index}][links][${linkIndex}][title]`, link.title);
                formData.append(`courseContent[${index}][links][${linkIndex}][url]`, link.url);
            });
        });

        // Create a new course
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}course`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            toast.success("Course created successfully");
            // Handle success
        } catch (error) {
            // Xác định nếu error là một đối tượng chuỗi
            if (typeof error === 'string') {
                // Nếu error là một chuỗi, hiển thị nó trực tiếp
                toast.error(error);
                redirect("/admin/all-courses");
            } else if (error instanceof Error) {
                // Nếu error là một đối tượng lỗi, lấy thông điệp lỗi từ thuộc tính message
                toast.error(error.message);
            } else {
                // Nếu không thể xác định được kiểu của error, hiển thị một thông điệp mặc định
                toast.error('An unknown error occurred');
            }

        }
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
