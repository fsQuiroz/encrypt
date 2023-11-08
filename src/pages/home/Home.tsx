import { Box, Container, TextField, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import EncryptButton from '../../components/encryptButton/EncryptButton';
import CopyButton from '../../components/copyButton/CopyButton';
import DecryptButton from '../../components/decryptButton/DecryptButton';
import ShareButton from '../../components/shareButton/ShareButton';

const Home: FunctionComponent = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <Box>
        <Typography variant="h3" margin={'2rem'}>
          Encrypt
        </Typography>
      </Box>
      <Box sx={{ width: '80%' }}>
        <TextField
          label="Texto"
          variant="outlined"
          helperText="Ingresa el texto que deseas encriptar/desencriptar"
          id="text"
          multiline
          minRows={10}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiFormHelperText-root': {
              color: 'white',
            },
            '& .MuiFormLabel-root': {
              color: 'white',
            },
            width: '100%',
            margin: '1rem',
          }}
        />
      </Box>

      <Box>
        <TextField
          label="Contraseña"
          variant="outlined"
          helperText="Aquí debes poner tu contraseña para encriptar/desencriptar"
          id="textEncrypt"
          type="password"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiFormHelperText-root': {
              color: 'white',
            },
            '& .MuiFormLabel-root': {
              color: 'white',
            },
            mt: 2,
            width: '15rem',
          }}></TextField>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <EncryptButton />
        <DecryptButton />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CopyButton />
        <ShareButton />
      </Box>
    </Container>
  );
};

export default Home;
