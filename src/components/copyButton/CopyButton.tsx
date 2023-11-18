import { FunctionComponent } from 'react';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { Button } from '@mui/material';

const CopyButton: FunctionComponent = () => {
  return (
    <Button variant="contained" startIcon={<ContentCopyTwoToneIcon />}>
      Copy
    </Button>
  );
};

export default CopyButton;
