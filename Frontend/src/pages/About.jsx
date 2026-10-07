import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title txt1={"ABOUT"} txt2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 ">
          <p>
            KroyBikroy was born out of passion for innovation and a desire to
            revolution the way people shop online. Our journey begun with a
            simple idea: to provide a platform where customers can easily
            discover,explore and purchase a wide range of products from the
            comport of their house{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias amet
            consequatur quo nostrum ea inventore. Quam vel officiis nemo
            doloribus labore voluptas placeat, sit velit voluptates. Quam
            perspiciatis iure maxime.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            rerum nihil id magnam. Eum tempora, laboriosam, non eius, eos minus
            praesentium distinctio placeat assumenda velit sint accusamus hic
            adipisci itaque.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title txt1={"WHY"} txt2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Reprehenderit, adipisci?We meticulously select & vest each product
            to ensure that it meets out quality standards
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            voluptatibus.We meticulously select & vest each product to ensure
            that it meets out quality standards
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            {" "}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            veniam quaerat quidem error doloremque. Tempore tenetur porro soluta
            sequi perferendis
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
