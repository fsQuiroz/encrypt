import { FunctionComponent, HTMLAttributes } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import { Button } from '@mui/material';

interface Props extends HTMLAttributes<unknown> {
  onClick?: () => void;
}

const EncryptButton: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <Button variant="contained" startIcon={<KeyIcon />} onClick={onClick}>
      Encrypt
    </Button>
  );
};

export default EncryptButton;
