import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate }= useContext(ShopContext);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/*--------------LEFT SIDE------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title txt1={"DELIVERY"} txt2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          placeholder="Street Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="District"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Sub-district        ex:Bheramara"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="ZipCode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-2">
          <select
            aria-label="Country code"
            defaultValue="+880"
            className="w-28 shrink-0 border border-gray-300 rounded py-1.5 px-3.5"
          >
            <option value="+880">BD +880</option>
            <option value="+1">US +1</option>
            <option value="+44">UK +44</option>
            <option value="+91">IN +91</option>
          </select>

          <input
            type="tel"
            inputMode="numeric"
            placeholder="Phone number"
            aria-label="Phone number"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
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
            <div onClick={() => setMethod('bkash')} className="flex items-center gap-3 border p-2 px-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'bkash' ? 'bg-green-500': ''}`}></p>
              <img src={assets.bksash_logo} className="h-7 mx-4" alt="" />
            </div>
            <div onClick={() => setMethod('nagad')} className="flex items-center gap-3 border  p-2 px-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'nagad' ? 'bg-green-500': ''}`}></p>
              <img src={assets.nagad_logo} className="h-7 mx-4" alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border  p-2 px-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500': ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button onClick={() => navigate('/orders')} className="bg-black text-white px-16 py-3 text-sm rounded">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
