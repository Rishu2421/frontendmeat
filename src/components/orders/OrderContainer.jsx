import React, { useState } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import backendUrl from '../../config';
import PrintableBill from './Print/PrintableBill';
import OrderCancellation from './CancelOrder/OrderCancellation';
const OrderContainer = ({ orders, isAdmin }) => {
  const [isLoading, setLoading] = useState(false);
  
 
  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    try {
      const response = await axios.put(`${backendUrl}/api/orders/admin/${orderId}`, { status });
      console.log(response.data); // Log the updated order details
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update status');
    }
    setLoading(false);
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
  

// Pass the billData to the PrintableBill component


  return (
    <div className="card mt-4">
      <div className="card-body">
        {orders && orders.map((order, index) => (
          <div key={index} className="mb-4">
           <OrderItem
  key={order._id}
  orderDate={order.createdAt}
  orderNumber={order._id}
  totalAmount={order.amount}
  mobileNumber={order.mobileNumber}
  userName={order.name}
  address={order.address}
  products={
    order.items
      ? order.items.map((item) => {
          if (item && item.item) {
            // If 'item' and 'item.item' are not null, create a product object
            return {
              imageUrl: `${backendUrl}${item.item.image}`,
              productName: item.item.name,
              price: `Rs.${item.selectedQuantityAndMrp.mrp}`,
              numOfPieces: `${item.selectedQuantityAndMrp.numOfPieces}`,
              quantity: `${item.selectedQuantityAndMrp.quantity}`,
              status: order.status,
              numOfItems:`${item.quantity}`,
              subTotal:`${item.quantity*item.selectedQuantityAndMrp.mrp}`,
              productId: `${item.item._id}`,
            };
          } else {
            // If 'item' or 'item.item' is null, create a placeholder object
            return { deleted: true };
          }
        })
      : [] // Handle the case where 'order.items' is null or empty
  } />

<OrderCancellation orderStatus={order.status} orderId={order._id} orderPlacedAt={order.createdAt}/>

<PrintableBill 
  billData={billData}  
  key={index+1}
  orderDate={order.createdAt}
  orderNumber={order._id}
  totalAmount={order.amount}
  mobileNumber={order.mobileNumber}
  userName={order.name}
  address={order.address +" "+ order.pincode} 
  products={
    order.items
      ? order.items.map((item) => {
          if (item && item.item) {
            // If 'item' and 'item.item' are not null, create a product object
            return {
              productName: item.item.name,
              price: `Rs.${item.selectedQuantityAndMrp.mrp}`,
              numOfItems:`${item.quantity}`,
              subTotal:`${item.quantity*item.selectedQuantityAndMrp.mrp}`,
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
            {isAdmin && (
              <div>
              <div>Pincode {order.pincode}</div>
              <div className="mt-2">
                <p>Status: {order.status}</p>
                <select
                  value={order.status}
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderContainer;


// <OrderItem
// key={order._id}
// orderDate={order.createdAt}
// orderNumber={order._id}
// totalAmount={order.amount}
// mobileNumber={order.mobileNumber}
// address={order.address}
// products={order.items && order.items.map((item) => ({
//   imageUrl: `${backendUrl}${item.item.image}`,
//   productName: item.item.name,
//   price: `Rs.${item.item.quantityAndMrp[0].mrp}`,
//   status: order.status,
//   productId: `${item.item._id}`
// }))}