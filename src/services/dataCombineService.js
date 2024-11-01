// fileHandlerService.js
import { readTXTFile, readDocxFile, readPDFFile, readXlsxFile } from './readFiles';

const normalizeKey = (key) => {
  return key
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
};

export const handleFileChangeService = async (files) => {
  let combinedData = {};
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let fileData;

    if (file.type === 'text/plain') {
      fileData = await readTXTFile(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      fileData = await readDocxFile(file);
    } else if (file.type === 'application/pdf') {
      fileData = await readPDFFile(file);
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.name.endsWith('.xlsx')
    ) {
      fileData = await readXlsxFile(file);
    } else {
      throw new Error('Invalid file type');
    }

    combinedData = { ...combinedData, ...fileData };
  }

  const normalizedData = {};
  for (const [key, value] of Object.entries(combinedData)) {
    const normalizedKey = normalizeKey(key);
    normalizedData[normalizedKey] = value;
  }

  return normalizedData;
};
