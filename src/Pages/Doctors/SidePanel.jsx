const sidePanel = () => {
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between ">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          500 BDT
        </span>
      </div>

      <div className="mt-[30px] ">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots
        </p>
        <ul className="mt-3">
          <li className="mb-3 flex items-center justify-between">
            <p className="text-[15px] text-textColor leading-6 font-semibold">
              Sunday
            </p>
            <p className="text-[15px] text-textColor leading-6 font-semibold">
              10:00 AM - 12:00 PM
            </p>
          </li>
          <li className="mb-3 flex items-center justify-between">
            <p className="text-[15px] text-textColor leading-6 font-semibold">
              Monday
            </p>
            <p className="text-[15px] text-textColor leading-6 font-semibold">
              02:00 PM - 10:00 PM
            </p>
          </li>
          <li className="mb-3 flex items-center justify-between">
            <p className="text-[15px] text-textColor leading-6 font-semibold">
              Friday
            </p>
            <p className="text-[15px] text-textColor leading-6 font-semibold">
              09:30 AM - 12:00 AM
            </p>
          </li>
        </ul>
      </div>
      <button className="btn px-2 w-full rounded-md">Book Appoinment</button>
    </div>
  );
};

export default sidePanel;
