const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const app = express();

const menuItems = [
    {}
]

// Endpoint to generate PDF
app.get('/generate-pdf', (req, res) => {
    const doc = new PDFDocument();
    const filename = 'Bean_Scene_Menu.pdf';

    // Set response headers for download
    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    // Pipe the PDF document to the response
    doc.pipe(res);

    doc.fontSize(20).text('Bean Scene Menu', { align: 'center' });
    doc.moveDown();

    menuItems.forEach(item => {
        doc
            .fontSize(16)
            .text(item.title, { continued: true })
            .fontSize(12)
            .text(` - ${item.price}`, { align: 'right' });
        doc.fontSize(10).text(item.description, { indent: 20 });
        doc.moveDown();
    });

    doc.end();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});