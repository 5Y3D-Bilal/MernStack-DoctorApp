/* eslint-disable */
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-3 lg:pt-5 rounded-[12px] border border-solid border-[#d9dce2] mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5"
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] lg:text-[22px] leading-7 lg:leading-8 text-headingColor">
          {item.question}
        </h4>
        <div
          className={`${
            isOpen && "bg-primaryColor text-white border-none"
          } flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded border border-solid border-[#141f21]`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-4">
          <p className="text-[14px] lg:text-[16px] leading-6 lg:leading-7 font-[400] text-textColor">
            {item.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;
