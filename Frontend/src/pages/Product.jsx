import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);

  const productData = products.find((item) => item._id === productId);

  if (!productData) return <div className="opacity-0"></div>;

  // key={productId}: a new product means a brand-new component,
  // so all the state below resets on its own
  return <ProductDetails key={productId} productData={productData} />;
};

const rating = 4; // placeholder until reviews come from a backend
const reviewCount = 122;

const perks = [
  { title: "100% Original", text: "Authentic products only" },
  { title: "Cash on Delivery", text: "Pay when it arrives" },
  { title: "Easy Returns", text: "Exchange within 7 days" },
];

const ProductDetails = ({ productData }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(null); // null, or {x, y} in percent
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // clicked image if there is one, otherwise the first image
  const image = selectedImage ?? productData.image[0];
  const imageIndex = productData.image.indexOf(image);

  // reset the "Added" label after a moment
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);

  const handleZoom = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleAddToCart = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addToCart(productData._id, size);
    setAdded(true);
  };

  return (
    <div className="border-t pt-8 page-in">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        <span>/</span>
        <Link to="/collections" className="hover:text-black">
          Collection
        </Link>
        <span>/</span>
        <span className="text-[#414141]">{productData.name}</span>
      </nav>

      <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
        {/* Gallery */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto sm:max-h-[36rem] sm:w-[17%] sm:flex-col sm:overflow-y-auto sm:overflow-x-hidden">
            {productData.image.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(item)}
                className={`aspect-[4/5] w-[22%] shrink-0 cursor-pointer overflow-hidden border transition sm:w-full ${
                  item === image
                    ? "border-black"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={item} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image with hover zoom */}
          <div
            onMouseMove={handleZoom}
            onMouseLeave={() => setZoom(null)}
            className="relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-gray-50 sm:w-[83%]"
          >
            <img
              src={image}
              alt={productData.name}
              style={{
                transform: zoom ? "scale(1.8)" : "scale(1)",
                transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center",
              }}
              className="h-full w-full object-cover transition-transform duration-200 ease-out"
            />
            <span className="absolute bottom-3 left-3 bg-white/70 px-3 py-1 text-[10px] tracking-[0.25em] text-[#414141] backdrop-blur-sm">
              {imageIndex + 1} / {productData.image.length}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 self-start sm:sticky sm:top-24">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            {productData.category} · {productData.subCategory}
          </p>
          <h1 className="prata-regular mt-3 text-3xl leading-tight text-[#1f1b3a] lg:text-4xl">
            {productData.name}
          </h1>

          <div className="mt-3 flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <img
                key={i}
                src={i < rating ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="w-3.5"
              />
            ))}
            <p className="pl-2 text-sm text-gray-500">
              ({reviewCount} reviews)
            </p>
          </div>

          <p className="mt-6 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 leading-relaxed text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* Size selector */}
          <div className="my-8 flex flex-col gap-3">
            <div className="flex items-center justify-between sm:w-4/5">
              <p className="text-sm font-medium tracking-wide">SELECT SIZE</p>
              {sizeError && (
                <p className="text-xs text-red-500">Please pick a size first</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSize(item);
                    setSizeError(false);
                  }}
                  className={`min-w-12 cursor-pointer border px-4 py-2 text-sm transition ${
                    item === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full cursor-pointer px-8 py-3.5 text-sm tracking-[0.2em] text-white transition-colors duration-300 sm:w-4/5 ${
              added ? "bg-green-700" : "bg-black hover:bg-gray-700"
            }`}
          >
            {added ? "ADDED TO CART ✓" : "ADD TO CART"}
          </button>

          {/* Perks */}
          <div className="mt-8 grid grid-cols-3 border border-gray-200 sm:w-4/5">
            {perks.map((perk, i) => (
              <div
                key={perk.title}
                className={`px-3 py-4 text-center ${i > 0 ? "border-l border-gray-200" : ""}`}
              >
                <p className="text-xs font-medium text-[#414141]">
                  {perk.title}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">{perk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description & Reviews tabs */}
      <div className="mt-20">
        <div className="flex border-b border-gray-200">
          {[
            { id: "description", label: "Description" },
            { id: "reviews", label: `Reviews (${reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px cursor-pointer border-b-2 px-5 py-3 text-sm transition ${
                activeTab === tab.id
                  ? "border-black font-medium text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="py-6 text-sm leading-relaxed text-gray-500">
          {activeTab === "description" ? (
            <p className="max-w-3xl">{productData.description}</p>
          ) : (
            <p>No written reviews yet. Be the first to share your thoughts.</p>
          )}
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        currentId={productData._id}
      />
    </div>
  );
};

export default Product;
