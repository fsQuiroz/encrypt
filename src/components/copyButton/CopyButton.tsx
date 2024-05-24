import { FunctionComponent, HTMLAttributes } from 'react';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { Button } from '@mui/material';

interface Props extends HTMLAttributes<unknown> {
  disabled?: boolean;
  copied?: boolean;
  onClick?: () => void;
}

const CopyButton: FunctionComponent<Props> = ({ copied, onClick, disabled }) => {
  return (
    <Button
      variant="contained"
      startIcon={copied ? <CheckCircleTwoToneIcon /> : <ContentCopyTwoToneIcon />}
      onClick={onClick}
      disabled={disabled}
      color={copied ? 'success' : 'primary'}>
      Copy
    </Button>
  );
};

export default CopyButton;
