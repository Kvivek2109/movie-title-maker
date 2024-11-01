import React from 'react';
import html2canvas from 'html2canvas';

const ExportComponent = ({ elementId }) => {

  const exportImage = () => {
    const element = document.getElementById(elementId);
    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'movie-title.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div>
      <button onClick={exportImage}>Export as Image</button>
    </div>
  )
}

export default ExportComponent
