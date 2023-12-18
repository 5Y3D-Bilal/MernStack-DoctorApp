/*eslint-disable*/
import { useEffect } from "react";
import { faqs } from "./../../assets/data/faqs";
import FaqItem from "./FaqItem";
import AOS from "aos";
import "aos/dist/aos.css";

const FaqList = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <ul className="mt-[38px]">
      {faqs.map((item, index) => {
        return (
          <FaqItem
            
            item={item}
            key={index}
          />
        );
      })}
    </ul>
  );
};

export default FaqList;
