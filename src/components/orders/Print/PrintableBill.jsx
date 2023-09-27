import React, { useRef } from 'react';
import './PrintBill.css'; 
const PrintableBill = ({ billData,orderDate,orderNumber, totalAmount,mobileNumber,userName,address,products}) => {
  // Create a reference to the printable content
  const printRef = useRef();

  const handlePrint = () => {
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.left = '-9999px';
    document.body.appendChild(printFrame);

    const printDocument = printFrame.contentDocument || printFrame.contentWindow.document;
    printDocument.open();
    printDocument.write('<html><head>');
  
    // Add viewport meta tag within the head section
    printDocument.write('<meta name="viewport" content="width=device-width, initial-scale=1">');
  

    printDocument.write('<style>@page { size: 80mm 100%; margin: 0; } body { margin: 10px; font-family: Arial, sans-serif; } .centered-text {text-align: center; line-height:0;}  .bill-container { width: 80mm; margin: 0 auto; padding: 10px; text-align: center; } .header { margin-bottom: 10px; } .header img { max-width: 50%; height: auto; } .header .p{line-height:0} .divider { border-top: 1px solid #000; margin: 10px 0; } .table { width: 100%; margin-top: 10px; } .table th, .table td { text-align: left; padding: 5px; } .table th { font-weight: bold; } .footer { margin-top: 10px; }</style>');
    printDocument.write('</head><body>');
    printDocument.write('<h1>Bill</h1>');
    printDocument.write('<div class="bill-container">');
    printDocument.write(printRef.current.innerHTML);
    printDocument.write('</div></body></html>');
    printDocument.close();

    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();
    document.body.removeChild(printFrame);
  };
  const totalItemCount = products.reduce((total, item) => total + parseInt(item.numOfItems), 0);

  return (
    <div>
      <button onClick={handlePrint} className='btn d-inline btn-primary btn-responsive'>Print Bill</button>
      <div ref={printRef} className="bill-container d-none">
        {/* Header */}
        <div className="header-print">

          <img className="print-logo" src="https://rstechnologyandbusinessconsultants.com/images/meatgram_logo.jpg" style={{width:"6rem", height:"4rem" , borderRadius:"10px"}} alt="Company Logo" />
          <p><strong>Cher's Meat Gram</strong></p>
  <p>R-02 Panchwati Complex, Panchwati Colony, Lalghati Bhopal Pin:- 462030</p>
  <div className="centered-text text-center">
   <p> Mobile No: {billData.header.mobileNumber}</p>
  <p>  Fssai No: {billData.header.fssaiNo}</p>
    <p>Iso Certificate No: {billData.header.isoCertificateNo}</p>
    <p>GSTIN: {billData.header.gstin}</p>
    <p>Website: www.chersmeatgram.com</p>
  </div>

        </div>
        
        
        <hr className="divider" />
        <div style={{ textAlign: 'left' }}>
          <p>Name: {userName} M:{mobileNumber}</p>
          <p>Address: {address}</p>
        </div>
        <hr className="divider" />
        <div style={{ textAlign: 'left' }}>
          <p>Date:{orderDate.split('T')[0]} <strong>Delivery</strong></p>
          <p>Bill No:{orderNumber} Biller: cashier</p>
        </div>
        <hr className="divider" />
        {/* Body */}
        <div>
          <h3>Order Details</h3>
          <hr className="divider" />
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.numOfItems}</td>
                  <td>{item.price}</td>
                  <td>{item.subTotal}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="text-end" style={{textAlign:"right"}}>
                 Total Items: {totalItemCount} 
                </td>
                <td colSpan="2" className="text-end" style={{textAlign:"right"}}>
                 Sub Total: {totalAmount-50}
                </td>
              </tr>
           <tr>
            <td colSpan="4">
                <hr style={{ borderTop: "1px solid #000" }} />
            </td>
            </tr>
               <tr >
                <td colSpan="4" className="text-end" style={{textAlign:"right"}}>
                <p>Delivery +50</p>
                   <strong >Grand Total: {totalAmount}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <hr className="divider" />
          <div className="footer">
  {billData.footer.map((footerLine, index) => (
    <p key={index}>{footerLine}</p>
  ))}
</div>
        </div>
      </div>
    </div>
  );
};

export default PrintableBill;


  // Function to open the print dialog
//   const handlePrint = () => {
//     window.print();
//     // const printWindow = window.open('', '_blank');
//     // printWindow.document.open();
//     // printWindow.document.write('<html><head><title>Print</title></head><body>');
//     // printWindow.document.write('<style>@page { size: 80mm 100%; margin: 0; } body { margin: 10px; font-family: Arial, sans-serif; } .bill-container { width: 80mm; margin: 0 auto; padding: 10px; text-align: center; } .header { margin-bottom: 10px; } .header img { max-width: 50%; height: auto; } .divider { border-top: 1px solid #000; margin: 10px 0; } .table { width: 100%; margin-top: 10px; } .table th, .table td { text-align: left; padding: 5px; } .table th { font-weight: bold; } .footer { margin-top: 10px; }</style>');
//     // printWindow.document.write('<h1>Bill</h1>');
//     // printWindow.document.write('<div class="bill-container">');
//     // printWindow.document.write(printRef.current.innerHTML);
//     // printWindow.document.write('</div></body></html>');
//     // printWindow.document.close();
//     // printWindow.print();
//     // printWindow.close();
//   };

  // Calculate total item count









// import React, { useRef } from 'react';

// const PrintableBill = ({ billData, onPrint }) => {
//   // Create a reference to the printable content
//   const printRef = useRef();

//   // Function to open the print dialog
//   const handlePrint = () => {
//     const printWindow = window.open('', '_blank');
//     printWindow.document.open();
//     printWindow.document.write('<html><head><title>Print</title></head><body>');
//     printWindow.document.write('<style>@page { size: 80mm 100%; margin: 0; } body { margin: 10px; font-family: Arial, sans-serif; } .bill-container { width: 80mm; margin: 0 auto; padding: 10px; text-align: center; } .header { margin-bottom: 10px; } .header img { max-width: 50%; height: auto; } .divider { border-top: 1px solid #000; margin: 10px 0; } .table { width: 100%; margin-top: 10px; } .table th, .table td { text-align: left; padding: 5px; } .table th { font-weight: bold; } .footer { margin-top: 10px; }</style>');
//     printWindow.document.write('<h1>Bill</h1>');
//     printWindow.document.write('<div class="bill-container">');
//     printWindow.document.write(printRef.current.innerHTML);
//     printWindow.document.write('</div></body></html>');
//     printWindow.document.close();
//     printWindow.print();
//     printWindow.close();
//   };

//   return (
//     <div>
//       <button onClick={handlePrint}>Print Bill</button>
//       <div ref={printRef} className="bill-container d-none">
//         {/* Header */}
//         <div className="header">
//           <img src="/images/MEAT GRAM (1).jpg" alt="Company Logo" />
//           <p>Cher's Meat Gram</p>
//           <p>R-02 Panchwati Complex, Panchwati Colony, Lalghati Bhopal</p>
//           <p>Pin 462030</p>
//           <p>Mobile No: 7055205010</p>
//           <p>Fssai No: 12398 XXXXXX</p>
//           <p>Iso Certificate No: 20221 7868</p>
//           <p>GSTIN: 1231njneo1u2n</p>
//           <p>Website: www.chersmeatgram.com</p>
//           {/* Include user details here */}
   
//         </div>
//         <hr className="divider" />
//         <div style={{ textAlign: 'left' }}>
//   <p>Name: {billData.user.name} M:{billData.user.mobileNumber}</p>
//   <p>Address: {billData.user.address}</p>
// </div>

//         <hr className="divider" />


//         {/* Body */}
//         <div>
//           <h3>Order Details</h3>
//           <hr className="divider" />
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Item</th>
//                 <th>Qty</th>
//                 <th>Price</th>
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {billData.items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.productName}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.price}</td>
//                   <td>{item.subTotal}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <hr className="divider" />

//           <div className="footer">
//           <p>Grand Total: {billData.totalAmount}</p>
//             <p>Footer content</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrintableBill;
