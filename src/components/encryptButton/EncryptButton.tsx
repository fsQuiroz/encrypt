import { FunctionComponent } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import { Button } from '@mui/material';

const EncryptButton: FunctionComponent = () => {
  return (
    <Button variant="contained" startIcon={<KeyIcon />}>
      Encrypt
    </Button>
  );
};

export default EncryptButton;
