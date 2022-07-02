import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({ name, label, ...props }) => (
  <TextField
    sx={{ mb: 2 }}
    {...props}
    placeholder={label}
    label={label}
    name={name}
    variant='outlined'
    fullWidth
  />
);

export default TextInput;
