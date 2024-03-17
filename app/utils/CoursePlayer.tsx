import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import Ratings from './Ratings';
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
    videoUrl: string;
    title: string;
    courseData: any;
};

const CoursePlayer: FC<Props> = ({ videoUrl, courseData }) => {
    console.log('🚀 ~ courseData:', courseData)
    const [videoData, setVideoData] = useState({ otp: '', playbackInfo: '' });
    console.log('🚀 ~ videoData:', videoData)

    const discountPercentage = ((courseData?.estimatedPrice - courseData.price) / courseData.estimatedPrice) * 100;
    const discountPercentagePrice = discountPercentage.toFixed(0)

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}course/vdoCipher/getOTP`, { videoId: videoUrl })
            .then((res) => {
                setVideoData(res.data);
            })
            .catch((error) => {
                console.error('Error fetching video data:', error);
            });
    }, [videoUrl]);

    return (
        <div>
            {videoData.otp && videoData.playbackInfo && (
                <iframe
                    src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=0RE1bVuvJ4kmGWLV`}
                    style={{
                        border: 0,
                        width: "100%",
                        height: "400px",
                        left: 0,
                    }}
                    allowFullScreen
                    allow="encrypted-media"
                ></iframe>
            )}
            <div className="text-white">
                <h1 className="pt-5 text-2xl">
                    {!courseData?.price ? "Free" : `$${courseData?.price}`}
                </h1>
                {courseData?.estimatedPrice && (
                    <span className="size-2 mt-2 mr-2 line-through">
                        {`$${courseData?.estimatedPrice}`}
                    </span>
                )}
                {discountPercentagePrice && (
                    <span className="size-2 mt-2">
                        {`${discountPercentagePrice}% OFF`}
                    </span>
                )}
            </div>
            <div className="bg-red-500 text-white text-center px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 cursor-pointer mt-4">
                Buy Now
            </div>
            <div className="flex items-center text-white mt-4">
                <input
                    type="text"
                    name="code"
                    placeholder="Discount code ..."
                    className="bg-gray-800 text-white py-2 px-4 rounded-md mr-4"
                />
                <div
                    className="bg-gray-800 text-white py-2 px-4 rounded-md cursor-pointer"
                >
                    Apply
                </div>
            </div>
            <div className="pb-3 text-white mt-4">
                <div>
                    <h1 className="text-lg font-semibold">Source code</h1>
                    <ul className="list-disc pl-5">
                        <li>Full lifetime access</li>
                        <li>Certificate of completion</li>
                        <li>Premium Support</li>
                    </ul>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold mt-6">{courseData?.name}</h1>
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center">
                            <Ratings rating={0} />
                            <h5 className="ml-2">0 Reviews</h5>
                        </div>
                        <h5>0 Students</h5>
                    </div>
                    <div className="mt-6">
                        <h1 className="text-lg font-semibold">What you will learn from this course?</h1>
                        <ul className="list-disc pl-5">
                            {courseData?.benefits?.map((item: any, index: number) => (
                                <li key={index} className="mt-2">{item?.title}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <h1 className="text-lg font-semibold">What are the prerequisites for starting this courses?</h1>
                        <ul className="list-disc pl-5">
                            {courseData?.prerequisites?.map((item: any, index: number) => (
                                <li key={index} className="mt-2">{item?.title}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <h1 className="text-lg font-semibold">Course Details</h1>
                        <p className="mt-2">{courseData?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CoursePlayer;
