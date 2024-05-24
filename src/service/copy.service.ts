const baseUrl = import.meta.env.VITE_BASE_URL;
const queryParam = import.meta.env.VITE_ENCRYPTED_QUERY_PARAM;

export const copy: (text: string) => void = (text: string) => {
  if ('clipboard' in navigator) {
    navigator.clipboard.writeText(text);
  } else {
    document.execCommand('copy', true, text);
  }
};

export const share: (text: string) => void = (text: string) => {
  copy(`${baseUrl}?${queryParam}=${text}`);
};
