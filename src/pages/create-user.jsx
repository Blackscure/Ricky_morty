/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  county: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
});

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const notify = (message, type) => {
  toast[type](message, toastConfig);
};

 

export default function createUserPage() {
  const router = useRouter();


  const [showPassword, setShowPassword] = useState(false);

  // Use the "use" prefix for the useFormik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      status: 'True',
      first_name: '',
      last_name: '',
      password: '',
      county: '',
      gender: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8000/apps/api/v1/authentication/register/', values);
        console.log('Registration successful:', response.data);

        toast(response.data.message, 'success');
        router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error);

        notify('Registration failed. Please check your details and try again.', 'error');
      }
    },
  });
  
  const goBack = () => {
    router.push('/create-user');
  }
  return (
    <Box>
     <ToastContainer />
    <Stack>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Create Users</Typography>

        <Button variant="contained" onClick={goBack} color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          Back
        </Button>
      </Stack>
      <hr />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={{ p: 5, width: '100%' }}>
          <Typography sx={{ mt: 2, mb: 5 }} variant="h4">Create Sales Persons</Typography>

        

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
               <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  name="first_name"
                  label="First Name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                  helperText={formik.touched.first_name && formik.errors.first_name}
                />

                <TextField
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                  helperText={formik.touched.last_name && formik.errors.last_name}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
               <TextField
                fullWidth
                name="email"
                label="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                fullWidth
                select
                label="Gender"
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>

              </Stack>

               <Stack direction="row" spacing={2}>
               <TextField
                fullWidth
                select
                label="Region"
                id="county"
                name="county"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <MenuItem value="nairobi">Nairobi</MenuItem>
                <MenuItem value="mombasa">Mombasa</MenuItem>
              </TextField>

              <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}  // Updated this line
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

              </Stack>

              
             

              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={formik.handleSubmit}
                loading={formik.isSubmitting}
                sx={{
                  width: '180px', // Set width to auto to reduce the width
                  margin: 'auto',
                  mt: 2, // Add some margin at the top for spacing
                }}
              >
                {formik.isSubmitting ? 'Please wait...' : 'Create Account'}
              </LoadingButton>

            </Stack>
          </form>
        </Card>
      </Stack>
      

    </Stack>
    </Box>
    
  )
}
