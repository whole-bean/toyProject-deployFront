import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUpload from '@mui/icons-material/CloudUpload';

interface FeaturedPostProps {
  post: {
    deployStatus: boolean;
    description: string;
    image: string;
    imageLabel: string;
    title: string;
  };
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
        <Card sx={{ display: 'flex'}}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <br/>
            <Typography variant="subtitle1" color="primary">
              <LoadingButton
                loading={post.deployStatus}
                loadingPosition="start"
                startIcon={<CloudUpload />}
                variant="contained"
                component="a" href="#"
              >
                {post.deployStatus ? "배포" : "배포중"}
              </LoadingButton>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
    </Grid>
  );
}
