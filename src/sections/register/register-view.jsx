/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast, ToastContainer } from 'react-toastify';

import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

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

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export default function RegisterView() {
  const theme = useTheme();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      is_admin: 'True',
      first_name: '',
      last_name: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8000/apps/api/v1/authentication/register/', values);
        console.log('Registration successful:', response.data);
    
        toast(response.data.message, 'success'); // Use the message from the API response
        router.push('/login'); // Redirect to the dashboard or login page
      } catch (error) {
        console.error('Registration failed:', error);
    
        notify('Registration failed. Please check your details and try again.', 'error');
      }
    },
    
  });

  return (
    <Box sx={{ ...bgGradient({ color: alpha(theme.palette.background.default, 0.9), imgUrl: '/assets/background/overlay_4.jpg' }), height: 1 }}>
      <ToastContainer />
      <Logo sx={{ position: 'fixed', top: { xs: 16, md: 24 }, left: { xs: 16, md: 24 } }} />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
          <Typography variant="h4">Create Account</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Have an account?
            <Button variant="text" onClick={() => router.push('/login')}>
              <Link variant="subtitle2" sx={{ ml: 0.5 }}>
                Login
              </Link>
            </Button>
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
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


          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting} // Set loading to isSubmitting
          >
            {formik.isSubmitting ? 'Please wait...' : 'Create Account'}
          </LoadingButton>

            </Stack>
          </form>
        </Card>
      </Stack>

      
    </Box>
  );
}
