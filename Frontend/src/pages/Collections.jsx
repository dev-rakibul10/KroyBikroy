import { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const CATEGORIES = ["Men", "Women", "Kids"];
const TYPES = ["Topwear", "Bottomwear", "Winterwear"];

// Defined OUTSIDE Collections (see note below)
const FilterGroup = ({ title, options, onToggle, className }) => (
  <div className={`border border-gray-300 pl-5 py-3 ${className}`}>
    <p className="mb-3 text-sm font-medium">{title}</p>
    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
      {options.map((option) => (
        <label key={option} className="flex gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-3"
            value={option}
            onChange={() => onToggle(option)}
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

// Works for any array state: adds the value if missing, removes it if present
const toggleValue = (setter, value) => {
  setter((prev) =>
    prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
  );
};

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const displayProducts = useMemo(() => {
    // .filter() returns a NEW array, so sorting it in place is safe
    const result = products.filter(
      (item) =>
        (category.length === 0 || category.includes(item.category)) &&
        (subCategory.length === 0 || subCategory.includes(item.subCategory)) &&
        (!showSearch || !search.trim() ||
        item.name.toLowerCase().includes(search.trim().toLowerCase()))
    );

    if (sortType === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortType === "high-low") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, category, subCategory, sortType, search, showSearch]);

  const mobileHidden = showFilter ? "" : "hidden";

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        <FilterGroup
          title="CATEGORIES"
          options={CATEGORIES}
          onToggle={(v) => toggleValue(setCategory, v)}
          className={`mt-6 ${mobileHidden} sm:block`}
        />
        <FilterGroup
          title="TYPE"
          options={TYPES}
          onToggle={(v) => toggleValue(setSubCategory, v)}
          className={`my-5 ${mobileHidden} sm:block`}
        />
      </div>

      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title txt1="ALL" txt2="COLLECTIONS" />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {displayProducts.map((item) => (
            <ProductItem
              key={item._id}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
