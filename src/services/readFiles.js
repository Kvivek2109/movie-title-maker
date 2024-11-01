import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import * as XLSX from 'xlsx';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js`;

export const readTXTFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const plainText = e.target.result;
        const jsonResponse = convertTextToKeyValue(plainText);
        resolve(jsonResponse);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
};

export const readDocxFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        const { value: plainText } = await mammoth.convert({ arrayBuffer });
        const jsonResponse = convertTextToKeyValue(plainText);
        resolve(jsonResponse);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

export const readPDFFile = async (file) => {
  const pdfText = [];
  const pdfData = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    let currentLine = '';

    textContent.items.forEach((item, index) => {
      currentLine += item.str.trim() + ' ';

      if (index < textContent.items.length - 1) {
        const currentY = item.transform[5];
        const nextY = textContent.items[index + 1].transform[5];
        if (nextY < currentY - 2) {
          pdfText.push(currentLine.trim());
          currentLine = ''; 
        }
      }
    });

    if (currentLine) {
      pdfText.push(currentLine.trim());
    }
  }

  const plainText = pdfText.join('\n').trim();
  const jsonResponse = convertTextToKeyValue(plainText);
  
  return jsonResponse; 
};

export const readXlsxFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const jsonResponse = {};
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        sheetData.forEach((row) => {
          if (row.length === 2) {
            const key = row[0].toString().trim();
            const value = row[1].toString().trim();
            jsonResponse[key] = value;
          }
        });
      });
      resolve(jsonResponse);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};

const convertTextToKeyValue = (plainText) => { 
  const cleanedText = plainText.replace(/<\/?[^>]+(>|$)/g, "\n").trim();
  const jsonObject = {};
  const lines = cleanedText.split(/,\s*|\n+/).map(line => line.trim()).filter(Boolean);
  lines.forEach((line) => {
    const match = line.match(/^\s*([^:]+)\s*:\s*(.+)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      jsonObject[key] = value.replace(/\s+/g, ' ');
    }
  });
  return jsonObject;
};


