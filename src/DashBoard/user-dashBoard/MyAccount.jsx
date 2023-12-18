import userImg from "../../assets/images/doctor-img01.png";
import React, { useContext, useState } from "react";
import { authContext } from "./../../context/AuthContext";
import { BASEURL } from "./../../config";
import useFetchData from "../../hooks/useFetchData";
import { HashLoader } from "react-spinners";
import Mybookings from "./Mybookings";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const MyAccount = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const backdrops = ["blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const { user, role, token } = useContext(authContext);
  const navigate = useNavigate();

  const {
    data: userData,
    loading,
    error,
  } = useFetchData(`${BASEURL}/users/profile/me`);

  //   console.log(userData);

  const deleteAccount = () => {
    fetch(`${BASEURL}/users/${userData._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    });
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="max-w-[1170px] py-8 mx-auto ">
      <div className="flex flex-wrap gap-24">
        <div className="flex justify-center">
          {loading && !error && (
            <HashLoader className="text-center " color="#4169E1" />
          )}
        </div>

        {error && <h1 className="text-2xl text-center">UnAuthorized 😢</h1>}
      </div>
      <div className="mx-auto w-[80%]">
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center ">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  {user?.photo ? (
                    <img
                      src={user?.photo}
                      alt=""
                      className="w-full h-full  rounded-full"
                    />
                  ) : (
                    <img
                      src={userImg}
                      alt=""
                      className="w-full h-full  rounded-full"
                    />
                  )}
                </figure>
              </div>
              <div className="text-center mt-4 ">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {user?.name ? user?.name : "UserName"}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium ">
                  {user?.email ? user?.email : "example@gmail.com"}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type :
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {user?.bloodType ? user?.bloodType : "o-"}
                  </span>
                  {/* <p>{token}</p> */}
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px] flex items-center flex-col ">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Logout
                </button>
                {backdrops.map((b) => (
                  <Button
                    key={b}
                    variant="flat"
                    color="warning"
                    onPress={() => handleOpen(b)}
                    className="w-full mt-3 bg-red-500 p-3 text-[16px] leading-7 rounded-md text-white"
                  >
                    Delete Account
                  </Button>
                ))}
                <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Delete Your Account
                        </ModalHeader>
                        <ModalBody>
                          <p>
                            Are you sure you want to delete your account? This
                            action is irreversible and will result in the
                            permanent loss of your data and connections. Please
                            think carefully before proceeding.
                          </p>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button color="primary" onPress={deleteAccount}>
                            Delete
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
                {/* <button
                onClick={deleteAccount}
                className="w-full mt-3 bg-red-500 p-3 text-[16px] leading-7 rounded-md text-white"
              >
                Delete Account
              </button> */}
              </div>
            </div>
            <div className="md:col-span-2 md:-[30px]">
              <div className="gap-2 flex">
                <div>
                  <button
                    onClick={() => setTab("bookings")}
                    className={`${
                      tab === "bookings" &&
                      "bg-primaryColor text-white font-medium"
                    } p-2  px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                  >
                    My Bookings
                  </button>
                </div>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-medium"
                  } p-2  px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              <div>{tab === "bookings" && <Mybookings />}</div>
              <div>{tab === "settings" && <Profile user={userData} />}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
