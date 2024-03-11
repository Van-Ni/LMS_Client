import React, { FC } from 'react';
import { Modal, Box } from '@mui/material';

type Props = {
    open: boolean;
    onSetOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    onSetRoute?: (route: string) => void;
};

const CustomModal: FC<Props> = ({ open, onSetOpen, onSetRoute, component: Component }) => {
    return (
        <Modal open={open} onClose={() => onSetOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white',
                    borderRadius: '8px',
                    p: 4, // padding 16px
                    outline: 'none',
                    width: "400px"
                }}
            >
                {/* Content of your modal */}
                <Component onSetRoute={onSetRoute}/>
            </Box>
        </Modal>
    );
};

export default CustomModal;
