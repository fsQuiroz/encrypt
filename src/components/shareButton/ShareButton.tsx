import { FunctionComponent } from 'react';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import { Button } from '@mui/material';

const ShareButton: FunctionComponent = () => {
  return (
    <Button variant="contained" startIcon={<ShareTwoToneIcon />} sx={{ ml: 2 }}>
      Compartir
    </Button>
  );
};

export default ShareButton;
