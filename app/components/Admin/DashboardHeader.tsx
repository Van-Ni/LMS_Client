import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    ListItemText,
    Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';


const DashboardHeader = () => {
    // Define the Notification type
    type Notification = {
        title: string;
        description: string;
        status: 'unread' | 'read';
        date: string; // You can use Date objects or strings for dates
    };

    // Generate fake notification data
    const generateFakeNotifications = (): Notification[] => {
        const notifications: Notification[] = [];

        for (let i = 1; i <= 10; i++) {
            notifications.push({
                title: `Notification ${i}`,
                description: `This is notification number ${i}`,
                status: i % 2 === 0 ? 'unread' : 'read', // Example: Mark every even notification as unread
                date: new Date().toLocaleDateString(), // Example: Use today's date as the notification date
            });
        }

        return notifications;
    };

    // Example usage:
    const notificationList: Notification[] = generateFakeNotifications();
    console.log(notificationList);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{backgroundColor: "rgb(15 23 42 / var(--tw-bg-opacity)) !important"}}>
            <Toolbar>
                <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6" style={{ fontWeight: 'bold', letterSpacing: 1 }}>Your Dashboard</Typography>
                </div>
                <div>
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {notificationList.map((notification, index) => (
                            <MenuItem key={index} onClick={handleMenuClose} style={{ width: 300 }}>
                                <ListItemText
                                    primary={notification.title}
                                    secondary={
                                        <React.Fragment>
                                            <Typography component="span" variant="body2" sx={{ display: 'block', fontWeight: 'bold' }}>
                                                {notification.description}
                                            </Typography>
                                            <Typography component="span" variant="body2" sx={{ display: 'block', color: notification.status === 'unread' ? 'primary.main' : 'text.secondary' }}>
                                                {notification.status}
                                            </Typography>
                                            <Typography component="span" variant="body2" sx={{ display: 'block', color: 'text.secondary' }}>
                                                {notification.date}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default DashboardHeader;
