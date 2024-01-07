import React from 'react'

const PDF = () => {
  const downloadPdf = () => {
    const pdfUrl = 'https://flask-api-render-gzze.onrender.com/fetch_data';

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'generated_pdf.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return  ;//
  };

  return (
    <div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
};

export default PDF