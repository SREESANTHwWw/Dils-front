import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../Server";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const ViewOrders = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/get-orderby-id/${id}`)
      .then((res) => {
        setOrder(res.data.getorder);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdateStatus = () => {
    if (!order) return;
    setLoading(true);
    axios
      .patch(`${server}/updateOrders/${order._id}`, { status })
      .then((res) => {
        setOrder((prevOrder) => ({ ...prevOrder, status }));
        toast.success("Order status updated successfully");
      })
      .catch(() => {
        toast.error("Order update failed");
      })
      .finally(() => setLoading(false));
  };

  console.log(order);

  const generateInvoice = () => {
    if (!order) return;
  
    const doc = new jsPDF();
  
    // 🏬 Add Shop/Company Logo (Optional)
    // const base64Logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...";
    // doc.addImage(base64Logo, "PNG", 14, 10, 40, 20);
  
    // 🏷️ Title & Order Details
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Invoice", 90, 30);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 45);
    doc.text(`Date: ${new Date(order.orderDate).toLocaleDateString()}`, 14, 55);
  
    // 🏬 Customer Details
    doc.setFontSize(10);
    doc.text("Customer Details", 14, 65);
    doc.setFontSize(9);
    const address = order.address?.[0] || {};
    doc.text(`Name: ${address.fullname || "N/A"}`, 14, 72);
    doc.text(`Phone: ${address.phonenumber || "N/A"}`, 14, 78);
    doc.text(`Address: ${address.landmark || ""}, ${address.city || ""}`, 14, 84);
    doc.text(`Pincode: ${address.pincode || ""}`, 14, 90);
  
    // 📦 Table for Ordered Products
    autoTable(doc, {
      startY: 100,
      head: [["Product", "Size", "Quantity", "Price", "Total"]],
      body: order.products.map((product) => [
        product.productname,
        product.unitid || "N/A",
        product.minimum_order_quantity,
        `₹ ${product.price}`,
        `₹ ${product.minimum_order_quantity * product.price}`,
      ]),
      theme: "striped", // Options: "grid", "striped", "plain"
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [44, 62, 80], // Dark Blue Header
        textColor: [255, 255, 255], // White Text
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Light Gray Alternate Row
      },
    });
  
    // 🏷️ Grand Total Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80);
    doc.text(`Grand Total: ₹ ${order.subtotal || 0}.00`, 14, doc.lastAutoTable.finalY + 10);
  
    // ✨ Footer: Thank You Message
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for your purchase!", 14, doc.lastAutoTable.finalY + 20);
  
    // 📥 Save PDF
    doc.save(`Invoice_${order._id}.pdf`);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {order ? (
        <>
          {/* Order Details Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Order Details</h2>
            <table className="w-full border-collapse border bg-gray-100 rounded-lg">
              <thead>
                <tr className="border-b text-left bg-gray-200">
                  <th className="p-3 border">Shop</th>
                  <th className="p-3 border">Owner</th>
                  <th className="p-3 border">Mobile</th>
                  <th className="p-3 border">Address</th>
                  <th className="p-3 border">Order Date</th>
                  <th className="p-3 border">Total Amount</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {order.UserData.map((orderItem, index) => (
                  <tr key={index} className="border-b text-sm">
                    <td className="p-3 border">{orderItem.shopname}</td>
                    <td className="p-3 border">{orderItem.username}</td>
                    <td className="p-3 border">{orderItem.phonenumber}</td>
                    <td className="p-3 border">
                      {order.address.map((address) => (
                        <div key={address._id} className="mb-2">
                          <p>{address.fullname}</p>
                          <p>{address.phonenumber}</p>
                          <p>{address.landmark}</p>
                          <p>{address.pincode}</p>
                          <p>{address.city}</p>
                        </div>
                      ))}
                    </td>
                    <td className="p-3 border">{new Date(order.orderDate).toLocaleString()}</td>
                    <td className="p-3 border font-semibold">₹ {order.subtotal || 0}</td>
                    <td className="p-3 border">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Order Confirmed">Order Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                      <button
                        onClick={() => handleUpdateStatus(orderItem._id)}
                        className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Products Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Ordered Products</h2>
            <table className="w-full border-collapse border bg-white shadow-md rounded-lg">
              <thead>
                <tr className="border-b bg-gray-200">
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Size</th>
                  <th className="p-3 border">Quantity</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.products?.map((product, idx) => (
                  <tr key={idx} className="border-b text-center text-sm">
                    <td className="p-3 border">{product.productname}</td>
                    <td className="p-3 border flex justify-center items-center">
                      {product.product_img ? (
                        <img
                          src={product.product_img}
                          alt="Product"
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="p-3 border">{product.unitid || "Null"}</td>
                    <td className="p-3 border">{product.minimum_order_quantity}</td>
                    <td className="p-3 border">₹ {product.price}</td>
                    <td className="p-3 border font-semibold">
                      ₹ {product.minimum_order_quantity * product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grand Total Section */}
          <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-6">
            <h3 className="text-lg font-semibold">GRAND TOTAL</h3>
            <h3 className="text-xl font-bold">₹ {order.subtotal || 0}.00</h3>
          </div>

          {/* Invoice Download Section */}
          <div className="flex justify-end">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
              onClick={generateInvoice}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.707 12.707a1 1 0 01-1.414 0L5 10.414V17a1 1 0 11-2 0v-6.586l-2.293 2.293a1 1 0 11-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download Invoice
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center mt-4">No order found.</p>
      )}

      {loading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
          <span className="text-2xl font-medium text-green-700">Updating...</span>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
