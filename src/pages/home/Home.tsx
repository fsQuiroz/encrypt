import { FunctionComponent, HTMLAttributes, MutableRefObject } from 'react';
import { Container, Grid, Stack, TextField, Typography } from '@mui/material';
import EncryptButton from '../../components/encryptButton/EncryptButton.tsx';
import DecryptButton from '../../components/decryptButton/DecryptButton.tsx';
import CopyButton from '../../components/copyButton/CopyButton.tsx';
import ShareButton from '../../components/shareButton/ShareButton.tsx';
import { FormikProps } from 'formik';
import { EncryptForm } from '../../model/form/EncryptForm.ts';

interface Props extends HTMLAttributes<unknown> {
  encStatus: 'CLEAN' | 'INVALID_NOTE' | 'INVALID_PASS' | 'SUCCESS';
  formRef: MutableRefObject<HTMLFormElement | null>;
  formik: FormikProps<EncryptForm>;
  encrypt: () => void;
  decrypt: () => void;
}

const Home: FunctionComponent<Props> = ({ encStatus, formRef, formik, encrypt, decrypt }) => {
  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Grid component="form" onSubmit={formik.handleSubmit} container spacing={2} ref={formRef}>
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
            name="note"
            label="Text"
            variant="outlined"
            helperText={
              encStatus === 'INVALID_NOTE' ? 'Invalid or corrupted encrypted text' : 'Text to encrypt or decrypt'
            }
            value={formik.values.note}
            onChange={formik.handleChange}
            error={(formik.touched.note && Boolean(formik.errors.note)) || encStatus === 'INVALID_NOTE'}
            color={encStatus === 'SUCCESS' ? 'success' : 'primary'}
            multiline
            minRows={10}
            maxRows={10}
            fullWidth
            focused={encStatus === 'CLEAN' ? undefined : encStatus === 'SUCCESS'}
            InputProps={{
              style: {
                color: 'white',
              },
            }}
            sx={
              encStatus === 'SUCCESS'
                ? {}
                : {
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
                  }
            }
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <TextField
            name="pass"
            label="Key"
            variant="outlined"
            helperText={
              encStatus === 'INVALID_PASS' ? 'Invalid encryption key' : 'Encryption key to encrypt or decrypt text'
            }
            type="password"
            value={formik.values.pass}
            onChange={formik.handleChange}
            error={(formik.touched.pass && Boolean(formik.errors.pass)) || encStatus === 'INVALID_PASS'}
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
            <EncryptButton onClick={encrypt} />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" justifyContent="start">
            <DecryptButton onClick={decrypt} />
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

export default Home;
