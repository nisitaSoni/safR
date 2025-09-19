import { jsPDF } from 'jspdf';

export interface EFIRData {
  alertId: string;
  touristName: string;
  touristId: string;
  nationality: string;
  phone: string;
  emergencyContact: string;
  lastKnownLocation: string;
  timestamp: string;
  description: string;
  reportingOfficer: string;
}

export const generateEFIR = (data: EFIRData): void => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Electronic First Information Report (E-FIR)", 105, 30, { align: "center" });
  
  doc.setFontSize(16);
  doc.text("SafeTrip Emergency Response System", 105, 45, { align: "center" });
  
  // FIR Details
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  
  let yPosition = 70;
  const lineHeight = 15;
  
  // FIR Information
  doc.setFont("helvetica", "bold");
  doc.text("FIR Details:", 20, yPosition);
  yPosition += lineHeight;
  
  doc.setFont("helvetica", "normal");  
  doc.text(`FIR Number: ${data.alertId}`, 30, yPosition);
  yPosition += lineHeight;
  
  doc.text(`Date & Time: ${new Date(data.timestamp).toLocaleString()}`, 30, yPosition);
  yPosition += lineHeight;
  
  doc.text(`Reporting Officer: ${data.reportingOfficer}`, 30, yPosition);
  yPosition += lineHeight * 1.5;
  
  // Tourist Information
  doc.setFont("helvetica", "bold");
  doc.text("Missing Person Details:", 20, yPosition);
  yPosition += lineHeight;
  
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${data.touristName}`, 30, yPosition);
  yPosition += lineHeight;
  
  doc.text(`Tourist ID: ${data.touristId}`, 30, yPosition);
  yPosition += lineHeight;
  
  doc.text(`Nationality: ${data.nationality}`, 30, yPosition);
  yPosition += lineHeight;
  
  doc.text(`Contact Number: ${data.phone}`, 30, yPosition);
  yPosition += lineHeight;
  
  doc.text(`Emergency Contact: ${data.emergencyContact}`, 30, yPosition);
  yPosition += lineHeight * 1.5;
  
  // Incident Details
  doc.setFont("helvetica", "bold");
  doc.text("Incident Information:", 20, yPosition);
  yPosition += lineHeight;
  
  doc.setFont("helvetica", "normal");
  doc.text(`Last Known Location: ${data.lastKnownLocation}`, 30, yPosition);
  yPosition += lineHeight;
  
  doc.text(`Time of Last Contact: ${new Date(data.timestamp).toLocaleString()}`, 30, yPosition);
  yPosition += lineHeight * 1.5;
  
  // Description
  doc.setFont("helvetica", "bold");
  doc.text("Description of Circumstances:", 20, yPosition);
  yPosition += lineHeight;
  
  doc.setFont("helvetica", "normal");
  const splitDescription = doc.splitTextToSize(data.description, 160);
  doc.text(splitDescription, 30, yPosition);
  yPosition += splitDescription.length * 6 + 20;
  
  // Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("This E-FIR is generated automatically by SafeTrip Emergency Response System", 105, 260, { align: "center" });
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 275, { align: "center" });
  
  // Save the PDF
  doc.save(`E-FIR-${data.alertId}-${data.touristName.replace(/\s+/g, '_')}.pdf`);
};