import type { FunctionComponent, HTMLAttributes } from 'react';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import { Button } from '@mui/material';

interface Props extends HTMLAttributes<unknown> {
  disabled?: boolean;
  onClick?: () => void;
}

const DecryptButton: FunctionComponent<Props> = ({ disabled, onClick }) => {
  return (
    <Button variant="contained" startIcon={<KeyOffIcon />} disabled={disabled} onClick={onClick}>
      Decrypt
    </Button>
  );
};

export default DecryptButton;
