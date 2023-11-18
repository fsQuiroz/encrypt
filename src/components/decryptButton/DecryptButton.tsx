import { FunctionComponent } from 'react';
import KeyOffTwoToneIcon from '@mui/icons-material/KeyOffTwoTone';
import { Button } from '@mui/material';

const DecryptButton: FunctionComponent = () => {
  return (
    <Button variant="contained" startIcon={<KeyOffTwoToneIcon />} sx={{ mt: 2, ml: 2 }}>
      Desencriptar
    </Button>
  );
};

export default DecryptButton;
