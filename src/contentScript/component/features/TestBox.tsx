import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TestBox = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
        >
            <Paper
                sx={{
                    width: '600px',
                    height: '400px',
                    p: 6,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    pointerEvents: 'auto',
                }}
            >
                <Typography variant="h1" gutterBottom>
                    Test Box
                </Typography>
                <Typography variant="subtitle1">
                    This is a centered box for testing the overlay.
                </Typography>
            </Paper>
        </Box>
    );
};

export default TestBox;
