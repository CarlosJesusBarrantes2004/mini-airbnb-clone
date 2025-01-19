import { useParams } from "react-router-dom";
import BookingForm from "../components/booking/BookingForm";

export const CreateBooking = () => {
  const { id } = useParams();

  return <BookingForm id={id}></BookingForm>;
};
