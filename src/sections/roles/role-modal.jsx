/* eslint-disable react/prop-types */
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';  // Import Yup for validation
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';

const validationSchema = Yup.object({
  roleName: Yup.string().required('Role Name is required'),
  description: Yup.string().required('Description is required'),
});

const RoleModal = ({ open, handleCloseRole }) => {
  const formik = useFormik({
    initialValues: {
      roleName: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send the API request to create a new role
        const response = await fetch('http://localhost:8000/apps/api/v1/authentication/roles/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log('Role creation successful:', response.data);
          // Add any additional logic or state updates here on successful API response
        } else {
          console.error('Role creation failed:', response.statusText);
          // Handle the error or show a toast/message to the user
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
        handleCloseRole(); // Close the modal regardless of success or failure
      }
    },
  });

  return (
    <Modal open={open} onClose={handleCloseRole}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 0,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Role Name"
            name="roleName"
            value={formik.values.roleName}
            onChange={formik.handleChange}
            error={formik.touched.roleName && Boolean(formik.errors.roleName)}
            helperText={formik.touched.roleName && formik.errors.roleName}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleCloseRole}>
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ ml: 1 }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting && (
                <CircularProgress size={24} color="inherit" />
              )}
              {!formik.isSubmitting && 'Save'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default RoleModal;
