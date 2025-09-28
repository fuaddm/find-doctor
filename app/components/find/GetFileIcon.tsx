import { Jpeg } from '~/icons/file/jpeg';
import { Jpg } from '~/icons/file/jpg';
import { Pdf } from '~/icons/file/pdf';
import { Png } from '~/icons/file/png';
import { Webp } from '~/icons/file/webp';

export function GetFileIcon({ fileType }: { fileType: 'webp' | 'png' | 'jpg' | 'jpeg' | 'pdf' }) {
  if (fileType === 'png') {
    return (
      <Png
        width={32}
        className="me-3"
      />
    );
  } else if (fileType === 'jpg') {
    return (
      <Jpg
        width={32}
        className="me-3"
      />
    );
  } else if (fileType === 'jpeg') {
    return (
      <Jpeg
        width={32}
        className="me-3"
      />
    );
  } else if (fileType === 'webp') {
    return (
      <Webp
        width={32}
        className="me-3"
      />
    );
  } else if (fileType === 'pdf') {
    return (
      <Pdf
        width={32}
        className="me-3"
      />
    );
  }
  return <></>;
}
