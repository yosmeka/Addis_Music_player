
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import styled from '@emotion/styled';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { parseISO } from 'date-fns';
import { primaryColor, backgroundColor, textColor, secondaryColor } from '../constants/colors'; // Import color constants


const COLORS = ['#56CCF2', '#2F80ED', '#F2994A', '#F2C94C', '#6FCF97', '#BB6BD9', '#EB5757', '#27AE60', '#9B51E0'];

const PageContainer = styled.div`
  color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  max-width: 1200px;
  margin: 20px auto;
  background-color: ${backgroundColor};
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
`;

const StyledHeader = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  transition: color 0.3s;

`;

const StyledSubHeader = styled.h3`
  font-size: 1.8rem;
  color: #2D3748;
  text-align: center;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background-color: ${primaryColor};
  padding: 25px; /* Increased padding for better spacing */
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 260px; /* Slightly wider for better content fit */
  margin: 10px;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    transform: translateY(-5px);
    background-color:#1ee0c9;
  }
`;

const StatLabel = styled.h2`
  font-size: 1.5rem;
  color: #4A5568;
  margin: 10px 0;
`;

const StatValue = styled.p`
  font-size: 2rem;
  color: #2F80ED;
  font-weight: bold;
`;

const SectionContainer = styled.div`
  margin-bottom: 40px;
  padding: 25px; /* Increased padding for better spacing */
  background-color: ${primaryColor};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color:#1ee0c9;
  }
`;

const Error = styled.div`
  color: #EB5757;
  padding: 40px;
  margin: 20px 0;
  font-size: 1.5rem;
  text-align: center;
`;

const LegendContainer = styled(Legend)`
  cursor: pointer;

  .recharts-legend-item:hover {
    color: #2F80ED;
    font-weight: bold;
  }
`;

const Statistics: React.FC = () => {
  const musicData = useSelector((state: RootState) => state.music.data);
  
  if (!musicData) {
    return <Error>No Data Available</Error>;
  }

  const timeBasedData = musicData.musicList.map((music) => ({
    date: parseISO(music.createdAt),
    totalSongs: musicData.musicList.filter(
      (item) => parseISO(item.createdAt) <= parseISO(music.createdAt)
    ).length,
  }));

  const handleLegendClick = (event: any) => {
  };

  return (
    <PageContainer>
      <StyledHeader>Music Statistics</StyledHeader>

      <CardContainer>
        <StatCard>
          <StatLabel>Total Songs</StatLabel>
          <StatValue>{musicData.totalSongs}</StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>Total Artists</StatLabel>
          <StatValue>{musicData.totalArtists}</StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>Total Albums</StatLabel>
          <StatValue>{musicData.totalAlbums}</StatValue>
        </StatCard>
      </CardContainer>

      <SectionContainer>
        <StyledSubHeader>Songs in Each Genre</StyledSubHeader>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={musicData.songsInEachGenre}>
            <XAxis dataKey="genre" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: '#f7fafc', color: '#2D3748' }} />
            <LegendContainer onClick={handleLegendClick} />
            <Bar dataKey="count" fill="#2F80ED" />
          </BarChart>
        </ResponsiveContainer>
      </SectionContainer>

      <SectionContainer>
        <StyledSubHeader>Artists Statistics</StyledSubHeader>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={musicData.artistStats}
              dataKey="totalSongs"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {musicData.artistStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#f7fafc', color: '#2D3748' }} />
            <LegendContainer layout="vertical" verticalAlign="middle" align="right" onClick={handleLegendClick} />
          </PieChart>
        </ResponsiveContainer>
      </SectionContainer>

      <SectionContainer>
        <StyledSubHeader>Albums Statistics</StyledSubHeader>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={musicData.albumStats}
              dataKey="songs.length"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {musicData.albumStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#f7fafc', color: '#2D3748' }} />
            <LegendContainer layout="vertical" verticalAlign="middle" align="right" onClick={handleLegendClick} />
          </PieChart>
        </ResponsiveContainer>
      </SectionContainer>

      <SectionContainer>
        <StyledSubHeader>Increase in Songs Over Time</StyledSubHeader>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timeBasedData}>
            <XAxis dataKey="date" type="category" scale="time" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: '#f7fafc', color: '#2D3748' }} />
            <LegendContainer onClick={handleLegendClick} />
            <Line type="monotone" dataKey="totalSongs" stroke="#2F80ED" />
          </LineChart>
        </ResponsiveContainer>
      </SectionContainer>
    </PageContainer>
  );
};

export default Statistics;
