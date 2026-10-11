import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

// One shared style for every field instead of repeating it nine times
const fieldClass =
  "rounded border border-line bg-surface px-3.5 py-1.5 text-fg outline-none transition placeholder:text-muted focus:border-primary";
const inputClass = `w-full ${fieldClass}`;

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place-order",
            orderData,
            { headers: { token } },
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/*--------------LEFT SIDE------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title txt1={"DELIVERY"} txt2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First name"
            className={inputClass}
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last name"
            className={inputClass}
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email address"
          className={inputClass}
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street Address"
          className={inputClass}
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="District"
            className={inputClass}
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="Sub-district (e.g. Bheramara)"
            className={inputClass}
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="ZipCode"
            className={inputClass}
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className={inputClass}
          />
        </div>
        <div className="flex gap-2">
          <select
            aria-label="Country code"
            defaultValue="+880"
            className={`${fieldClass} w-28 shrink-0`}
          >
            <option value="+880">BD +880</option>
            <option value="+1">US +1</option>
            <option value="+44">UK +44</option>
            <option value="+91">IN +91</option>
          </select>

          <input
            onChange={onChangeHandler}
            name="phone"
            required
            value={formData.phone}
            type="tel"
            inputMode="numeric"
            placeholder="Phone number"
            aria-label="Phone number"
            className={inputClass}
          />
        </div>
      </div>

      {/*--------------RIGHT SIDE------------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title txt1={"PAYMENT"} txt2={"METHOD"} />
          {/*--------------PAYMENT METHOD SECTION------------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("bkash")}
              className="flex items-center gap-3 border p-2 px-2 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "bkash" ? "bg-green-500" : ""}`}
              ></p>
              <img
                src={assets.bksash_logo}
                className="h-7 mx-4 dark:rounded dark:bg-white dark:p-0.5"
                alt=""
              />
            </div>
            <div
              onClick={() => setMethod("nagad")}
              className="flex items-center gap-3 border p-2 px-2 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "nagad" ? "bg-green-500" : ""}`}
              ></p>
              <img
                src={assets.nagad_logo}
                className="h-7 mx-4 dark:rounded dark:bg-white dark:p-0.5"
                alt=""
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-2 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-500" : ""}`}
              ></p>
              <p className="text-muted text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-primary text-primary-fg px-16 py-3 text-sm rounded cursor-pointer transition hover:opacity-80"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
