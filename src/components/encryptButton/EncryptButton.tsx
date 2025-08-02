import type { FunctionComponent, HTMLAttributes } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import { Button } from '@mui/material';

interface Props extends HTMLAttributes<unknown> {
  disabled?: boolean;
  onClick?: () => void;
}

const EncryptButton: FunctionComponent<Props> = ({ disabled, onClick }) => {
  return (
    <Button variant="contained" startIcon={<KeyIcon />} disabled={disabled} onClick={onClick}>
      Encrypt
    </Button>
  );
};

export default EncryptButton;
