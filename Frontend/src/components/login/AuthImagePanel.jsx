import { assets } from "../../assets/assets";

const AuthImagePanel = () => (
  <div className="relative hidden lg:block">
    <img
      src={assets.pedi_hero}
      alt=""
      className="absolute inset-0 h-full w-full object-cover dark:brightness-90"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#14112b]/80 via-[#14112b]/20 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-10 text-white">
      <div className="flex items-center gap-3">
        <p className="h-0.5 w-8 bg-white"></p>
        <p className="text-xs tracking-[0.3em]">THE FOOTBALL EDIT</p>
      </div>
      <p className="prata-regular mt-4 text-4xl leading-tight">
        Dress like it's
        <span className="block">match day.</span>
      </p>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
        Join to save your favourites, check out faster, and never miss a new
        drop.
      </p>
    </div>
  </div>
);

export default AuthImagePanel;
