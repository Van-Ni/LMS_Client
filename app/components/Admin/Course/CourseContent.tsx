import React, { FC, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaPen } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import toast from 'react-hot-toast';
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({ courseContentData, setCourseContentData, active, setActive, handleSubmit }) => {
  // [false, false, false]
  const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false));
  const [activeSection, setActiveSection] = useState(0);

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed]; // Create a copy of the state array
    updatedCollapsed[index] = !updatedCollapsed[index]; // Toggle the collapse state at the specified index
    setIsCollapsed(updatedCollapsed); // Update the state with the modified array
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData]; // Create a copy of the state array
    updatedData[index].links.splice(linkIndex, 1); // Remove the link at the specified index
    setCourseContentData(updatedData); // Update the state with the modified array
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: '', url: '' });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    // Check if title and description are filled
    if (!item.title || !item.description || !item.videoUrl || !item.links[0].title || !item.links[0].url) {
      // Show a toast notification if title or description is empty
      toast.error("Please fill all the fields first!");
      return;
    }

    // Determine newVideoSection based on existing data
    let newVideoSection = '';
    if (courseContentData.length > 0) {
      const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;
      newVideoSection = lastVideoSection ? lastVideoSection : item.videoSection;
    }

    // Create new content object
    const newContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: newVideoSection,
      links: [{
        title: '',
        url: ""
      }],
    };

    // Update courseContentData state with the new content
    setCourseContentData([...courseContentData, newContent]);
  };

  const addNewSection = () => {
    const lastItem = courseContentData[courseContentData.length - 1];

    // Check if the last item has all fields filled
    if (!lastItem || !lastItem.title || !lastItem.description || !lastItem.videoUrl || !lastItem.links[0]?.title || !lastItem.links[0]?.url) {
      toast.error("Please fill all the fields first!");
      return;
    } else {
      // Create new content object
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{
          title: '',
          url: ""
        }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  function handleOptions(): void {
    const lastItem = courseContentData[courseContentData.length - 1];

    // Check if the last item has all fields filled
    if (!lastItem || !lastItem.title || !lastItem.description || !lastItem.videoUrl || !lastItem.links[0]?.title || !lastItem.links[0]?.url) {
      toast.error("Section can't be empty");
      return;
    } else {
      setActive(active + 1);
      handleSubmit();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div className={`w-[99%]  p-4 ${showSectionInput ? "mt-10" : "mb-0"} bg-[#1b326a59] ml-2`}>
                {showSectionInput && (
                  <div className="w-full flex items-center">
                    <input
                      type="text"
                      className={`text-[20px] ${item.videoSection ? 'w-[200px]' : 'w-min'} text-white font-Poppins cursor-pointer  bg-transparent outline-none`}
                      value={item.videoSection}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoSection = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                    <FaPen className="cursor-pointer text-white" />
                  </div>
                )}

                <div className="w-full flex items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="w-[100px] block text-sm font-medium text-white">{index + 1}. {item.title}</p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                    </>
                  )}
                  <div className="w-full flex items-center justify-end my-0">
                    <AiOutlineDelete
                      className={`text-white mr-2  ${index > 0 ? 'cursor-pointer' : 'cursor-no-drop'}`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData]; // Create a copy of the state array
                          updatedData.splice(index, 1); // Remove the item at the specified index
                          setCourseContentData(updatedData); // Update the state with the modified array
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className={`text-white `}
                      style={{
                        transform: isCollapsed[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                      onClick={() => handleCollapseToggle(index)} // Assuming handleCollapse is a function to handle collapse/expand
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className="block text-sm font-medium text-white mb-1" htmlFor={`planTitle${index}`}>
                        Video Title
                      </label>
                      <input
                        type="text"
                        id={`planTitle${index}`}
                        className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((item, idx) => {
                            if (idx === index) {
                              return { ...item, title: e.target.value };
                            }
                            return item;
                          });
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className="block text-sm font-medium text-white mb-1" htmlFor={`planTitle${index}`}>
                        Video Url
                      </label>
                      <input
                        type="text"
                        id={`planTitle${index}`}
                        className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={item.videoUrl}
                        onChange={(e) => {
                          setCourseContentData(prevCourseContentData => {
                            const updatedData = [...prevCourseContentData]; // Using previous state
                            updatedData[index].videoUrl = e.target.value;
                            return updatedData;
                          });
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className="block text-sm font-medium text-white mb-1" htmlFor={`videoDescription${index}`}>Description</label>
                      <textarea
                        className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        id={`videoDescription${index}`}
                        value={item.description}
                        onChange={(e) => {
                          setCourseContentData(prevCourseContentData => {
                            const updatedData = [...prevCourseContentData]; // Creating a copy of the previous state
                            updatedData[index].description = e.target.value; // Updating description property
                            return updatedData; // Returning the updated state
                          });
                        }}
                      />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3" key={linkIndex}>
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-white mb-1">
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`cursor-pointer  text-white ${linkIndex === 0 ? "cursor-not-allowed" : ""}`}
                            style={{ fontSize: "20px" }}
                            onClick={() => linkIndex !== 0 ? handleRemoveLink(index, linkIndex) : null}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Link title"
                          className="mb-3 appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={link.title}
                          onChange={(e) => {
                            setCourseContentData(prevCourseContentData => {
                              const updatedData = [...prevCourseContentData]; // Creating a copy of the previous state array
                              updatedData[index].links = [...updatedData[index].links]; // Create a copy of the links array
                              updatedData[index].links[linkIndex] = { ...updatedData[index].links[linkIndex] }; // Create a copy of the link object
                              updatedData[index].links[linkIndex].title = e.target.value; // Update the title of the link
                              return updatedData; // Returning the updated state
                            });
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Link URL"
                          className="appearance-none text-white bg-transparent border border-gray-300 rounded-md py-2 px-4 w-full leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={link.url}
                          onChange={(e) => {
                            setCourseContentData(prevCourseContentData => {
                              const updatedData = [...prevCourseContentData]; // Creating a copy of the previous state array
                              updatedData[index] = { ...updatedData[index] }; // Create a copy of the specific item object
                              updatedData[index].links = [...updatedData[index].links]; // Create a copy of the links array within the specific item
                              updatedData[index].links[linkIndex] = { ...updatedData[index].links[linkIndex] }; // Create a copy of the link object
                              updatedData[index].links[linkIndex].url = e.target.value; // Update the URL of the link
                              return updatedData; // Returning the updated state
                            });
                          }}
                        />
                        {/* add link button */}
                        <div className="mt-3 inline-block">
                          <p className="flex items-center text-[18px] text-white cursor-pointer" onClick={() => handleAddLink(index)}>
                            <CiLink className="mr-1" />
                            Add Link
                          </p>
                        </div>
                      </div>
                    ))}
                    <br />

                  </>
                )}

                <br />
                {index === courseContentData.length - 1 && (
                  <div className="flex items-center text-[18px] text-white cursor-pointer" onClick={(e: any) => newContentHandler(item)}>
                    <AiOutlinePlusCircle className="mr-1" />
                    Add New Content
                  </div>
                )}
              </div>
            </>
          )
        })}
        <br />
        <div className="flex items-center text-[20px] text-white cursor-pointer" onClick={() => addNewSection()}>
          <AiOutlinePlusCircle />
          Add New Section
        </div>

      </form>
      <div className="flex justify-end">
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

export default CourseContent;
