

const NewsletterBox = () => {
    const onSubmitHandler =(e) => {
        e.preventDefault()
    }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-shadow-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-5 mb-5">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
        modi.
      </p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto border pl-3  ">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none "
          required
        />
        <button type="submit" className="bg-black text-white text-xs px-10 py-4 cursor-pointer">SUBSCRIBE</button>
      </form>
    </div>
  );
};

export default NewsletterBox;
