import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUpload from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { Box, Link } from '@mui/material';

function FeaturedPost(props) {
  const { moduleInfo, handleDeploy } = props;

  /**
   * 배포 버튼 클릭 핸들러
   * @param {*} e
   */
  const handleClickDeploy = async (serverType) => {
    try {
      handleDeploy(serverType);
      // const response = await axios.get('', {
      //   params: {},
      // });
    } catch {}
  };
  
  useEffect(() => {
    (async () => {
      try {
        const [frontDeployStatus, backDeployStatus] = await Promise.all([
          axios.post(`${process.env.REACT_APP_DEVSERVER_MANAGER_URL}`, {
            module: moduleInfo.description,
            target: 'frontend',
          }),
          axios.post(`${process.env.REACT_APP_DEVSERVER_MANAGER_URL}`, {
            module: moduleInfo.description,
            target: 'backend',
          }),
        ]);
        // setDeployStatus({frontDeployStatus, backDeployStatus, error: {}});
      } catch (error) {
        // <Alert severity='error'>
        //   {error?.response?.data?.error}
        // </Alert>

        // setDeployStatus({
        //   ...deployStatus,
        //   error
        // });

        // console.log(error?.response?.data?.error);
        console.log(error?.response);
        console.debug(error?.response);
      }
    })();
  }, []);

  return (
    <Grid item xs={12} md={12} lg={6}>
      <Card sx={{ display: 'flex', height: 170, backgroundColor: 'grey.50' }}>
        {/* //#region1: Title & Link To Gitlab */}
        <CardContent sx={{ flex: 1 }}>
          <Typography
            component='h5'
            variant='h4'
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>{moduleInfo.title}</Box>
            <Box>
              <Link
                target='_blank'
                href={`${process.env.REACT_APP_GITLAB_URL}/microfront/klago-ui-${moduleInfo.description}-micro`}
                rel='noopener'
                underline='none'
                variant='body2'
              >
                Front GitLab
              </Link>
              &nbsp;&nbsp;
              <Link
                target='_blank'
                href={`${process.env.REACT_APP_GITLAB_URL}/KLAGO/klago-backend-${moduleInfo.description}`}
                rel='noopener'
                underline='none'
                variant='body2'
              >
                Back GitLab
              </Link>
            </Box>
          </Typography>
          {/* //#endregion1 */}

          {/* //#region2: Deploy Status */}
          <Typography variant='body1'>{'개발서버관리자 페이지에서 배포 상태 정보 표시 예정'}</Typography>
          <br />
          {/* //#endregion2  */}

          {/* //#region3: Deploy Button */}
          <Typography variant='body1' color='primary'>
            <LoadingButton
              loading={ moduleInfo.frontendBuildStatus || moduleInfo.frontendDeployStatus}
              disabled={moduleInfo.frontendBuildStatus || moduleInfo.frontendDeployStatus}
              loadingPosition='start'
              startIcon={<CloudUpload />}
              variant='contained'
              component='a'
              href='#'
              onClick={() =>
                handleDeploy({ key: moduleInfo.key, module: moduleInfo.description, target: 'frontend' })
              }
            >
              {moduleInfo.frontendBuildStatus ? 'Front 빌드중' : moduleInfo.frontendDeployStatus ? 'Front 배포중' : 'Front 배포'}
            </LoadingButton>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <LoadingButton
              loading={moduleInfo.backendBuildStatus || moduleInfo.backendDeployStatus}
              disabled={moduleInfo.backendBuildStatus || moduleInfo.backendDeployStatus}
              loadingPosition='start'
              startIcon={<CloudUpload />}
              variant='contained'
              component='a'
              href='#'
              onClick={() =>
                handleDeploy({ key: moduleInfo.key, module: moduleInfo.description, target: 'backend' })
              }
            >
              {moduleInfo.backendBuildStatus ? 'Back 빌드중' : moduleInfo.backendDeployStatus ? 'Back 배포중' : 'Back 배포'}
            </LoadingButton>
          </Typography>
          {/* //#endregion3  */}
        </CardContent>

        {/* //#region4: Side Image */}
        <CardMedia
          component='img'
          sx={{ width: 140, display: { xs: 'none', sm: 'block' } }}
          image={moduleInfo.image}
          alt={moduleInfo.imageLabel}
        />
        {/* //#endregion4  */}
      </Card>
    </Grid>
  );
}

const afterLoading = () => {};

FeaturedPost.propTypes = {
  moduleInfo: PropTypes.shape({
    key: PropTypes.number.isRequired,
    frontendBuildStatus: PropTypes.bool.isRequired,
    frontendDeployStatus: PropTypes.bool.isRequired,
    backendBuildStatus: PropTypes.bool.isRequired,
    backendDeployStatus: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  handleDeploy: PropTypes.func.isRequired
};

export default FeaturedPost;
