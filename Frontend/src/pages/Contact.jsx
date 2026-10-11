import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-20 border-t">
        <Title txt1={"CONTACT"} txt2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-120 dark:brightness-90"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-fg">Our Store</p>
          <p className="text-muted">
            54709 willms Station <br /> Uttara,Dhaka,Bangladesh
          </p>
          <p className="text-muted">
            Tel (+880) 01310842691 <br /> contact@protonmail.com
          </p>
          <p className="font-semibold text-xl text-fg">Careers at kroyBikroy</p>
          <p className="text-muted">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-primary px-8 py-4 text-sm text-fg hover:bg-primary hover:text-primary-fg transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
