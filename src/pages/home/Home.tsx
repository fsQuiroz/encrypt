import type { FunctionComponent, HTMLAttributes, RefObject, SyntheticEvent } from 'react';
import { Alert, Container, Grid, Snackbar, Stack, TextField, Typography } from '@mui/material';
import EncryptButton from '../../components/encryptButton/EncryptButton.tsx';
import DecryptButton from '../../components/decryptButton/DecryptButton.tsx';
import CopyButton from '../../components/copyButton/CopyButton.tsx';
import ShareButton from '../../components/shareButton/ShareButton.tsx';
import type { FormikProps } from 'formik';
import type { EncryptForm } from '../../model/form/EncryptForm.ts';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

interface Props extends HTMLAttributes<unknown> {
  appVersion: string;
  encStatus: 'CLEAN' | 'INVALID_NOTE' | 'INVALID_PASS' | 'SUCCESS';
  encrypted: boolean;
  copied: boolean;
  shared: boolean;
  encryptedQueryParamPresent: boolean;
  alertMessage: string | null;
  formRef: RefObject<HTMLFormElement | null>;
  formik: FormikProps<EncryptForm>;
  handleEncrypt: () => void;
  handleDecrypt: () => void;
  handleCopy: () => void;
  handleShare: () => void;
  handleCloseAlert: (event?: SyntheticEvent | Event, reason?: string) => void;
}

const Home: FunctionComponent<Props> = ({
  appVersion,
  encStatus,
  encrypted,
  copied,
  shared,
  encryptedQueryParamPresent,
  alertMessage,
  formRef,
  formik,
  handleEncrypt,
  handleDecrypt,
  handleCopy,
  handleShare,
  handleCloseAlert,
}) => {
  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Snackbar
        open={!!alertMessage}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={5000}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
          icon={<CheckCircleTwoToneIcon />}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Grid component="form" onSubmit={formik.handleSubmit} container spacing={2} ref={formRef}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h3" align="center">
            Secure Notes
          </Typography>
          <Typography variant="subtitle1" align="center">
            by fsQuiroz.com | v{appVersion}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
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
            autoFocus={!encryptedQueryParamPresent}
            multiline
            minRows={10}
            maxRows={10}
            fullWidth
            focused={encStatus === 'CLEAN' ? undefined : encStatus === 'SUCCESS'}
            slotProps={{
              input: {
                style: {
                  color: 'white',
                },
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
        <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
          <TextField
            name="pass"
            label="Key"
            variant="outlined"
            helperText={
              encStatus === 'INVALID_PASS' ? 'Invalid encryption key' : 'Encryption key to encrypt or decrypt text'
            }
            type="password"
            autoComplete="one-time-code"
            value={formik.values.pass}
            onChange={formik.handleChange}
            error={(formik.touched.pass && Boolean(formik.errors.pass)) || encStatus === 'INVALID_PASS'}
            autoFocus={encryptedQueryParamPresent}
            fullWidth
            slotProps={{
              input: {
                style: {
                  color: 'white',
                },
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
        <Grid size={{ xs: 6 }}>
          <Stack direction="row" justifyContent="end">
            <EncryptButton disabled={!formik.isValid || !formik.dirty} onClick={handleEncrypt} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Stack direction="row" justifyContent="start">
            <DecryptButton disabled={!formik.isValid || !formik.dirty} onClick={handleDecrypt} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Stack direction="row" justifyContent="end">
            <CopyButton onClick={handleCopy} copied={copied} disabled={!formik.values.note} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Stack direction="row" justifyContent="start">
            <ShareButton onClick={handleShare} shared={shared} disabled={!encrypted || !formik.values.note} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
