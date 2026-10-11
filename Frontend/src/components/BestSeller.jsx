import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const bestSeller = products.filter((item) => item.bestseller).slice(0, 5);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title txt1={`BEST`} txt2={`SELLERS`} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-muted">
          The pieces our customers keep coming back for, loved for their fit,
          comfort and staying power.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
