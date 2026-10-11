import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { assets } from "../assets/assets";

const currency = "৳";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.get(backendUrl + "/api/order/orderlist", {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.patch(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } },
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">All Orders</h3>

      {orders.length === 0 && (
        <p className="mt-6 text-gray-500">No orders yet.</p>
      )}

      <div className="mt-4 flex flex-col gap-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm lg:grid-cols-[auto_2fr_1fr_auto_auto] lg:items-center lg:p-5"
          >
            <img src={assets.parcel_icon} alt="" className="w-12" />

            {/* Items + address */}
            <div>
              <div className="space-y-1 font-medium text-gray-900">
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} × {item.quantity}
                    <span className="ml-2 rounded bg-gray-100 px-1.5 py-0.5 text-xs font-normal text-gray-600">
                      {item.size}
                    </span>
                  </p>
                ))}
              </div>

              <p className="mt-3 font-medium text-gray-900">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="text-gray-500">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Order details */}
            <div className="space-y-1">
              <p>Items: {order.items.length}</p>
              <p>
                Method: <span className="uppercase">{order.paymentMethod}</span>
              </p>
              <p>
                Payment:{" "}
                <span
                  className={`font-medium ${order.payment ? "text-green-600" : "text-amber-600"}`}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>Date: {new Date(order.date).toDateString()}</p>
            </div>

            <p className="text-base font-semibold text-gray-900">
              {currency}
              {order.amount}
            </p>

            <select
              onChange={(e) => statusHandler(e, order._id)}
              defaultValue={order.status}
              className="rounded border border-gray-300 bg-white p-2 text-sm font-medium outline-none focus:border-black"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
