import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { updateMusicStart } from '../reducers/musicSlice';

interface UpdateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  musicId: string | null;
}

interface MusicData {
  title: string;
  artist: string;
  album: string;
  genre: string;
  imageFile: File | null;
  audioFile: File | null;
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(20, 184, 166, 0.9); /* Semi-transparent background */
  color: #ffffff; /* White text */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 16px;
    color: #ffffff; /* White title color */
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 1em;
  color: #ffffff; /* White label text */
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 4px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ffffff; /* White border */
  background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent input background */
  color: #ffffff; /* White input text */
  transition: background-color 0.3s, border-color 0.3s;

  &:focus {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: #14b8a6;
  }
`;

const Button = styled.button<{ loading?: boolean }>`
  background-color: #ffffff;
  color: #14b8a6;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.loading ? 'not-allowed' : 'pointer')};
  font-size: 1.2em;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #14b8a6;
    color: #ffffff;
    transform: ${(props) => (!props.loading ? 'rotate(-2deg)' : 'none')};
  }
`;

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onRequestClose, musicId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatedMusicData, setUpdatedMusicData] = useState<Partial<MusicData>>({
    title: '',
    artist: '',
    album: '',
    genre: '',
    imageFile: null,
    audioFile: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (musicId) {
      const fetchMusicData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/music/single/${musicId}`, { withCredentials: true });
          const musicData = response.data.data;
          setUpdatedMusicData({
            title: musicData.title,
            artist: musicData.artist,
            album: musicData.album,
            genre: musicData.genre,
          });
        } catch (error) {
          console.error('Error fetching music data for update:', error);
        }
      };

      fetchMusicData();
    }
  }, [id, musicId]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (musicId) {
        const formData = new FormData();
        formData.append('title', updatedMusicData.title || '');
        formData.append('artist', updatedMusicData.artist || '');
        formData.append('album', updatedMusicData.album || '');
        formData.append('genre', updatedMusicData.genre || '');
        formData.append('imageFile', updatedMusicData.imageFile || '');
        formData.append('audioFile', updatedMusicData.audioFile || '');

        if (id) {
          dispatch(updateMusicStart({ id, musicId, formData }));
          onRequestClose();
          navigate(`/mymusic/${id}`);
        }
      }
    } catch (error) {
      console.error('Error updating music data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedMusicData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;

    setUpdatedMusicData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Music Modal"
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          margin: '17.7px auto',
          padding: 0,
          border: 'none',
          maxWidth: '430px',
        },
      }}
    >
      <ModalContainer>
        <h2>Update Music</h2>
        <Label>
          Title:
          <Input
            type="text"
            name="title"
            value={updatedMusicData.title}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Artist:
          <Input
            type="text"
            name="artist"
            value={updatedMusicData.artist}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Album:
          <Input
            type="text"
            name="album"
            value={updatedMusicData.album}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Genre:
          <Input
            type="text"
            name="genre"
            value={updatedMusicData.genre}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Cover Image:
          <Input
            type="file"
            name="imageFile"
            onChange={handleFileChange}
          />
        </Label>
        <Label>
          Audio File:
          <Input
            type="file"
            name="audioFile"
            onChange={handleFileChange}
          />
        </Label>
        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? 'Updating...' : 'Update Music'}
        </Button>
      </ModalContainer>
    </Modal>
  );
};

export default UpdateModal;
