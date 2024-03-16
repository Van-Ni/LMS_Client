import CoursePlayer from '@/app/utils/CoursePlayer';
import React, { FC } from 'react';

type CourseData = any; // Update this with the actual type for your course data

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: CourseData;
    handleCreateCourse: () => void;
};

const CoursePreview: FC<Props> = ({ active, setActive, courseData, handleCreateCourse }) => {

    return (
        <div style={{ maxWidth: '90%', margin: 'auto', paddingTop: '5px', paddingBottom: '5px', marginBottom: '5px' }}>
            {/* Your course preview content goes here */}
            <CoursePlayer videoUrl={courseData?.demoUrl} courseData={courseData} title={courseData?.title} />
            <div className="flex justify-end">
                <button
                    onClick={() => setActive(active - 1)}
                    type="submit"
                    className=" bg-slate-400 text-white px-4 py-2 rounded-md hover:bg-slate-700 focus:outline-none focus:bg-indigo-600 mr-2"
                >
                    Prev
                </button>
                <button
                    onClick={handleCreateCourse}
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                    Create Course
                </button>
            </div>
        </div>
    );
};

export default CoursePreview;
