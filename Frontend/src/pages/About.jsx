import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const reasons = [
  {
    title: "Quality Assurance:",
    text: "We carefully select and vet every product to make sure it meets our quality standards before it reaches you.",
  },
  {
    title: "Convenience:",
    text: "Browse, order and pay in a few taps, with cash on delivery available and easy returns if something isn't right.",
  },
  {
    title: "Exceptional Customer Service:",
    text: "Our support team is here around the clock to help with orders, exchanges and anything else you need.",
  },
];

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title txt1={"ABOUT"} txt2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px] dark:brightness-90"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-muted">
          <p>
            KroyBikroy was born out of a passion for innovation and a desire to
            change the way people shop online. Our journey began with a simple
            idea: to give customers a platform where they can easily discover,
            explore and buy a wide range of products from the comfort of their
            own home.
          </p>
          <p>
            Since day one we have worked with trusted suppliers and sellers
            across Bangladesh to bring you everything from everyday essentials
            to the latest trends, all in one place. Every listing is checked for
            quality, and every order is packed with care before it reaches your
            door.
          </p>
          <b className="text-fg">Our Mission</b>
          <p>
            Our mission is to give shoppers choice, convenience and confidence.
            We want buying online to feel simple, safe and reliable, from the
            first click to the moment your parcel arrives.
          </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title txt1={"WHY"} txt2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"
          >
            <b className="text-fg">{reason.title}</b>
            <p className="text-muted">{reason.text}</p>
          </div>
        ))}
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
