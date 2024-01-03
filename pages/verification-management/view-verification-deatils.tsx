import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Grid, Box, useTheme } from '@mui/material';
import PrivateRoute from '@redux/ProtectedRoute/PrivateRoute'
import { getKycVerification, statusChangesVerification } from '@redux/Redux/Actions';
import Layout from '@components/common/Layout/layout'
import PaperContainer from '@components/common/PaperContainer'
import LayoutHeader from '@components/common/layoutHeader'
import ErrorHandler from '@components/common/errorHandler';
import TextLabel from '@components/common/commonTextLabel';
import Assets from '@components/common/image_container';
import MUIButton from '@components/common/commonButton';
import { tostify } from '@components/common/tostify';
import { BASE_URL_UPLOAD } from '@redux/Api/AuthApi';

const ViewVerificationDeatils = () => {
    //hook
    const theme = useTheme()
    const router = useRouter();
    const dispatch = useDispatch()
    const { verificationId }: any = router.query

    //state
    const [userManagementDetails, setUserManagementDetails] = React.useState<any>([]);
    console.log(verificationId, "verificationId", userManagementDetails);
    const matchingUser = userManagementDetails.filter((row: { _id: string }) => row._id === verificationId)?.[0];
    console.log(matchingUser, "verificationId**");

    useEffect(() => {
        _getUserDetails()
    }, [])
    const _getUserDetails = async () => {
        try {
            let body = {
                "page": 1,
                "limit": 500000
            }
            const result = await dispatch(getKycVerification(body));
            const error = ErrorHandler(result)
            if (error) {
                setUserManagementDetails(result?.payload?.data?.kyc_verification_data)
            }
        } catch (error) {
            return error
        }
    }
    const _statusChangesRequest = async (item: any, status: any) => {
        try {
            const result = await dispatch(statusChangesVerification({
                "id": item?._id,
                "status": status,

            }));
            const error = ErrorHandler(result)
            if (error) {
                tostify(result?.payload?.message, "success")
                // _getUserDetails()
                router.push('/verification-management')

            }
        } catch (error) {
            tostify("Something went wrong!", "error")
        }
    }
    return (
        <PrivateRoute>
            <Layout>
                <PaperContainer bodyPadding="0px" >
                    <LayoutHeader type="Verification Management" />
                    <Box sx={{ p: 2 }}>
                        <TextLabel marginBottom={12} variant="subtitle2" fontWeight="600" title={"Traders"} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextLabel variant="body1" fontWeight="500" title={"First Name"} />
                                <TextLabel variant="body1" title={matchingUser?.firstName} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextLabel variant="body1" fontWeight="500" title={"Middle Name"} />
                                <TextLabel variant="body1" title={matchingUser?.middleName} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextLabel variant="body1" fontWeight="500" title={"Surname Name"} />
                                <TextLabel variant="body1" title={matchingUser?.surname} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextLabel variant="body1" fontWeight="500" title={"Date of Birth"} />
                                <TextLabel variant="body1" title={matchingUser?.dob} />
                            </Grid>
                        </Grid>
                        <TextLabel marginTop={24} marginBottom={12} variant="subtitle2" fontWeight="600" title={"Address"} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextLabel variant="body1" fontWeight="500" title={"Street,house/building number"} />
                                <TextLabel variant="body1" title={matchingUser?.street} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextLabel variant="body1" fontWeight="500" title={"City"} />
                                <TextLabel variant="body1" title={matchingUser?.city} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextLabel variant="body1" fontWeight="500" title={"Zipcode (Post Code)"} />
                                <TextLabel variant="body1" title={matchingUser?.zipcode} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextLabel variant="body1" fontWeight="500" title={"Country"} />
                                <TextLabel variant="body1" title={matchingUser?.country} />
                            </Grid>
                        </Grid>
                        <TextLabel marginTop={24} marginBottom={12} variant="subtitle2" fontWeight="600" title={"Personal / Company Credentials"} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <TextLabel marginBottom={2} variant="body1" fontWeight="500" title={"Front side"} />
                                <Assets src={`${BASE_URL_UPLOAD}${matchingUser?.frontSideDoc}`} absolutePath={true} height='120px' width='220px' />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <TextLabel marginBottom={2} variant="body1" fontWeight="500" title={"Back side"} />
                                <Assets src={`${BASE_URL_UPLOAD}${matchingUser?.backSideDoc}`} absolutePath={true} height='120px' width='220px' />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <TextLabel marginBottom={2} variant="body1" fontWeight="500" title={"Selfie with you ID"} />
                                <Assets src={`${BASE_URL_UPLOAD}${matchingUser?.selfieDoc}`} absolutePath={true} height='120px' width='220px' />
                            </Grid>
                        </Grid>
                        <TextLabel marginTop={24} marginBottom={12} variant="subtitle2" fontWeight="600" title={"We'd love to know you more"} />
                        <Grid container spacing={2}>
                            {matchingUser?.step4QuestionsList?.map((ques: any, index: number) => {
                                return <Grid item xs={12} key={index}>
                                    {ques?.type === 'file' ? (
                                        <Box display={'flex'} flexDirection={'column'}>
                                            <TextLabel variant='body1' fontWeight="500" title={ques?.text} />
                                            <TextLabel
                                                variant='body1'
                                                title={ques?.subText}
                                            />
                                            <Box display={'flex'} flexDirection={'column'}>
                                                <Box display={'flex'} gap={2}>
                                                    {ques?.answer &&
                                                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2} marginTop={2}>
                                                            <Assets src={`${BASE_URL_UPLOAD}${ques?.answer}`} absolutePath={true} height='100px' width='100px' style={{ border: `1px solid ${theme.palette.bgGray.main}`, borderRadius: '50%' }} />
                                                        </Box>
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <>
                                            <TextLabel
                                                variant='body1'
                                                fontWeight="500"
                                                title={ques?.text}
                                            />
                                            <TextLabel
                                                variant='body1'
                                                title={ques?.answer}
                                            />
                                        </>
                                    )}
                                </Grid>
                            })}
                        </Grid>
                        <TextLabel marginTop={24} marginBottom={12} variant="subtitle2" fontWeight="600" title={"Anything important we need to be aware of?"} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextLabel variant="body1" fontWeight="500" title={"Note"} />
                                <TextLabel variant="body1" title={matchingUser?.note} />
                            </Grid>
                        </Grid>
                        <TextLabel marginTop={24} marginBottom={12} variant="subtitle2" fontWeight="600" title={"Review and sign your Contract Agreement"} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <embed src="https://cdn.ftmo.com/docs/terms-and-conditions/gtc-global-2023-07-13-64afaaaddce66.pdf?v=83" type="application/pdf" width={'100%'} height="450px" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} flexWrap={"wrap"} marginTop={3} textAlign={"center"} justifyContent={"center"} gap={2} display={"flex"}>
                                <MUIButton
                                    fullWidth={true}
                                    height="42px"
                                    text={"Approve"}
                                    type="submit"
                                    onClick={() => _statusChangesRequest(matchingUser, 1)}
                                />
                                <MUIButton
                                    fullWidth={true}
                                    height="42px"
                                    variant="outlined"
                                    text={"Rejected"}
                                    type="submit"
                                    backgroundColor="#fff"
                                    border="1px solid"
                                    color="error"
                                    hoverBgColor="transparent"
                                    onClick={() => _statusChangesRequest(matchingUser, 2)}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </PaperContainer>
            </Layout>
        </PrivateRoute>
    )
}

export default ViewVerificationDeatils
