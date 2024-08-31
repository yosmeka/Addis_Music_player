
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import Card from '../components/card';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { primaryColor, backgroundColor, textColor, secondaryColor } from '../constants/colors'; // Import color constants


interface CoverImage {
  public_id: string;
  url: string;
}

interface Audio {
  public_id: string;
  url: string;
}

interface MusicListItem {
  coverImg: CoverImage;
  audio: Audio;
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const MainContainer = styled.div`
  flex: 1;
  padding-bottom: 40px;
  background-color: ${backgroundColor};
`;


const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;
`;

const ShowAllLink = styled(Link)`
  color: ${primaryColor};
  text-decoration: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 500; /* Adjusted to ensure visibility */
  transition: color 0.3s ease, text-decoration 0.3s ease; /* Ensure smooth transitions */

  &:hover {
    text-decoration: underline;
    color: ${primaryColor}CC; /* Slightly lighter color on hover */
  }

  &:focus {
    outline: 2px solid ${primaryColor}; /* Ensure focus visibility */
    outline-offset: 2px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Error = styled.div`
  color: #e35353;
  padding: 30px;
  margin: 20px 0;
  font-size: 1.5rem;
  text-align: center;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Home: React.FC = () => {
  const { data, loading, error } = useSelector((state: RootState) => state.music);

  if (loading) {
    return (
      <SpinnerContainer>
        <ClipLoader color="#1d72b8" loading={loading} size={100} />
      </SpinnerContainer>
    );
  }

  if (error) {
    return <Error>Oops! Something went wrong. Please try again later.</Error>;
  }

  if (!data) {
    return <Error>No data available</Error>;
  }

  const getRandomElements = (array: MusicListItem[], count: number) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const recentMusic = data.musicList.slice(0, 5);
  const remainingMusic = data.musicList.slice(5);
  const randomlyChosenMusic = getRandomElements(remainingMusic, 5);

  return (
    <MainContainer>
      <HomeContainer>
        <Header>
          <Title>Recent Music</Title>
          <ShowAllLink to="/music">Show All</ShowAllLink>
        </Header>
        <CardsContainer>
          {recentMusic.map((item) => (
            <Card
              key={item._id}
              id={String(item._id)}
              imageUrl={item.coverImg.url}
              title={item.title}
              artist={item.artist}
            />
          ))}
        </CardsContainer>
      </HomeContainer>
      <HomeContainer>
        <Header>
          <Title>Randomly Chosen Music</Title>
          <ShowAllLink to="/music">Show All</ShowAllLink>
        </Header>
        <CardsContainer>
          {randomlyChosenMusic.map((item) => (
            <Card
              key={item._id}
              id={String(item._id)}
              imageUrl={item.coverImg.url}
              title={item.title}
              artist={item.artist}
            />
          ))}
        </CardsContainer>
      </HomeContainer>
    </MainContainer>
  );
};

export default Home;
