import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';



@Injectable({
  providedIn: 'root'
})
export class PdfService {


  public async exportToPdfOld(elementId: string, fileName: string) {

    const element = document.getElementById(elementId);
    const HTML_Width = element.offsetWidth
		const HTML_Height = element.offsetHeight;
		const top_left_margin = 15;
    const bottom_margin = 15;
		const PDF_Width = HTML_Width+(top_left_margin*2);
		const PDF_Height = (PDF_Width*1.5)+(top_left_margin*2) + bottom_margin;
		const canvas_image_width = HTML_Width;
		const canvas_image_height = HTML_Height;
    const doc = new jspdf.jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
    const totalPDFPages = Math.ceil(HTML_Height/(PDF_Height))-1;
    if (!element) {
      console.error('Element not found!');
      return;
    }

    const canvas = await html2canvas(element, { allowTaint : true,
      useCORS : true});
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
		  doc.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);


			for (var i = 1; i <= totalPDFPages; i++) {
				doc.addPage([PDF_Width, PDF_Height]);
				doc.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
			}

		    doc.save(fileName + '.pdf');
    /*const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // mm (A4 width)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    doc.save(fileName + '.pdf');*/
  }
  public async exportToPdf(elementId: string, fileName: string) {
    let doc = new jspdf.jsPDF({unit: 'pt', format: 'a4', orientation:'p', userUnit: 72});
    await doc.html(
       document.getElementById(elementId) , {margin: [20,20,20,20], autoPaging: 'text', html2canvas: {
        scale: 0.70, backgroundColor: '#FFFFFF',  allowTaint:true, useCORS: true
       }});
    doc.save(fileName + '.pdf');

  }


}
