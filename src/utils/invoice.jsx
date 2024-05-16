// src/utils/invoice.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const downloadInvoice = (order) => {
  const doc = new jsPDF();

  // Add the header with company information
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  const companyName = "TECH STORE";
  const companyNameSize = doc.getTextDimensions(companyName);
  const companyNameCenter = Math.floor((doc.internal.pageSize.width - companyNameSize.w) / 2);
  doc.text(companyName, companyNameCenter, 15);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const companyInfo = [
    "123 Main Street, City, Country",
    "Phone: +1 (123) 456-7890",
    "Email: info@techstore.com",
    "Website: www.techstore.com"
  ];
  companyInfo.forEach((line, index) => {
    const lineSize = doc.getTextDimensions(line);
    const lineCenter = Math.floor((doc.internal.pageSize.width - lineSize.w) / 2);
    doc.text(line, lineCenter, 25 + index * 5);
  });

  // Add horizontal line
  doc.setLineWidth(0.5);
  doc.line(20, 45, doc.internal.pageSize.width - 20, 45);

  // Add invoice title with background color
  const margin = 20;
  const tableWidth = doc.internal.pageSize.width - margin * 2;
  doc.setFillColor(82, 86, 89); // Set fill color to #525659
  doc.rect(margin, 50, tableWidth, 10, "F"); // Draw rectangle with fill
  doc.setTextColor(255, 255, 255); // Set text color to white
  doc.setFontSize(16);
  doc.text("INVOICE", margin + 5, 57); // Position "Invoice" text inside the rectangle

  // Reset text color to black for the rest of the document
  doc.setTextColor(0, 0, 0);

  // Add customer and order information
  doc.setFontSize(10);
  const orderDate = new Date(order.createdAt).toLocaleDateString();
  // Placeholder for customer name, address, email, and phone
  const customerName = "Customer Name";
  const customerAddress = "Customer Address";
  const customerEmail = "customer@example.com";
  const customerPhone = "+1 (123) 456-7890";

  // Left column with bold keys
  doc.setFont("helvetica", "bold");
  doc.text(`Invoice Number:`, margin, 70);
  doc.text(`Date:`, margin, 75);
  doc.text(`Order Status:`, margin, 80);
  doc.text(`Purchased Date:`, margin, 85);
  doc.text(`Customer Name:`, margin, 90);
  doc.text(`Address:`, margin, 95);

  doc.setFont("helvetica", "normal");
  doc.text(`${order._id}`, 55, 70);
  doc.text(`${orderDate}`, 55, 75);
  doc.text(`${order.orderStatus}`, 55, 80);
  doc.text(`${orderDate}`, 55, 85); // Positioned below order status
  doc.text(`${customerName}`, 55, 90);
  doc.text(`${customerAddress}`, 55, 95);

  // Right column with bold keys
  doc.setFont("helvetica", "bold");
  doc.text(`Email:`, 105, 70);
  doc.text(`Phone:`, 105, 75);

  doc.setFont("helvetica", "normal");
  doc.text(`${customerEmail}`, 125, 70);
  doc.text(`${customerPhone}`, 125, 75);

  // Add itemized list
  const items = order.products.map((p) => [
    p.product.title,
    p.count,
    p.product.price.toFixed(2),
    (p.count * p.product.price).toFixed(2),
  ]);

  doc.autoTable({
    startY: 110,
    head: [["Item", "Quantity", "Price", "Total"]],
    body: items,
    theme: 'striped',
    styles: { fontSize: 10 },
  });

  // Add totals
  const finalY = doc.previousAutoTable.finalY || 110;
  const subtotal = items.reduce((sum, item) => sum + parseFloat(item[3]), 0).toFixed(2);
  const tax = (subtotal * 0.1).toFixed(2); // Example tax calculation (10%)
  const total = parseFloat(subtotal) + parseFloat(tax);

  doc.setFont("helvetica", "bold");
  doc.text(`Subtotal:`, 140, finalY + 10);
  doc.text(`Tax:`, 140, finalY + 15);
  doc.text(`Total:`, 140, finalY + 20);

  doc.setFont("helvetica", "normal");
  doc.text(`$${subtotal}`, 170, finalY + 10);
  doc.text(`$${tax}`, 170, finalY + 15);
  doc.text(`$${total.toFixed(2)}`, 170, finalY + 20);

  // Add thank you note
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Thank you for shopping with us!", doc.internal.pageSize.width / 2, finalY + 40, null, null, 'center');

  // Save the PDF
  doc.save(`techstore_invoice_${order._id}.pdf`);
};
