import { FunctionComponent } from 'react';
import KeyOffTwoToneIcon from '@mui/icons-material/KeyOffTwoTone';
import { Button } from '@mui/material';

const DecryptButton: FunctionComponent = () => {
  return (
    <Button
      variant="contained"
      startIcon={<KeyOffTwoToneIcon />}
      sx={{ marginTop: '2rem', marginLeft: '1rem', alignSelf: 'center' }}>
      Desencriptar
    </Button>
  );
};

export default DecryptButton;
