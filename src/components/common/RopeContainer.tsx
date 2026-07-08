import infoBorderImg from "src/assets/images/info-border.png";

type RopeContainerProps = {
  children: React.ReactNode;
  isPadded?: boolean;
};

const RopeContainer = (props: RopeContainerProps) => {
  const { children, isPadded } = props;

  return (
    <div className="bg-brand-white mx-auto lg:mx-0 w-full flex flex-col">
      {/* Top */}
      <div
        style={{
          backgroundImage: `url(${infoBorderImg}`,
          height: "18px",
          backgroundSize: `auto 18px`,
        }}
        className="bg-repeat-x bg-auto w-full"
      />
      {/* Middle */}
      <div className="flex flex-row flex-1">
        {/* Left */}
        {/* <div
        style={{ backgroundImage: `url(${infoBorderImg}`, width: '18px', transform: 'rotate(90deg)', backgroundSize: `auto 18px` }}
        className="bg-repeat-x bg-auto w-full"
        /> */}
        <div className="bg-brand-gray-400 w-[18px]" />{" "}
        {/* TODO: vertical rope image */}
        {/* Content */}
        <div className="flex-1 flex flex-col gap-[16px]">
          <div
            style={isPadded ? { padding: "16px 24px" } : {}}
            className="flex-1 flex flex-col"
          >
            <div className="text-center flex-1 flex flex-col">{children}</div>
          </div>
        </div>
        {/* Right */}
        {/* <div
        style={{ backgroundImage: `url(${infoBorderImg}`, width: '18px', transform: 'rotate(90deg)', backgroundSize: `auto 18px` }}
        className="bg-repeat-x bg-auto w-full"
        /> */}
        <div className="bg-brand-gray-400 w-[18px]" />{" "}
        {/* TODO: vertical rope image */}
      </div>

      {/* Bottom */}
      <div
        style={{
          backgroundImage: `url(${infoBorderImg}`,
          height: "18px",
          backgroundSize: `auto 18px`,
        }}
        className="bg-repeat-x bg-auto w-full"
      />
    </div>
  );
};

export default RopeContainer;
