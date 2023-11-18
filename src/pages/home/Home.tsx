import { FunctionComponent } from 'react';
import { Container, Grid, Stack, TextField, Typography } from '@mui/material';
import EncryptButton from '../../components/encryptButton/EncryptButton.tsx';
import DecryptButton from '../../components/decryptButton/DecryptButton.tsx';
import CopyButton from '../../components/copyButton/CopyButton.tsx';
import ShareButton from '../../components/shareButton/ShareButton.tsx';

const GridHome: FunctionComponent = () => {
  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center">
            Secure Notes
          </Typography>
          <Typography variant="subtitle1" align="center">
            by fsQuiroz.com
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Text"
            variant="outlined"
            helperText="Text to encrypt or decrypt"
            multiline
            minRows={10}
            maxRows={10}
            fullWidth
            InputProps={{
              style: {
                color: 'white',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiFormHelperText-root': {
                color: 'white',
              },
              '& .MuiFormLabel-root': {
                color: 'white',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <TextField
            label="Key"
            variant="outlined"
            helperText="Encryption key to encrypt or decrypt text"
            type="password"
            fullWidth
            InputProps={{
              style: {
                color: 'white',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiFormHelperText-root': {
                color: 'white',
              },
              '& .MuiFormLabel-root': {
                color: 'white',
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" justifyContent="end">
            <EncryptButton />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" justifyContent="start">
            <DecryptButton />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" justifyContent="end">
            <CopyButton />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" justifyContent="start">
            <ShareButton />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GridHome;
