import { FunctionComponent, HTMLAttributes } from 'react';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import { Button } from '@mui/material';

interface Props extends HTMLAttributes<unknown> {
  onClick?: () => void;
}

const DecryptButton: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <Button variant="contained" startIcon={<KeyOffIcon />} onClick={onClick}>
      Decrypt
    </Button>
  );
};

export default DecryptButton;
