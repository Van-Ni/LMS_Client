import React, { FC, ChangeEvent, FormEvent, useState } from 'react';

type CourseInfo = {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: any;
};

type Props = {
  courseInfo: CourseInfo;
  setCourseInfo: (courseInfo: CourseInfo) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
  const [dragging, setDragging] = useState(false);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseInfo({ ...courseInfo, name: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCourseInfo({ ...courseInfo, description: e.target.value });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseInfo({ ...courseInfo, price: parseFloat(e.target.value) });
  };

  const handleEstimatedPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseInfo({ ...courseInfo, estimatedPrice: parseFloat(e.target.value) });
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseInfo({ ...courseInfo, tags: e.target.value });
  };

  const handleLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseInfo({ ...courseInfo, level: e.target.value });
  };

  const handleDemoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseInfo({ ...courseInfo, demoUrl: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1);
  };
  const handleThumbnailChange = (event: any) => {
    const file = event.target.files[0];
    setCourseInfo({ ...courseInfo, thumbnail: file });
    setDragging(false);
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  }
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  }

  return (
    <div className="bg-[#1b326a59] p-6 rounded-lg shadow-md" style={{ width: "90%", minHeight: "500px", marginLeft: "20px" }}>
      <h2 className="text-xl font-semibold mb-6 text-white">Course Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="courseName" className="block text-sm font-medium text-white mb-1">Course Name</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={courseInfo.name}
            onChange={handleNameChange}
            placeholder="Enter course name..."
            className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="courseDescription" className="block text-sm font-medium text-white mb-1">Course Description</label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            value={courseInfo.description}
            onChange={handleDescriptionChange}
            placeholder="Enter course description..."
            rows={4}
            className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="coursePrice" className="block text-sm font-medium text-white mb-1">Course Price</label>
          <input
            type="number"
            id="coursePrice"
            name="coursePrice"
            value={courseInfo.price}
            onChange={handlePriceChange}
            placeholder="Enter course price..."
            className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="estimatedPrice" className="block text-sm font-medium text-white mb-1">Estimated Price</label>
          <input
            type="number"
            id="estimatedPrice"
            name="estimatedPrice"
            value={courseInfo.estimatedPrice}
            onChange={handleEstimatedPriceChange}
            placeholder="Enter estimated price..."
            className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="courseTags" className="block text-sm font-medium text-white mb-1">Course Tags</label>
          <input
            type="text"
            id="courseTags"
            name="courseTags"
            value={courseInfo.tags}
            onChange={handleTagsChange}
            placeholder="Enter course tags (separated by comma)..."
            className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="row">
          <div className="mb-6">
            <label htmlFor="courseLevel" className="block text-sm font-medium text-white mb-1">Course Level</label>
            <input
              type="text"
              id="courseLevel"
              name="courseLevel"
              value={courseInfo.level}
              onChange={handleLevelChange}
              placeholder="Enter course level..."
              className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="demoUrl" className="block text-sm font-medium text-white mb-1">Demo URL</label>
            <input
              type="text"
              id="demoUrl"
              name="demoUrl"
              value={courseInfo.demoUrl}
              onChange={handleDemoUrlChange}
              placeholder="Enter demo URL..."
              className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Input file */}
          <div className="mb-6">
            <label htmlFor="thumbnail" className="block text-sm font-medium text-white mb-1">
              Thumbnail
            </label>
            <div
              className={`relative border border-dashed ${dragging ? " border-blue-400" : "border-gray-300"}rounded-md mb-2 cursor-pointer`}
              style={{ minHeight: "100px" }}
              onClick={() => document.getElementById('thumbnail')?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {courseInfo.thumbnail ? (
                <img
                  src={URL.createObjectURL(courseInfo.thumbnail)}
                  alt="Thumbnail"
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-400 text-sm">
                    Drag or drop your thumbnail here or click
                  </span>
                </div>
              )}
            </div>
            {/* Input file */}
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
