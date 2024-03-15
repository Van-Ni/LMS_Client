import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

type Props = {
    active: number;
    setActive: (active: number) => void;
};

const CourseOptions: React.FC<Props> = ({ active, setActive }) => {
    const steps = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview",
    ];
    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper orientation="vertical" activeStep={active} >
                {steps.map((label) => (
                    <Step key={label} sx={{
                        "& .MuiStepLabel-label": {
                            color: "#fff !important"
                        }
                    }}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default CourseOptions;
