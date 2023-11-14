import { FunctionComponent } from 'react';
import CopyAllTwoToneIcon from '@mui/icons-material/CopyAllTwoTone';
import { Button } from '@mui/material';

const CopyButton: FunctionComponent = () => {
  return (
    <Button variant="contained" startIcon={<CopyAllTwoToneIcon />} sx={{ marginBottom: '3.8rem' }}>
      Copiar
    </Button>
  );
};

export default CopyButton;
