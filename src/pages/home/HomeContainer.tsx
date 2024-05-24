import { FunctionComponent, useEffect, useRef, useState } from 'react';
import Home from './Home.tsx';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { EncryptForm } from '../../model/form/EncryptForm.ts';
import * as EncryptionService from '../../service/encryption.service.ts';

const initialValues: EncryptForm = {
  note: '',
  pass: '',
  type: 'ENCRYPT',
};

const HomeContainer: FunctionComponent = () => {
  const [encStatus, setEncStatus] = useState<'CLEAN' | 'INVALID_NOTE' | 'INVALID_PASS' | 'SUCCESS'>('CLEAN');
  const [copied, setCopied] = useState(false);
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

  const validations = yup.object({
    note: yup.string().required(),
    pass: yup.string().required(),
    type: yup.string(),
  });

  const formik: FormikProps<EncryptForm> = useFormik({
    initialValues: initialValues,
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
  };

  const doDecrypt = (encrypted: string, pass: string) => {
    const decrypted = EncryptionService.decrypt(encrypted, pass);
    formik.resetForm({
      values: { note: decrypted ? decrypted : encrypted, pass: '', type: decrypted ? 'ENCRYPT' : 'DECRYPT' },
    });
    const newEncStatus = decrypted === null ? 'INVALID_NOTE' : decrypted === '' ? 'INVALID_PASS' : 'SUCCESS';

    setEncStatus(newEncStatus);
  };

  const encrypt = () => {
    formik.setFieldValue('type', 'ENCRYPT');
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: false, bubbles: true }));
  };

  const decrypt = () => {
    formik.setFieldValue('type', 'DECRYPT');
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const copy = () => {
    const note = formik.values.note;
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(note);
    } else {
      document.execCommand('copy', true, note);
    }
    setCopied(true);
  };

  return (
    <Home
      encStatus={encStatus}
      copied={copied}
      formRef={formRef}
      formik={formik}
      encrypt={encrypt}
      decrypt={decrypt}
      copy={copy}
    />
  );
};

export default HomeContainer;
