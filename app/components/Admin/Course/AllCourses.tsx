import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { MdOutlineEdit } from "react-icons/md";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { format } from 'timeago.js';
import toast from "react-hot-toast";
// Define the type for props
type Props = {
};

// Functional component AllCourses
const AllCourses: React.FC<Props> = (props) => {
    const { data, isLoading, error, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteCourse, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteCourseMutation();

    useEffect(() => {
        if (deleteSuccess) {
            refetch();
            toast.success("Course delete successfully");
        }
        if (deleteError) {
            if ("data" in deleteError) {
                const errorData = deleteError as any;
                toast.error(errorData.data.message);
            }
        }
        setDeleteDialogOpen(false);
    }, [deleteSuccess, deleteError]);

    const handleOpenDeleteDialog = (itemId: any) => {
        setDeleteItemId(itemId);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteItemId(null);
        setDeleteDialogOpen(false);
    };

    const handleConfirmDelete = async () => {
        // Call your delete function here
        await deleteCourse({ id: deleteItemId });
        handleCloseDeleteDialog();
    };
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
                return format(value, 'vi');
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
                    <Button sx={{ fontSize: '20px' }} onClick={() => handleOpenDeleteDialog(params.row._id)}>
                        <AiOutlineDelete className="text-red-500" />
                    </Button>
                </>
            )
        }
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
            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this item?</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AllCourses;
