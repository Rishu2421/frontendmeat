import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminOrderItem from './AdminOrderItem';
import backendUrl from '../../../../config';
import PrintableBill from '../../../orders/Print/PrintableBill';

const AdminOrderContainer = ({ orders, handleConfirmOrder }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Use a map to track the current status for each order
  const [currentStatusMap, setCurrentStatusMap] = useState({});

  const updateOrderStatus = async (orderId, status) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${backendUrl}/api/orders/admin/${orderId}`, {
        status,
      });
      // Update the current status map with the new status
      setCurrentStatusMap((prevStatusMap) => ({
        ...prevStatusMap,
        [orderId]: status,
      }));
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update status');
    }
    setIsLoading(false);
  };

  // Sample bill data
  const billData = {
    header: {
      companyName: "Cher's Meat Gram",
      companyAddress: "R-02 Panchwati Complex, Panchwati Colony, Lalghati Bhopal, Pin 462030",
      mobileNumber: "7055205010",
      fssaiNo: "21422010005288",
      isoCertificateNo: "20221 7868",
      gstin: "23MEHPS8950L1ZK",
      website: "www.chersmeatgram.com",
    },
    footer: ['Please check the material at delivery. If there is any problem please feel free to contact us. And return the material to delivery boy.We will try to send you the same order in next delivery slot.',
  'Returns of any material once delivered will be accepted only if it is informed to us within 30 minutes of delivery time.',
  'Order cancellation can be done 1 hour before the delivery slot time.Once dispatched can not be cancelled.'
  ],
  };


  return (
    <div className="mt-4">
      {orders.map((order, index) => (
        <div key={order._id} className={`card mb-4 ${order.isNew ? 'new-order' : ''}`}>
          <AdminOrderItem
            order={order} // Pass the entire order object
            orderDate={order.createdAt}
            orderNumber={order._id}
            totalAmount={order.amount}
            mobileNumber={order.mobileNumber}
            userName={order.name}
            orderForLater={order.isOrderForLater}
            deliveryTimeSlot={order.deliveryTimeSlot}
            deliveryDate={order.deliveryDate}
            address={`${order.address}, ${order.pincode}`} // Show address with pincode
            products={order.items}
            status={currentStatusMap[order._id] || order.status} // Use current status from the map or the original status
            onConfirmOrder={() => handleConfirmOrder(order._id)}
            onUpdateStatus={(status) => updateOrderStatus(order._id, status)}
          />
          <div className="mt-2 d-flex align-items-center">
            <div className="me-2">
              <p>Status: {currentStatusMap[order._id] || order.status}</p>
              <select
                value={currentStatusMap[order._id] || order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                disabled={isLoading}
                className="form-select"
              >
                <option value="Not processed">Not processed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              {isLoading && <span className="ms-2">Changing status...</span>}
            </div>
            <div>
              <PrintableBill
                billData={billData}
                key={index + 1}
                orderDate={order.createdAt}
                orderNumber={order._id}
                totalAmount={order.amount}
                mobileNumber={order.mobileNumber}
                userName={order.name}
                address={order.address + ' ' + order.pincode}
                products={
                  order.items
                    ? order.items.map((item) => {
                        if (item && item.item) {
                          // If 'item' and 'item.item' are not null, create a product object
                          return {
                            productName: item.item.name,
                            price: `Rs.${item.selectedQuantityAndMrp.mrp}`,
                            numOfItems: `${item.quantity}`,
                            subTotal: `${item.quantity * item.selectedQuantityAndMrp.mrp}`,
                            productId: `${item.item._id}`,
                          };
                        } else {
                          // If 'item' or 'item.item' is null, create a placeholder object
                          return { deleted: true };
                        }
                      })
                    : [] // Handle the case where 'order.items' is null or empty
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderContainer;

// import React, { useState } from 'react';
// import axios from 'axios';
// import AdminOrderItem from './AdminOrderItem';
// import backendUrl from '../../../../config';
// import PrintableBill from '../../../orders/Print/PrintableBill';

// const AdminOrderContainer = ({ orders, handleConfirmOrder }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentStatus,setCurrentStatus]=useState(null);
//   const updateOrderStatus = async (orderId, status) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.put(`${backendUrl}/api/orders/admin/${orderId}`, {
//         status,
//       });
//     //   console.log(response.data); // Log the updated order details
//     setCurrentStatus(status);  
//     alert('Status updated successfully');

//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Failed to update status');
//     }
//     setIsLoading(false);
//   };

//   // Sample bill data
//   const billData = {
//     header: {
//       companyName: "Cher's Meat Gram",
//       companyAddress: "R-02 Panchwati Complex, Panchwati Colony, Lalghati Bhopal, Pin 462030",
//       mobileNumber: "7055205010",
//       fssaiNo: "21422010005288",
//       isoCertificateNo: "20221 7868",
//       gstin: "23MEHPS8950L1ZK",
//       website: "www.chersmeatgram.com",
//     },
//     footer: ['Please check the material at delivery. If there is any problem please feel free to contact us. And return the material to delivery boy.We will try to send you the same order in next delivery slot.',
//   'Returns of any material once delivered will be accepted only if it is informed to us within 30 minutes of delivery time.',
//   'Order cancellation can be done 1 hour before the delivery slot time.Once dispatched can not be cancelled.'
//   ],
//   };

//   return (
//     <div className="mt-4">
//       {orders.map((order, index) => (
//         <div key={order._id} className={`card mb-4 ${order.isNew ? 'new-order' : ''}`}>
//           <AdminOrderItem
//             order={order} // Pass the entire order object
//             orderDate={order.createdAt}
//             orderNumber={order._id}
//             totalAmount={order.amount}
//             mobileNumber={order.mobileNumber}
//             userName={order.name}
//             address={`${order.address}, ${order.pincode}`} // Show address with pincode
//             products={order.items}
//             status={order.status}
//             onConfirmOrder={() => handleConfirmOrder(order._id)}
//             onUpdateStatus={(status) => updateOrderStatus(order._id, status)}
//           />
//           <div className="mt-2 d-flex align-items-center">
//             <div className="me-2">
//               <p>Status: {currentStatus?currentStatus:order.status}</p>
//               <select
//                 value={order.status}
//                 onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                 disabled={isLoading}
//                 className="form-select"
//               >
//                 <option value="Not processed">Not processed</option>
//                 <option value="Processing">Processing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>
//               {isLoading && <span className="ms-2">Changing status...</span>}
//             </div>
//             <div>
//               <PrintableBill
//                 billData={billData}
//                 key={index + 1}
//                 orderDate={order.createdAt}
//                 orderNumber={order._id}
//                 totalAmount={order.amount}
//                 mobileNumber={order.mobileNumber}
//                 userName={order.name}
//                 address={order.address + ' ' + order.pincode}
//                 products={
//                   order.items
//                     ? order.items.map((item) => {
//                         if (item && item.item) {
//                           // If 'item' and 'item.item' are not null, create a product object
//                           return {
//                             productName: item.item.name,
//                             price: `Rs.${item.selectedQuantityAndMrp.mrp}`,
//                             numOfItems: `${item.quantity}`,
//                             subTotal: `${item.quantity * item.selectedQuantityAndMrp.mrp}`,
//                             productId: `${item.item._id}`,
//                           };
//                         } else {
//                           // If 'item' or 'item.item' is null, create a placeholder object
//                           return { deleted: true };
//                         }
//                       })
//                     : [] // Handle the case where 'order.items' is null or empty
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminOrderContainer;
