import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

import { useNavigate } from "react-router-dom";

const ProductList = ({ token }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/products/");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/products/delete",
        { id },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ------------- List Table Title------------ */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* ------------- Product List------------ */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border gap-2 text-sm"
            key={index}
          >
            <img src={item.image[0]} alt="" className="w-24 h-24 object-contain rounded-md bg-gray-50 p-1" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {assets.Currency}
              {item.price}
            </p>

            <div className="flex items-center justify-end md:justify-center gap-3">
              <button
                onClick={() => navigate(`/edit-product/${item._id}`)}
                className="text-blue-600 gap-2"
              >
                Edit
              </button>

              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 gap-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
