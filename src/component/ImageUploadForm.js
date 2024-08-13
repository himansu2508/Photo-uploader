import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from '@mui/material';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [imagesList, setImagesList] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && caption) {
      setImagesList([...imagesList, { image, caption }]);
      setImage(null);
      setCaption('');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Upload Image with Caption
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          sx={{ mb: 2 }}
        />
        {image && (
          <Card sx={{ mb: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt="Image Preview"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Preview
              </Typography>
            </CardContent>
          </Card>
        )}
        <TextField
          variant="outlined"
          fullWidth
          label="Caption"
          value={caption}
          onChange={handleCaptionChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Uploaded Images
        </Typography>
        <Grid container spacing={2}>
          {imagesList.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={`Uploaded ${index + 1}`}
                />
                <CardContent>
                  <Typography variant="body1">{item.caption}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ImageUploadForm;
