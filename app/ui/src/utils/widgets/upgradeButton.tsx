import { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}
const UpgradeButton: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 bg-[#1967FC] px-[10px] md:px-[15px] h-[45px] justify-center items-center rounded-[10px] text-[16px] font-[500] text-[#FFFFFF] md:min-w-[172px] shadow-[0px_0px_10px_0px_#0000000F,2px_4px_4px_0px_#FFFFFF8C_inset]"
    >
      {children ? children : "Upgrade"}{" "}
      <img className="hidden sm:block" src="/providers/upgrade.svg" alt="" />
    </button>
  );
};

export default UpgradeButton;
