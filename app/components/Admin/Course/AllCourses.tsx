import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, LinearProgress } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { MdOutlineEdit } from "react-icons/md";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { format } from 'timeago.js';
// Define the type for props
type Props = {
};

// Functional component AllCourses
const AllCourses: React.FC<Props> = (props) => {
    const { data, isLoading, error } = useGetAllCoursesQuery({});
    console.log('🚀 ~ data:', data)
    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.2
        },
        {
            field: "name",
            headerName: "Course Title",
            flex: 1,

        },
        {
            field: "ratings",
            headerName: "Ratings",
            flex: 0.5
        },
        {
            field: "purchased",
            headerName: "Purchased",
            flex: 0.5
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 0.5,
            valueFormatter: ({ value }: any) => {
                return format(value,'vi');
            }
        },
        {
            field: "",
            headerName: "Actions",
            flex: 0.3,
            renderCell: (params: any) => (
                <>
                    <Button sx={{ fontSize: '20px' }}>
                        <MdOutlineEdit className="text-white" />
                    </Button>
                    <Button sx={{ fontSize: '20px' }}>
                        <AiOutlineDelete className="text-red-500" />
                    </Button>
                </>
            )
        }
    ];
    const rows = [
        { id: 1, title: "Course 1", ratings: 4.5, purchased: true, createdAt: "2023-01-15" },
        { id: 2, title: "Course 2", ratings: 4.2, purchased: false, createdAt: "2023-02-20" },
        { id: 3, title: "Course 3", ratings: 4.7, purchased: true, createdAt: "2023-03-10" },
        { id: 4, title: "Course 1", ratings: 4.5, purchased: true, createdAt: "2023-01-15" },
        { id: 5, title: "Course 2", ratings: 4.2, purchased: false, createdAt: "2023-02-20" },
        { id: 6, title: "Course 3", ratings: 4.7, purchased: true, createdAt: "2023-03-10" },
        { id: 7, title: "Course 1", ratings: 4.5, purchased: true, createdAt: "2023-01-15" },
        { id: 8, title: "Course 2", ratings: 4.2, purchased: false, createdAt: "2023-02-20" },
        { id: 9, title: "Course 3", ratings: 4.7, purchased: true, createdAt: "2023-03-10" },
        { id: 10, title: "Course 1", ratings: 4.5, purchased: true, createdAt: "2023-01-15" },
        { id: 11, title: "Course 2", ratings: 4.2, purchased: false, createdAt: "2023-02-20" },
        { id: 12, title: "Course 3", ratings: 4.7, purchased: true, createdAt: "2023-03-10" },
        // Add more rows as needed
    ];

    if (isLoading) return (<LinearProgress />);

    return (
        <Box sx={{ height: "90vh", width: '100%' }}>
            <DataGrid
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                        outline: "none",
                        color: "dark",
                    },
                    "& .MuiDataGrid-sortIcon": {
                        color: "dark",
                    },
                    "& .MuiDataGrid-row": {
                        color: "dark",
                        borderBottom: "dark" ? "1px solid #ffffff30 !important" : "1px solid #ccc !important",
                    },
                    "& .MuiTablePagination-root": {
                        color: "dark",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column-cell": {
                        color: "dark" ? "#fff" : "#000",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#3e4396",
                        color: "#fff",
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#1F2A40",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        color: "#fff",
                        borderTop: "none",
                        backgroundColor: "#1F2A40"
                    },
                    "& .MuiCheckbox-root": {
                        color: '#b7ebde !important',
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: '#fff !important',
                    },
                    "& .MuiToolbar-root": {
                        color: '#fff !important',
                    },
                    "& .MuiButtonBase-root": {
                        color: '#fff !important',
                    },
                    color: '#fff !important',
                }}
                rows={data?.courses.length > 0 ? data?.courses : []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default AllCourses;
