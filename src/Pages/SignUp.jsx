/* eslint-disable no-unused-vars */
import { useState } from "react";
import SignUpImg from "./../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import uploadtoCloudinary from "../utils/uploadCloud";
import { IoIosCloudUpload } from "react-icons/io";
import { BASEURL } from "../config";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const heandleInputChang = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const heandleFileInputChang = async (event) => {
    const file = event.target.files[0];
    // leater we will use upload file image
    const data = await uploadtoCloudinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
    console.log(data);
  };

  const submitHeandler = async (event) => {
    console.log(formData);
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASEURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);

      

      toast.success(message);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* {-----------image------------} */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-lg">
              <img src={SignUpImg} alt="image" className=" w-full rounded-lg" />
            </figure>
          </div>
          {/* {-----------signup form------------} */}
          <div className="bg-white rounded-r-lg lg:pl-16 p-10">
            <h3 className="text-[22px] font-bold mb-10 leading-9 text-headingColor">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form onSubmit={submitHeandler}>
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={heandleInputChang}
                  required
                  className="w-full py-3 pr-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={heandleInputChang}
                  required
                  className="w-full py-3 pr-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={heandleInputChang}
                  required
                  className="w-full py-3 pr-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor text-[16px] font-bold leading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={heandleInputChang}
                    className="text-textColor text-[15px] font-semibold leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label className="text-headingColor text-[16px] font-bold leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.name}
                    onChange={heandleInputChang}
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
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img
                      src={previewURL}
                      alt="Avatar Image"
                      className="w-full rounded-full"
                    />
                  </figure>
                )}

                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={heandleFileInputChang}
                    accept=".png, .jpg , .gif"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute gap-1 top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                    <IoIosCloudUpload />
                  </label>
                </div>
              </div>
              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? (
                    <HashLoader size={35} color="#36d7b7" />
                  ) : (
                    "Signup"
                  )}
                </button>
              </div>
              <p className="text-center text-textColor mt-5">
                Already have an account?{" "}
                <Link to="/login" className="text-primaryColor font-medium">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
