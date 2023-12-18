import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import uploadtoCloudinary from "../../utils/uploadCloud";
import { IoIosCloudUpload } from "react-icons/io";
import { BASEURL, token } from "../../config";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
//   console.log(token)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      password: user.password,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

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
      const res = await fetch(`${BASEURL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);

      toast.success(message);
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <div className="mt-5">
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
            className="w-full py-3 pr-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="bloodType"
            name="bloodType"
            placeholder="BloodType"
            value={formData.bloodType}
            onChange={heandleInputChang}
            required
            className="w-full py-3 pr-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
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
            {loading ? <HashLoader size={35} color="#36d7b7" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
