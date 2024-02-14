import { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}
const UtilityButton: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="h-[38px] bg-[#343538] px-[20px] rounded-md text-[#FFFFFF] font-[500] text-[12px]"
    >
      {children}
    </button>
  );
};

export default UtilityButton;
