import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from '../../components/home/MainFeaturedPost';
import FeaturedPost from '../../components/home/FeaturedPost';
import Footer from '../../components/home/Footer';

const randomTmi = [
  <>민준씨가 등산을 좋아하는 이유는<br/>자기보다 등산 못타는 사람의<br/>힘들어하는 얼굴을 보면 희열을 느끼기 때문이다.</>,
  <>용민씨는 고중량 운동할 때도 웃으면서 한다.</>,
  <>재웅 선임님이 출근 후에 얼굴이 발그레해져<br/>있다면 아침에 벤치 프레스 치다가<br/>얼굴에 실핏줄이 터진거다.</>,
  <>이 배포서버 만든놈은 한 때 회사 15층을<br/>비상계단으로 전속력으로 뛰어서 출근했다.</>,
  <>예솔씨는 여사원들을 팔씨름으로<br/>서열정리했다.</>,
  <>송화씨는 양고기 전문점에 가서<br/>구운 마늘만 먹는다.</>,
];

const mainFeaturedPost = {
  title: <p>배포 서버 이름<br/>추천 받습니다.</p>,
  description:
    <p>TMI: {randomTmi[Math.floor(Math.random() * randomTmi.length)]}</p>,
  image: 'https://source.unsplash.com/random/?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Logis',
    deployStatus: true,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Purchase',
    deployStatus: false,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Production',
    deployStatus: false,
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?wallpapers',
    imageLabel: 'Image Text',
  },
];
const defaultTheme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4} pt={5} pb={7}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
