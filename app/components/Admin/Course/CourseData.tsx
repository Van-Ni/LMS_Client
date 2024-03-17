import React, { FC } from 'react';
import toast from 'react-hot-toast';
import { MdAddCircleOutline } from 'react-icons/md';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
    benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive
}) => {
    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    };
    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: '' }]);
    };
    const handlePrerequisiteChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    };
    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, { title: '' }]);
    };
    const handleOptions = () => {
        if (benefits[benefits.length - 1].title !== "" && prerequisites[prerequisites.length - 1].title !== "") {
            setActive(active + 1);
        } else {
            toast.error("Please fill the fields for go to the next step");
        }
    }
    return (
        <>
            <div className="bg-[#1b326a59] m-auto mt-24 px-4">
                <label htmlFor="courseName" className="block text-sm font-medium text-white mb-1">What are the benefits for students in this course?</label>
                <br />
                {benefits.map((benefit: any, index: number) => (
                    <>
                        <input
                            key={index}
                            placeholder="e.g. You will be able to build a full stack LMS Platform."
                            required
                            className="mb-3 appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={benefit.title}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                        />
                    </>
                ))}
                <MdAddCircleOutline size={30} className='mt-4 text-white' onClick={handleAddBenefit} />
            </div>
            <div className="bg-[#1b326a59] m-auto mt-10 px-4">
                <label htmlFor="courseName" className="block text-sm font-medium text-white mb-1">What are the prerequisites for starting in this course?</label>
                <br />
                {prerequisites.map((prerequisite: any, index: number) => (
                    <>
                        <input
                            key={index}
                            placeholder="e.g. You need basic knowledge of MERN stack."
                            required
                            className="mb-3 appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={prerequisite.title}
                            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                        />
                    </>
                ))}
                <MdAddCircleOutline size={30} className='mt-4 text-white' onClick={handleAddPrerequisite} />
            </div>
            <div className="mt-3 flex justify-end">
                <button
                    onClick={() => setActive(active - 1)}
                    type="submit"
                    className=" bg-slate-400 text-white px-4 py-2 rounded-md hover:bg-slate-700 focus:outline-none focus:bg-indigo-600 mr-2"
                >
                    Prev
                </button>
                <button
                    onClick={handleOptions}
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                    Next
                </button>
            </div>
        </>


    );
};

export default CourseData;
