import { FunctionComponent } from 'react';
import { Container, Grid, TextField, Typography } from '@mui/material';
import EncryptButton from '../../components/encryptButton/EncryptButton.tsx';
import DecryptButton from '../../components/decryptButton/DecryptButton.tsx';
import CopyButton from '../../components/copyButton/CopyButton.tsx';
import ShareButton from '../../components/shareButton/ShareButton.tsx';

const GridHome: FunctionComponent = () => {
  return (
    <Container maxWidth="sm">
      <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2}>
        <Grid item md={12}>
          <Typography variant="h3" align="center">
            Encrypt
          </Typography>
        </Grid>
        <Grid item md={12}>
          <TextField
            label="Text"
            variant="outlined"
            helperText="Ingresa el texto que deseas encriptar/desencriptar"
            multiline
            minRows={10}
            maxRows={10}
            fullWidth
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            label="Contraseña"
            variant="outlined"
            helperText="Aquí debes poner tu contraseña para encriptar/desencriptar"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid item md={12} m="auto">
          <EncryptButton />
          <DecryptButton />
        </Grid>
        <Grid item md={12} m="auto">
          <CopyButton />
          <ShareButton />
        </Grid>
      </Grid>
    </Container>
  );
};

export default GridHome;
