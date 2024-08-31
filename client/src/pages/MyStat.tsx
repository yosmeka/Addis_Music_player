import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { parseISO } from 'date-fns';
import { ClipLoader } from 'react-spinners';

// Import color constants
import { primaryColor, secondaryColor, backgroundColor, textColor } from '../constants/colors';

interface GenreStats {
  genre: string;
  count: number;
}

interface ArtistStats {
  _id: string;
  totalSongs: number;
  totalAlbums: string[];
}

interface AlbumStats {
  _id: string;
  songs: string[];
}

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

interface MusicData {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  uniqueGenres: string[];
  songsInEachGenre: GenreStats[];
  artistStats: ArtistStats[];
  albumStats: AlbumStats[];
  musicList: MusicListItem[];
}

const COLORS = [primaryColor, secondaryColor, '#FF0000', '#0000FF', '#FFA500', '#800080', '#FFC0CB', '#000000', '#FFFFFF', '#8B4513'];

const PageContainer = styled.div`
  color: ${textColor};
  background-color: ${backgroundColor};
  padding: 20px;
  border-radius: 10px;
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledHeader = styled.h1`
   font-size: 1.8rem;
  color: #2D3748;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledSubHeader = styled.h3`
  font-size: 2rem;
  color: ${primaryColor};
  text-align: center;
  margin-bottom: 20px;
`;

const CircleStat = styled.div`
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
  margin: 0;
  font-size: 1.5rem;
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
  color: ${primaryColor};
  padding: 30px;
  margin: 20px 0;
  font-size: 2rem;
  text-align: center;
`;

const MyStat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [musicData, setMusicData] = useState<MusicData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/music/clientwithstat/${id}`, { withCredentials: true });
        setMusicData(response.data.data);
      } catch (error) {
        console.error('Error fetching music data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color={primaryColor} loading={loading} size={150} />
      </div>
    );
  }

  if (!musicData) {
    return <Error>No Data</Error>;
  }

  const timeBasedData = musicData.musicList.map((music) => ({
    date: parseISO(music.createdAt),
    totalSongs: musicData.musicList.filter(
      (item) => parseISO(item.createdAt) <= parseISO(music.createdAt)
    ).length,
  }));

  return (
    <PageContainer>
      <StyledHeader>Music Statistics</StyledHeader>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <CircleStat>
          <StatLabel>Total Songs</StatLabel>
          <StatLabel>{musicData.totalSongs}</StatLabel>
        </CircleStat>

        <CircleStat>
          <StatLabel>Total Artists</StatLabel>
          <StatLabel>{musicData.totalArtists}</StatLabel>
        </CircleStat>

        <CircleStat>
          <StatLabel>Total Albums</StatLabel>
          <StatLabel>{musicData.totalAlbums}</StatLabel>
        </CircleStat>
      </div>

      <SectionContainer>
        <StyledSubHeader>Songs in Each Genre</StyledSubHeader>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={musicData.songsInEachGenre}>
            <XAxis dataKey="genre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill={primaryColor} />
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
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
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
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>
      </SectionContainer>

      <SectionContainer>
        <StyledSubHeader>Increase in Songs Over Time</StyledSubHeader>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timeBasedData}>
            <XAxis dataKey="date" type="category" scale="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalSongs" stroke={primaryColor} />
          </LineChart>
        </ResponsiveContainer>
      </SectionContainer>
    </PageContainer>
  );
};

export default MyStat;
