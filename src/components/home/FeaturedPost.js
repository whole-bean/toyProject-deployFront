import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUpload from '@mui/icons-material/CloudUpload';
import axios from 'axios';

function FeaturedPost(props) {
  const { post, isDeploying, handleDeploy } = props;

  /**
   * 배포 버튼 클릭 핸들러
   * @param {*} e
   */
  const handleClickDeploy = async (e) => {
    try {
      handleDeploy();

      // const response = await axios.get('', {
      //   params: {},
      // });
    } catch {}
  };

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: 'flex', height: 100, backgroundColor: 'grey.50' }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component='h1' variant='h5'>
            {post.title}
          </Typography>
          <Typography variant='subtitle1' color='primary'>
            <LoadingButton
              spacing={4}
              loading={!post.deployStatus}
              disabled={isDeploying}
              loadingPosition='start'
              startIcon={<CloudUpload />}
              variant='contained'
              component='a'
              href='#'
              onClick={handleClickDeploy}
            >
              {post.frontDeployStatus ? 'Front 배포' : 'Front 배포중'}
            </LoadingButton>
            <LoadingButton
              loading={!post.deployStatus}
              disabled={isDeploying}
              loadingPosition='start'
              startIcon={<CloudUpload />}
              variant='contained'
              component='a'
              href='#'
              onClick={handleClickDeploy}
            >
              {post.backDeployStatus ? 'Back 배포' : 'Back 배포중'}
            </LoadingButton>
          </Typography>
        </CardContent>
        <CardMedia
          component='img'
          sx={{ width: 100, display: { xs: 'none', sm: 'block' } }}
          image={post.image}
          alt={post.imageLabel}
        />
      </Card>
    </Grid>
  );
}

const afterLoading = () => {};

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    deployStatus: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
