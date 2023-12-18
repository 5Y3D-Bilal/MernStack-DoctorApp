import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext.jsx";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const heandleInputChang = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHeandler = async (event) => {
    console.log(formData);
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASEURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      console.log(result , "login data")

      setLoading(false);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });

      // toast.success(result.message);
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor ">Wellcom</span> Back
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHeandler}>
          <div className="mb-5">
            <input
              type="email"
              name="email"
              placeholder="Enter your email "
              value={formData.email}
              required
              onChange={heandleInputChang}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              required
              onChange={heandleInputChang}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            />
          </div>
          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size={35} color="#fff" /> : "Login"}
            </button>
          </div>
          <p className="text-center text-textColor mt-5">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primaryColor font-medium">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
