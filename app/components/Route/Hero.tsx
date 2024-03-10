import Link from 'next/link';
import React, { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

type Props = {
    // Define your props here
};

const Hero: FC<Props> = (props) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-center mb-8">
                    <img
                        src="https://www.ntc.edu/sites/default/files/styles/full_width_16_9/public/2021-06/software-development-specialist.jpg?itok=D8qgVwxb"
                        alt="Hero Image"
                        className="max-w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Improve Your Online Learning Experience Instantly</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Discover over 40k+ online courses and join our community of 500k+ registered students.</p>
                    <div className="flex items-center justify-center max-w-md mx-auto mb-8">
                        <input
                            type="search"
                            placeholder="Search Courses..."
                            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
                        />
                        <button className="ml-2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                            <BiSearch size={20} />
                        </button>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <img
                            src="https://cdn-icons-png.flaticon.com/256/5072/5072860.png"
                            alt=""
                            className="w-16 h-16 rounded-full shadow-lg"
                        />
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4260/4260895.png"
                            alt=""
                            className="w-16 h-16 rounded-full shadow-lg"
                        />
                        <img
                            src="https://cdn-icons-png.flaticon.com/256/2980/2980979.png"
                            alt=""
                            className="w-16 h-16 rounded-full shadow-lg"
                        />
                    </div>
                    <p className="text-lg mt-6 text-gray-600 dark:text-gray-300">Join our community today!</p>
                    <Link href="/courses">
                        <p className="inline-block px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300">View Courses</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
