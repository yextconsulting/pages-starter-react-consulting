import whiteGrain from "src/assets/images/button-grain-white.png";
import blueGrain from "src/assets/images/button-grain-blue.png";

type CTAButtonProps = {
  text: string;
  link: string;
  isPrimary?: boolean;
};

const CTAButton = (props: CTAButtonProps) => {
  const { text, link, isPrimary } = props;

  return (
    <div
      className={`relative ${
        isPrimary
          ? "bg-brand-primary text-brand-white"
          : "bg-brand-secondary text-brand-primary"
      } 
      bg-brand-primary w-[328px] h-[64px] rounded-[16px] my-auto text-center text-4xl font-oldStandard`}
    >
      <div className="relative">{text}</div>
      <img
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={isPrimary ? whiteGrain : blueGrain}
      />
    </div>
  );
};

export default CTAButton;
