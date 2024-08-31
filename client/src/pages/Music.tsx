
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { fetchDataStart } from '../reducers/musicSlice';
import Card from '../components/card';
import styled from '@emotion/styled';
import { ClipLoader } from 'react-spinners';
import { primaryColor, backgroundColor, textColor, secondaryColor } from '../constants/colors'; // Import color constants

// Container for the entire music page
const MusicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${backgroundColor};
  min-height: 100vh; // Ensure the page covers the full viewport height
`;

// Container for the search bar
const SearchContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

// Styled input for the search bar
const SearchInput = styled.input`
  padding: 14px;
  border-radius: 30px;
  border: 2px solid ${primaryColor};
  outline: none;
  margin-right: 10px;
  width: 100%;
  font-size: 1.2em;
  font-family: 'Roboto', sans-serif; // Consistent font
  transition: border-color 0.3s;

  &:focus {
    border-color: ${primaryColor};
  }
`;

// Styled button for the search bar
const SearchButton = styled.button`
  padding: 14px 20px;
  border-radius: 30px;
  background-color: ${primaryColor};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  font-family: 'Roboto', sans-serif; // Consistent font
  transition: background-color 0.3s;

  &:hover {
    background-color: ${primaryColor}CC; /* Slightly transparent on hover */
  }
`;

// Container for the music cards
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;
  justify-content: center;
`;

// Styling for individual music cards
const StyledCard = styled(Card)`
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
  background-color: rgba(20, 184, 166, 0.1); /* Transparent background */
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  will-change: transform; /* Optimize performance for transform changes */

  &:hover {
    transform: translateY(-10px) rotate(-2deg); /* Slight tilt on hover */
    background-color: rgba(20, 184, 166, 0.2); /* Darken background on hover */
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
  }
`;

// Container for pagination numbers
const PageNumberContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`;

// Styling for pagination numbers
const PageNumber = styled.span<{ isActive: boolean }>`
  padding: 12px;
  margin: 0 8px;
  cursor: pointer;
  font-size: 1.2em;
  color: ${({ isActive }) => (isActive ? '#ffffff' : textColor)};
  background-color: ${({ isActive }) => (isActive ? primaryColor : 'transparent')};
  border-radius: 30px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${primaryColor}AA; /* Transparent hover effect */
  }
`;

// Error message styling
const Error = styled.div`
  color: ${primaryColor};
  padding: 30px;
  margin: 20px 0;
  font-size: 1.2em;
  font-family: 'Roboto', sans-serif; // Consistent font
`;

const MusicPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.music);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(data?.musicList || []);

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  useEffect(() => {
    if (!data) {
      dispatch(fetchDataStart());
    } else {
      setSearchResults(data.musicList);
    }
  }, [dispatch, data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    if (data) {
      const filteredResults = data.musicList.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.album.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(filteredResults);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color={primaryColor} loading={loading} size={150} />
      </div>
    );
  }

  if (error) {
    return <Error>Oops! Something went wrong. Please try again later.</Error>;
  }

  return (
    <MusicContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by title, artist or album"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      <CardsContainer>
        {searchResults.length === 0 ? (
          <Error>No Data Available</Error>
        ) : (
          searchResults.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          ).map((item) => (
            <StyledCard
              key={item._id}
              id={String(item._id)}
              imageUrl={item.coverImg.url}
              title={item.title}
              artist={item.artist}
            />
          ))
        )}
      </CardsContainer>
      <PageNumberContainer>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PageNumber
            key={index}
            isActive={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PageNumber>
        ))}
      </PageNumberContainer>
    </MusicContainer>
  );
};

export default MusicPage;
