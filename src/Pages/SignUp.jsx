import SignUpImg from "./../assets/images/signup.gif";
import avatar from "./../assets/images/doctor-img01.png";
const SignUp = () => {
  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* {-----------image------------} */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={SignUpImg}
                alt="image"
                className=" w-full rounded-l-lg"
              />
            </figure>
          </div>
          {/* {-----------signup form------------} */}
          <div className="bg-white rounded-r-lg lg:pl-16 p-10">
            <h3 className="text-[22px] font-bold mb-10 leading-9 text-headingColor">
              Create an<span className="text-primaryColor">account</span>
            </h3>
            <form className="">
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value=""
                  required
                  className="w-full py-3 pr-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value=""
                  required
                  className="w-full py-3 pr-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value=""
                  required
                  className="w-full py-3 pr-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor text-[16px] font-bold leading-7">
                  Are you a:
                  <select
                    name="role"
                    className="text-textColor text-[15px] font-semibold leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label className="text-headingColor text-[16px] font-bold leading-7">
                  Gender:
                  <select
                    name="role"
                    className="text-textColor text-[15px] font-semibold leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center gap-5">
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img
                    src={avatar}
                    alt="Avatar Image"
                    className="w-full rounded-full"
                  />
                </figure>

                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    accept=".png, .jpg"
                    className="ab"
                  />
                  <label htmlFor="customFile"></label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
