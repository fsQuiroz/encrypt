import { FunctionComponent } from 'react';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import { Button } from '@mui/material';

const DecryptButton: FunctionComponent = () => {
  return (
    <Button variant="contained" startIcon={<KeyOffIcon />}>
      Decrypt
    </Button>
  );
};

export default DecryptButton;
