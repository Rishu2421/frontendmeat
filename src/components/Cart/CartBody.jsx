import React,{useState,useEffect} from "react";
import Cookies from 'js-cookie';
import backendUrl from "../../config";
import CheckoutPage from "../orders/CheckoutPage/CheckoutPage";
import {  Form,Alert } from 'react-bootstrap';

function CartBody({selectedItemPrice}){

    const [showCheckout, setShowCheckout] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [selectedCityStore, setSelectedCityStore] = useState("Areera Colony");
    const [pincode, setPincode] = useState('');
  const [isBhopalPincode, setIsBhopalPincode] = useState(false);
  const [showPincodeAlert, setShowPincodeAlert] = useState(false);  

    useEffect(() => {
        fetchCartItems();
      }, []);
    const fetchCartItems = async () => {
        try {
          
          const token = Cookies.get('token');
          const response = await fetch(`${backendUrl}/api/cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setCartItems(data.cartItems);
          } else {
            console.log('Failed to fetch cart items');
          }
        } catch (error) {
          console.log('Error fetching cart items:', error);
        }
      };

      const removeItemFromCart = async (itemId) => {
        try {
          // const token = localStorage.getItem('token');
          // const userId = localStorage.getItem('userId');
          const token = Cookies.get('token');
          const userId = Cookies.get('userId');
          // Remove the item from the cartItems array on the client-side
          const updatedCartItems = cartItems.filter(item => item.item._id !== itemId);
          setCartItems(updatedCartItems);
      
          const response = await fetch(`${backendUrl}/api/cart/${itemId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', // Add the Content-Type header
            },
            body: JSON.stringify({ userId }), // Send the userId in the request body
          });
      
          if (response.ok) {
            // Item removed successfully, no need to fetch updated cart items
            console.log('Item removed from cart successfully');
            // <Alert variant="Success"> </Alert>
          } else {
            // Revert back the cart items if there is an error
            setCartItems(cartItems);
            console.log('Failed to remove item from cart');
          }
        } catch (error) {
          console.log('Error removing item from cart:', error);
        }
      };

  

      const calculateTotalValue = () => {
        // Filter out items with undefined 'item' property
        const validCartItems = cartItems.filter(item => item.item !== undefined);
      
        // Calculate the total value if the filtered cart is not empty
        return validCartItems.reduce((total, item) => total + item.quantity * item.selectedQuantityAndMrp.mrp, 0);
      };
      
    

   const calculateTotalItem=()=>{
    return cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    const handlePincodeChange = (e) => {
      
      const enteredPincode = e.target.value;
      setPincode(enteredPincode);
    };
    const handleProceedToCheckout = () => {
      if (!pincode) {
        setShowPincodeAlert(true); // Show the pincode alert
        return;
      }
    
      // Replace this with your valid Bhopal pincodes
    const validBhopalPincodes = ["462001", "462002", "462003", "462004", "462005", "462006", "462007", "462008", "462009", "462010", "462011", "462012", "462013", "462014", "462015", "462016", "462017", "462018", "462019", "462020", "462021", "462022", "462023", "462024", "462025", "462026", "462027", "462028", "462029", "462030", "462031", "462032", "462033", "462034", "462035", "462036", "462037", "462038", "462039", "462040", "462041", "462042", "462043", "462044", "462045", "462046", "462047", "462048", "462049", "462050"];

      const isPincodeValid = validBhopalPincodes.includes(pincode);
    
      if (!isPincodeValid) {
        setShowPincodeAlert(true);
      } else {
        setIsBhopalPincode(true);
        setShowPincodeAlert(false); // Hide the pincode alert when it's valid
        setShowCheckout(true);
      }
    };
    const filteredCartItems = cartItems.filter((item) => item.item && item.item._id);

return (
    <>
{showCheckout ? (
      <CheckoutPage name={name} mobileNumber={mobileNumber} address={address} amount={calculateTotalValue()} storeLocation={selectedCityStore} pincode={pincode} numberOfItem={calculateTotalItem()} products={filteredCartItems}/>
    ) : (
    <div>
     
    


    {cartItems.length === 0 ? (
        <div className="text-center">
                                <p>Your cart is feeling a bit empty...</p>
                                <img className="img" style={{height:"75vh", width:"75%"}}src="./images/empty_cart_.png" alt="Illustration" />
                            </div>
      ) : (
    <div className="container mt-5">
<div className="row">
    <div className="col-md-8">
        <div className="card p-4">
            <h2 className="mb-4">Your Cart</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Product</th>
                {/* <th>Weight</th> */}
                <th>Number Of Item</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems
  .filter((item) => item.item && item.item._id) // Filter out items with missing item.item
  .map((item, index) => (
    <tr key={`${item.item._id}-${index}`}>
      <td>{item.item.name}</td>
      <td>{item.quantity || 0}</td>
      <td>{item.selectedQuantityAndMrp?.mrp || 0}</td>
      <td>{(item.selectedQuantityAndMrp?.mrp || 0) * (item.quantity || 0)}</td>
      <td>
        <button
          className="btn btn-danger btn-responsive"
          onClick={() => removeItemFromCart(item.item._id)}
        >
          Remove
        </button>
      </td>
    </tr>
  ))
}

            {/* {cartItems.map((item, index) => (
            
  <tr key={`${item.item && item.item._id}-${index}`}>
    <td>{item.item && item.item.name}</td>
    <td>{item && item.item && item.quantity ? item.quantity : 0}</td>
    <td>{item.item && item.selectedQuantityAndMrp && item.selectedQuantityAndMrp.mrp ? parseFloat(item.selectedQuantityAndMrp.mrp) : 0}</td>
    <td>{item.item &&item.selectedQuantityAndMrp && item.selectedQuantityAndMrp.mrp && item.quantity ? parseFloat(item.selectedQuantityAndMrp.mrp) * item.quantity : 0}</td>
    <td>
      <button
        className="btn btn-danger btn-responsive"
        onClick={() => removeItemFromCart(item.item._id)}
      >
        Remove
      </button>
    </td>
  </tr>
))} */}

  <tr>
    <td colSpan="3"></td>
    <th>Total:</th>
    <td>Rs.{calculateTotalValue()}</td>
  </tr>
</tbody>
                </table>
          </div>

        
        </div>
    </div>

    <div className="col-md-4">
  <div className="card p-4 mb-2">
    <h2 className="mb-4">Enter Your Details</h2>
    <Form.Group controlId="formName" className="mt-3">
      <Form.Label>Name: </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </Form.Group>

    <Form.Group controlId="formEmail" className="mt-3">
      <Form.Label>Mobile Number: </Form.Label>
      <Form.Control
        type="number"
        placeholder="Enter your contact number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        required
      />
    </Form.Group>

    <Form.Group controlId="formAddress" className="mt-3">
      <Form.Label>Address: </Form.Label>
      <Form.Control
        as="textarea"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        rows={4}
      />
    </Form.Group>
       
    {/* <Form.Group controlId="storeLocation" className="mt-3">
      <Form.Label className="me-4">Select Store:</Form.Label>
      <AreaSelection setSelectedCityStore={setSelectedCityStore} />
    </Form.Group> */}
    <Form.Group controlId="formPincode" className="mt-3">
            <Form.Label>Pincode: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your pincode"
              value={pincode}
              onChange={handlePincodeChange}
              required
            />
          </Form.Group>
          {showPincodeAlert && (
            <Alert variant="danger" onClose={() => setShowPincodeAlert(false)} dismissible>
              You can't place an order with this pincode. Please enter a valid Bhopal pincode.
            </Alert>
          )}
          <div className="d-grid gap-2 mt-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>

  
  </div>
</div>

    
</div>
</div>
)}


</div>
    
     )}
</>
);
}

export default CartBody;
