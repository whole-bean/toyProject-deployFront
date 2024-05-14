import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from '../../components/home/MainFeaturedPost';
import FeaturedPost from '../../components/home/FeaturedPost';
import Footer from '../../components/home/Footer';
import Message from '../../Message';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io.connect(process.env.REACT_APP_MY_DEPLOY_SERVER_URL);

const randomTmi = [
  <>
    민준씨가 등산을 좋아하는 이유는
    <br />
    자기보다 등산 못타는 사람의
    <br />
    힘들어하는 얼굴을 보면 희열을 느끼기 때문이다.
  </>,
  <>용민씨는 고중량 운동할 때도 웃으면서 한다.</>,
  <>
    재웅 선임님이 출근 후에 얼굴이 발그레해져
    <br />
    있다면 아침에 벤치 프레스 치다가
    <br />
    얼굴에 실핏줄이 터진거다.
  </>,
  <>
    이 배포서버 만든놈은 한 때 회사 15층을
    <br />
    비상계단으로 전속력으로 뛰어서 출근했다.
  </>,
  <>
    예솔씨는 여사원들을 팔씨름으로
    <br />
    서열정리했다.
  </>,
  <>
    송화씨는 양고기 전문점에 가서
    <br />
    구운 마늘만 먹는다.
  </>,
];

const mainFeaturedPost = {
  title: (
    <p>
      배포 서버 이름
      <br />
      추천 받습니다.
    </p>
  ),
  description: <p>TMI: {randomTmi[Math.floor(Math.random() * randomTmi.length)]}</p>,
  image: 'https://source.unsplash.com/random/?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const defaultTheme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", sans-serif',
  },
});

export default function Home() {
  const [moduleInfos, setModuleInfos] = useState([
    {
      key: 0,
      title: 'Logis',
      frontendBuildStatus: false,
      frontendDeployStatus: false,
      backendBuildStatus: false,
      backendDeployStatus: false,
      description: 'logis',
      image: 'https://source.unsplash.com/random/?wallpapers',
      imageLabel: 'logis',
    },
    {
      key: 1,
      title: 'Purchase',
      frontendBuildStatus: false,
      frontendDeployStatus: false,
      backendBuildStatus: false,
      backendDeployStatus: false,
      description: 'purchase',
      image: 'https://source.unsplash.com/random/?wallpapers',
      imageLabel: 'purchase',
    },
    {
      key: 2,
      title: 'Production',
      frontendBuildStatus: false,
      frontendDeployStatus: false,
      backendBuildStatus: false,
      backendDeployStatus: false,
      description: 'production',
      image: 'https://source.unsplash.com/random/?wallpapers',
      imageLabel: 'production',
    },
    {
      key: 3,
      title: 'LogisCustom',
      frontendBuildStatus: false,
      frontendDeployStatus: false,
      backendBuildStatus: false,
      backendDeployStatus: false,
      description: 'logiscustom',
      image: 'https://source.unsplash.com/random/?wallpapers',
      imageLabel: 'logiscustom',
    },
  ]);
  const [apiList, setApiList] = useState({
    commonParam: (module, target) => {
      return { module, target };
    },
    // build: { api: `${process.env.REACT_APP_MY_DEPLOY_SERVER_URL}/build` },
    // depoly: { api: `${process.env.REACT_APP_MY_DEPLOY_SERVER_URL}/deploy` },
  });

  useEffect(() => {
    socket.on('build', (buildResponse) => {
      if (buildResponse?.data.state === 0) {
        // setBuildStatus({ moduleInfos, key, target }, false);
        // setDeployStatus({ moduleInfos, key, target }, true);
        // socket.emit('deploy', apiList.commonParam(module, target));
      }
    });
    socket.on('deploy', (deployResponse) => {
      console.log(deployResponse);
      // setDeployStatus({ moduleInfos, key, target }, false);
    });
    socket.on('error', (errorType) => {
      // let msg = Message.deployFail;
      // switch (errorType) {
      //   case 'build':
      //     msg = Message.buildFail;
      //     setBuildStatus({ moduleInfos, key, target }, false);
      //   default:
      //     msg = Message.deployFail;
      //     setDeployStatus({ moduleInfos, key, target }, false);
      // }
      // console.log(error?.response);
      // console.debug(error?.response);
      // alert(msg);
    });
  }, []);

  const handleDeploy = async (e) => {
    try {
      const { key, module, target } = e;
      console.log(e);
      if (module === 'logiscustom') {
        alert('logisCustom은 아직 개발 중입니다..! (>_<) ');
        return;
      }
      setBuildStatus({ moduleInfos, key, target }, true);
      socket.emit('build', apiList.commonParam(module, target));

      // setIsDeploying(!isDeploying);

      // const copy = [...moduleInfo];
      // copy[index][`${serverType}DeployStatus`] = !moduleInfo[index][`${serverType}DeployStatus`];
      // setModuleInfo(copy);
    } catch (error) {
      // <Alert severity='error'>
      //   {error?.response?.data?.error}
      // </Alert>
      // setDeployStatus({
      //   ...deployStatus,
      //   error
      // });
      // console.log(error?.response?.data?.error);
    }
  };

  const setBuildStatus = ({ moduleInfos, key, target }, value) => {
    const moduleInfos_ = [...moduleInfos];
    moduleInfos_[key][`${target}BuildStatus`] = value;
    setModuleInfos(moduleInfos_);
  };

  const setDeployStatus = ({ moduleInfos, key, target }, value) => {
    const moduleInfos_ = [...moduleInfos];
    moduleInfos_[key][`${target}DeployStatus`] = value;
    setModuleInfos(moduleInfos_);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4} pt={2} pb={2}>
            {moduleInfos.map((moduleInfo) => {
              return <FeaturedPost moduleInfo={moduleInfo} handleDeploy={handleDeploy} />;
            })}
          </Grid>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
