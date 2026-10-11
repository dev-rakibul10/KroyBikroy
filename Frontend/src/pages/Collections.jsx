import { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const CATEGORIES = ["Men", "Women", "Kids"];
const TYPES = ["TopWear", "BottomWear", "Winter"];

// Defined OUTSIDE Collections (see note below)
const FilterGroup = ({ title, options, selected, onToggle, className }) => (
  <div className={`border border-line px-5 py-4 ${className}`}>
    <p className="mb-4 text-xs font-medium tracking-[0.25em] text-fg">
      {title}
    </p>
    <div className="flex flex-col gap-3 text-sm text-muted">
      {options.map((option) => (
        <label
          key={option}
          className="group flex cursor-pointer items-center gap-3"
        >
          <input
            type="checkbox"
            className="peer sr-only"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
          />
          {/* custom checkbox box, styled from the hidden input's state */}
          <span className="flex h-4 w-4 shrink-0 items-center justify-center border border-muted transition peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-surface peer-checked:[&>svg]:opacity-100">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-fg opacity-0 transition-opacity"
            >
              <path d="M5 12l5 5 9-10" />
            </svg>
          </span>
          <span className="transition-colors group-hover:text-fg peer-checked:font-medium peer-checked:text-fg">
            {option}
          </span>
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
  const activeCount = category.length + subCategory.length;

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60 sm:sticky sm:top-24">
        <div className="my-2 flex items-center justify-between">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="flex cursor-pointer items-center gap-2 text-xl text-fg"
          >
            FILTERS
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] text-primary-fg">
                {activeCount}
              </span>
            )}
            <img
              src={assets.dropdown_icon}
              className={`h-3 transition-transform duration-300 sm:hidden dark:invert ${
                showFilter ? "rotate-90" : ""
              }`}
              alt=""
            />
          </p>
          {activeCount > 0 && (
            <button
              onClick={clearFilters}
              className="cursor-pointer text-xs tracking-wide text-muted underline underline-offset-4 transition-colors hover:text-fg"
            >
              Clear all
            </button>
          )}
        </div>

        <FilterGroup
          title="CATEGORIES"
          options={CATEGORIES}
          selected={category}
          onToggle={(v) => toggleValue(setCategory, v)}
          className={`mt-6 ${mobileHidden} sm:block`}
        />
        <FilterGroup
          title="TYPE"
          options={TYPES}
          selected={subCategory}
          onToggle={(v) => toggleValue(setSubCategory, v)}
          className={`my-5 ${mobileHidden} sm:block`}
        />
      </div>

      {/* Right side */}
      <div className="flex-1">
        <div className="flex items-center justify-between text-base sm:text-2xl mb-2">
          <Title txt1="ALL" txt2="COLLECTIONS" />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="cursor-pointer border border-line bg-surface px-3 py-2 text-sm text-fg outline-none transition-colors hover:border-muted focus:border-primary"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <p className="mb-6 text-xs tracking-[0.2em] text-muted">
          {displayProducts.length}{" "}
          {displayProducts.length === 1 ? "PRODUCT" : "PRODUCTS"}
        </p>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
            {displayProducts.map((item, index) => (
              <div
                key={item._id}
                className="page-in"
                style={{ animationDelay: `${Math.min(index, 11) * 45}ms` }}
              >
                <ProductItem
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="page-in flex flex-col items-center border border-dashed border-line px-6 py-20 text-center">
            <p className="prata-regular text-2xl text-fg">
              Nothing matches those filters
            </p>
            <p className="mt-2 text-sm text-muted">
              Try removing a filter or searching for something else.
            </p>
            {activeCount > 0 && (
              <button
                onClick={clearFilters}
                className="mt-6 cursor-pointer bg-primary px-8 py-3 text-xs tracking-[0.2em] text-primary-fg transition hover:opacity-80"
              >
                CLEAR FILTERS
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
