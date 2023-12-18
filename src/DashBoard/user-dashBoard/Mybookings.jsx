import useFetchData from "../../hooks/useFetchData";
import { BASEURL } from "../../config";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import { HashLoader } from "react-spinners";

const Mybookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASEURL}/users/appointments/my-appointments`);
  return (
    <div className="">
      <div className="flex justify-center">
        {loading && !error && (
          <HashLoader className="text-center " color="#4169E1" />
        )}
      </div>
      {error && <h1 className="text-2xl text-center">UnAuthorized 😢</h1>}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => {
            <DoctorCard doctor={doctor} key={doctor._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Mybookings;
