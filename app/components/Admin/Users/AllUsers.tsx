import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { MdOutlineEdit } from "react-icons/md";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { format } from 'timeago.js';
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import { MdOutlineMail } from "react-icons/md";
import toast from "react-hot-toast";
// Define the type for props
type Props = {
    isTeam: boolean;
};

// Functional component AllCourses
const AllUsers: React.FC<Props> = ({ isTeam }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

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
        await deleteUser({ id: deleteItemId });
        handleCloseDeleteDialog();
    };
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
    const { data, isLoading, error, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
    const [deleteUser, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteUserMutation();


    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success("User update successfully");
        }
        if (deleteSuccess) {
            refetch();
            toast.success("User delete successfully");
        }
        if (updateError) {
            if ("data" in updateError) {
                const errorData = updateError as any;
                toast.error(errorData.data.message);
            }
        }
        if (deleteError) {
            if ("data" in deleteError) {
                const errorData = deleteError as any;
                toast.error(errorData.data.message);
            }
        }
        setDialogOpen(false);
    }, [updateError, isSuccess, deleteSuccess, deleteError]);


    let columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.2
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,

        },
        {
            field: "email",
            headerName: "Email",
            flex: 0.5
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5
        },
        {
            field: "courses",
            headerName: "Purchased Courses",
            flex: 0.5,
            valueFormatter: ({ value }: any) => {
                return value.length;
            }
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
            field: " ",
            headerName: "Email",
            flex: 0.3,
            renderCell: (params: any) => (
                <>
                    {console.log(params)}
                    <Button sx={{ fontSize: '20px' }}>
                        <a href={`mailto:${params.row.email}`}>
                            <MdOutlineMail className="text-white" />
                        </a>
                    </Button>
                </>
            )
        },

    ];
    let columnsIsTeam = [
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
    ]
    if (!isTeam) {
        columns.push(...columnsIsTeam);
    }

    const handleAddMember = async () => {
        await updateUserRole({ email, role });
    }

    if (isLoading) return (<LinearProgress />);

    return (
        <Box sx={{ height: "90vh", width: '100%' }}>
            {isTeam && (
                <div className="flex justify-end">
                    <button
                        onClick={handleOpenDialog}
                        type="submit"
                        className="bg-indigo-500 my-2 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Add New Member
                    </button>
                </div>
            )}

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
                rows={data?.users.length > 0 ? data?.users.filter((user: any) => {
                    if (isTeam) {
                        return user.role === "admin"
                    }
                    return user;
                }) : []}
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
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                        />
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="role-select-label">Role</InputLabel>
                            <Select
                                labelId="role-select-label"
                                id="role-select"
                                value={role}
                                label="Role"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem value={'admin'}>Admin</MenuItem>
                                <MenuItem value={'user'}>User</MenuItem>
                                {/* Add other roles as needed */}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleAddMember} variant="contained" color="primary">Add</Button>
                </DialogActions>
            </Dialog>
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

export default AllUsers;
