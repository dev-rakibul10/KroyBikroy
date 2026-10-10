import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const EditProduct = ({ token }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  //add here if u wanna add more categories
  const categories = ["Men", "Women", "Kids"];

  const subCategories = ["TopWear", "BottomWear", "WinterWear"];

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestSeller: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/products/${productId}`,
        );

        if (response.data.success) {
          const item = response.data.product;

          setProduct({
            name: item.name ?? "",
            description: item.description ?? "",
            price: item.price ?? "",
            category: item.category ?? "",
            subCategory: item.subCategory ?? "",
            sizes: item.sizes ?? [],
            bestSeller: item.bestSeller ?? false,
          });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${backendUrl}/api/products/${productId}`,
        {
          ...product,
          price: Number(product.price),
        },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-lg"
    >
      <h2 className="text-lg font-semibold">Edit Product</h2>

      <label>
        Product name
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full border p-2 mt-2"
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          className="w-full border p-2 mt-2"
        />
      </label>

      <label>
        Price
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          min="0"
          required
          className="w-full border p-2 mt-2"
        />
      </label>

      <label>
        Category
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full border p-2 mt-2"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Subcategory
        <select
          name="subCategory"
          value={product.subCategory}
          onChange={handleChange}
          required
          className="w-full border p-2 mt-2"
        >
          <option value="">Select a subcategory</option>

          {subCategories.map((subCategory) => (
            <option key={subCategory} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={product.bestSeller}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              bestSeller: e.target.checked,
            }))
          }
        />
        Bestseller
      </label>

      <button type="submit" className="bg-black text-white p-3 cursor-pointer">
        Update Product
      </button>
    </form>
  );
};

export default EditProduct;
