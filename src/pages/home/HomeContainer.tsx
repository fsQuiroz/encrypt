import { type FunctionComponent, type SyntheticEvent, useEffect, useRef, useState } from 'react';
import Home from './Home.tsx';
import * as yup from 'yup';
import { type FormikProps, useFormik } from 'formik';
import type { EncryptForm } from '../../model/form/EncryptForm.ts';
import * as EncryptionService from '../../service/encryption.service.ts';
import * as CopyService from '../../service/copy.service';
import { useQueryParams } from '../../service/hooks/useQueryParams.ts';

const appVersion = import.meta.env.VITE_APP_VERSION;
const encryptedQueryParam = import.meta.env.VITE_ENCRYPTED_QUERY_PARAM;
const alertCopiedMessage: string = 'Text copied to clipboard';
const alertSharedMessage: string = 'Share link generated and copied to clipboard';

const HomeContainer: FunctionComponent = () => {
  const params = useQueryParams();
  const [encStatus, setEncStatus] = useState<'CLEAN' | 'INVALID_NOTE' | 'INVALID_PASS' | 'SUCCESS'>('CLEAN');
  const [encrypted, setEncrypted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [encryptedQueryParamPresent] = useState<boolean>(!!params[encryptedQueryParam]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (encStatus === 'SUCCESS') {
      setTimeout(() => setEncStatus('CLEAN'), 500);
    }
  }, [encStatus]);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 500);
    }
  }, [copied]);

  useEffect(() => {
    if (shared) {
      setTimeout(() => {
        setEncrypted(false);
        setShared(false);
      }, 500);
    }
  }, [shared]);

  const validations = yup.object({
    note: yup.string().required(),
    pass: yup.string().required(),
    type: yup.string(),
  });

  const getInitialValues = (): EncryptForm => {
    const encrypted = params[encryptedQueryParam];
    return {
      note: encrypted ? encrypted : '',
      pass: '',
      type: encrypted ? 'DECRYPT' : 'ENCRYPT',
    };
  };

  const formik: FormikProps<EncryptForm> = useFormik({
    initialValues: getInitialValues(),
    validationSchema: validations,
    onSubmit: (values: EncryptForm) => {
      switch (values.type) {
        case 'ENCRYPT':
          doEncrypt(values.note, values.pass);
          break;
        case 'DECRYPT':
          doDecrypt(values.note, values.pass);
          break;
      }
    },
  });

  const doEncrypt = (note: string, pass: string) => {
    const encrypted = EncryptionService.encrypt(note, pass);
    formik.resetForm({ values: { note: encrypted, pass: '', type: 'DECRYPT' } });
    setEncStatus('SUCCESS');
    setEncrypted(true);
  };

  const doDecrypt = (encrypted: string, pass: string) => {
    const decrypted = EncryptionService.decrypt(encrypted, pass);
    formik.resetForm({
      values: { note: decrypted ? decrypted : encrypted, pass: '', type: decrypted ? 'ENCRYPT' : 'DECRYPT' },
    });
    setEncStatus(decrypted === null ? 'INVALID_NOTE' : decrypted === '' ? 'INVALID_PASS' : 'SUCCESS');
    setEncrypted(false);
  };

  const handleEncrypt = () => {
    formik.setFieldValue('type', 'ENCRYPT');
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: false, bubbles: true }));
  };

  const handleDecrypt = () => {
    formik.setFieldValue('type', 'DECRYPT');
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const handleCopy = () => {
    const note = formik.values.note;
    CopyService.copy(note);
    setCopied(true);
    setAlertMessage(alertCopiedMessage);
  };

  const handleShare = () => {
    const encrypted = formik.values.note;
    CopyService.share(encrypted);
    setShared(true);
    setAlertMessage(alertSharedMessage);
  };

  const handleCloseAlert = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertMessage(null);
  };

  return (
    <Home
      appVersion={appVersion}
      encStatus={encStatus}
      encrypted={encrypted}
      copied={copied}
      shared={shared}
      encryptedQueryParamPresent={encryptedQueryParamPresent}
      alertMessage={alertMessage}
      formRef={formRef}
      formik={formik}
      handleEncrypt={handleEncrypt}
      handleDecrypt={handleDecrypt}
      handleCopy={handleCopy}
      handleShare={handleShare}
      handleCloseAlert={handleCloseAlert}
    />
  );
};

export default HomeContainer;
