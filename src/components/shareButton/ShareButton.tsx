import type { FunctionComponent, HTMLAttributes } from 'react';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { Button } from '@mui/material';

interface Props extends HTMLAttributes<unknown> {
  disabled?: boolean;
  shared?: boolean;
  onClick?: () => void;
}

const ShareButton: FunctionComponent<Props> = ({ shared, onClick, disabled }) => {
  return (
    <Button
      variant="contained"
      startIcon={shared ? <CheckCircleTwoToneIcon /> : <ShareTwoToneIcon />}
      onClick={onClick}
      disabled={disabled}
      color={shared ? 'success' : 'primary'}>
      Share
    </Button>
  );
};

export default ShareButton;
