import React from 'react';
import { FunctionComponent } from 'react';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import { Button } from '@mui/material';

const ShareButton: FunctionComponent = () => {
  return (
    <Button
      variant="contained"
      startIcon={<ShareTwoToneIcon />}
      sx={{ marginTop: '2rem', marginLeft: '1rem', marginBottom: '3rem' }}>
      Compartir
    </Button>
  );
};

export default ShareButton;
