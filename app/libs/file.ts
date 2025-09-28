export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

export function getFileType(name: string) {
  const fileNameSplitted = name.split('.');
  return fileNameSplitted[fileNameSplitted.length - 1] as 'webp' | 'png' | 'jpg' | 'jpeg' | 'pdf';
}
