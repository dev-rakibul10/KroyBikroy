const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-fg">
        Subscribe now & get 20% off
      </p>
      <p className="text-muted mt-5 mb-5">
        Join our list for early access to new drops, football-inspired
        collections and members-only offers. No spam, unsubscribe anytime.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto border border-line pl-3 transition-colors focus-within:border-primary"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 bg-transparent text-fg placeholder:text-muted outline-none"
          required
        />
        <button
          type="submit"
          className="bg-primary text-primary-fg text-xs px-10 py-4 cursor-pointer transition hover:opacity-80"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
