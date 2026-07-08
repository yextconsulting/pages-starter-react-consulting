import { FaInfoCircle } from "react-icons/fa";

const NotificationBanner = () => {
  return (
    <div className="px-[16px] lg:px-[84px] self-start">
      <div className="bg-brand-primary flex items-center justify-center w-full h-[56px] rounded-[16px] text-brand-white font-gotham text-base">
        <FaInfoCircle className="mr-[10px]" />
        Emergency Notification Banner
      </div>
    </div>
  );
};

export default NotificationBanner;
