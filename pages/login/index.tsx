import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Grid, Link, Typography, Divider } from '@mui/material'
import Assets from "@components/common/image_container";
import SelectDropDown from '@components/common/selectDropDown';
import FullPageLayout from '@components/common/fullPageLayout';
import CommonTextField from '@components/common/commonTextField';
import OutlinedCheckbox from '@components/common/commonCheckBox';
import { useRouter } from 'next/router';
import MUIButton from '@components/common/commonButton';
import { useDispatch } from 'react-redux';
import { login } from '@redux/Redux/Actions';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { toast } from 'react-toastify';
import { setToken } from '@redux/Api/ClientHelper';
import TextLabel from '@components/common/commonTextLabel';
import { LOGIN_TOKEN, REFRESH_LOGIN_TOKEN } from '@redux/Api/AuthApi';
import { getJSDocReturnType } from 'typescript';

const languages = ['English', 'Hindi']
const validationSchema = Yup.object().shape({
    emailId: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isSubmitting, setSubmitting] = React.useState(false);
    // const [data, setData] = React.useState<any>({ language: languages[0], isRememberMe: false })
    const [data, setData] = React.useState<any>({});


    const roles = [{ name: "English", value: "0" }, { name: "Hindi", value: "1" }]

    const getDefaultValue = (options: any[], value: any) => {
        const foundOption = options.find((e: any) => e.value == value);
        if (foundOption) {
            return foundOption.name;
        }
    }


    const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
        console.log(values);
        setSubmitting(true);

        const body = {
            email: values.emailId,
            password: values.password,
        };
        try {
            const res = await dispatch(login(body));
            if (res?.payload?.status === 200) {
                toast.success('Login successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                localStorage.setItem('userData', JSON.stringify(res?.payload?.data))
                localStorage.setItem(LOGIN_TOKEN, res?.payload?.data?.token)
                localStorage.setItem(REFRESH_LOGIN_TOKEN, res?.payload?.data?.refresh_token)
                setToken(res?.payload?.data?.token)
                router.push('/dashboard');

            } else {
                toast.error('Incorrect email or password', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        setSubmitting(false);
    };
    return (
        <Grid container spacing={0} height={'100vh'}>
            <Grid xs={12} sm={12} md={12} lg={7} sx={{ backgroundColor: "#002734", alignItems: 'center', padding: '100px', position: 'relative' }} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'flex' }}>
                <Box>
                    <Assets src={"/assets/images/logo.png"} absolutePath={true} style={{ marginBottom: 25 }} />
                    <TextLabel color={"#FFFFFF"} title={"Work hand-in-hand to help clients launch and operate successful Proprietary Trading Firms"} />
                </Box>
                <Assets src={"/assets/images/login_vactor.png"} absolutePath={true} style={{ position: 'absolute', bottom: '0px', left: '0px' }} />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={5} sx={{ height: '100vh', overflow: 'auto', background: "#FFFFFF" }}>
                <Box height='100vh' display='flex' alignItems='center' justifyContent='center'>
                    <Box sx={{ width: { lg: '70%', md: '60%', sm: '70%', xs: "90%" } }} >
                        {/* <Box display={'flex'} justifyContent={'flex-end'} >
                            <SelectDropDown
                                width="120px"
                                values={roles || []}
                                name="role"
                                value={getDefaultValue(roles, data?.role)}
                                onChange={(e: any) => {
                                    setData({ ...data, role: e.target.value });

                                }}
                                valid
                            />
                        </Box> */}

                        <Grid item xs={12} marginTop={1}>
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                <Box display={'flex'} margin={'auto'} flexDirection={'column'} gap={3} width={"100%"} >
                                    <Box>
                                        <TextLabel fontSize={"32px"} color={"#333333"} fontWeight={"600"} title={"Hello Again!"} />
                                        <TextLabel fontSize={"18px"} color={"#333333"} title={"Welcome Back"} />
                                    </Box>
                                    <Formik
                                        initialValues={{
                                            emailId: '',
                                            password: '',
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ values, handleChange, handleBlur }) => (
                                            <Form>
                                                <Box display={'flex'} margin={'auto'} flexDirection={'column'} gap={2}>
                                                    <Box>
                                                        <CommonTextField
                                                            icon={<EmailOutlinedIcon sx={{ color: '#cdcdcd' }} />}
                                                            type="email"
                                                            placeholder="Email"
                                                            name="emailId"
                                                            valid
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            startAdornment={
                                                                <Assets src={"/assets/images/email_icon.svg"} absolutePath={true} width={'50px'} height={'25px'} />
                                                            }
                                                        />
                                                        <ErrorMessage name="emailId">
                                                            {msg => <TextLabel variant="body2" color={"red"} title={msg} />}
                                                        </ErrorMessage>
                                                    </Box>
                                                    <Box>
                                                        <CommonTextField
                                                            icon={<HttpsOutlinedIcon sx={{ color: '#cdcdcd' }} />}
                                                            width={'100%'}
                                                            type="password"
                                                            placeholder="Password"
                                                            name="password"
                                                            value={data?.password}
                                                            valid
                                                            showPasswordToggle
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}

                                                            startAdornment={
                                                                <Assets src={"/assets/images/lock_icon.svg"} absolutePath={true} width={'50px'} height={'25px'} />
                                                            }
                                                        />
                                                        <ErrorMessage name="password">
                                                            {msg => <TextLabel variant="body2" color={"red"} title={msg} />}
                                                        </ErrorMessage>
                                                    </Box>
                                                </Box>
                                                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                                    <OutlinedCheckbox
                                                        color={"#333333"}
                                                        label={"Remember Me"}
                                                        name={'isRememberMe'}
                                                        handleSelect={(e: any) =>
                                                            (e: any) => setData({ ...data, isRememberMe: !data?.isRememberMe })
                                                        }
                                                        value={data?.isRememberMe}
                                                    />
                                                    {/* <Link
                                                        component="button"
                                                        variant="body2"
                                                        // onClick={() => {
                                                        //     router.push('/forget-password')
                                                        // }}
                                                        sx={{ textDecorationColor: "#333", fontSize: '14px', color: '#333333' }}
                                                    // underline='hover'
                                                    >
                                                        Forgot Password?
                                                    </Link> */}
                                                </Box>
                                                <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "40px" }}>
                                                    <MUIButton
                                                        fullWidth={true}
                                                        height="42px"
                                                        width="100%"
                                                        text="Login"
                                                        type="submit"
                                                    />
                                                </Box>
                                            </Form>
                                        )}
                                    </Formik>
                                </Box>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login