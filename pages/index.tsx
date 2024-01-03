
import Footer from '@components/common/Footer'
import Header from '@components/common/Header'
import MenuPanel from '@components/common/menuPanel'
import { Container, Grid } from '@mui/material'
// import Header from '@components/common/Header'
import React from 'react'
import Layout from '@components/common/Layout/layout'
import PrivateRoute from '@redux/ProtectedRoute/PrivateRoute'

const index = () => {
  return (
    <>
      <PrivateRoute>
        <Layout >
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>

              <div>
                <h1>Hello, World!</h1>
                <p>This is some content.</p>
              </div>
              <embed
                src="https://www.africau.edu/images/default/sample.pdf"
                type="application/pdf"
                width="100%"
                height="100%"
              />

            </Grid>

          </Grid>
        </Layout>
      </PrivateRoute>
      {/* <Layout />  */}
    </>
  )
}

export default index