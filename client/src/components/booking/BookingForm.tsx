import { useForm } from "react-hook-form";
import { Form } from "../common/Form";
import { Inputs } from "./inputs";
import { Input } from "../common/Input";
import useBooking from "../../hooks/useBooking";
import { Button } from "../common/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface BookingFormProps {
  id: string;
}

const BookingForm = ({ id }: BookingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      guests: 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    },
  });
  const { createBooking } = useBooking();
  const navigate = useNavigate();

  const onSubmit = async (data: Inputs) => {
    const bookingData = {
      property: id,
      guests: Number(data.guests),
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };

    const res = await createBooking(bookingData);

    if (res.success) {
      toast("Reserva creada con éxito", {
        icon: "✅",
        duration: 3000,
        position: "top-center",
      });
      navigate("/bookings");
    } else {
      res.message.split(",").map((error: string) => {
        toast(error, {
          icon: "❌",
          duration: 5000,
          position: "top-center",
        });
      });
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      className="mt-4 border border-gray-100 p-6 rounded-lg shadow-md flex flex-col text-sm"
    >
      <Input
        label="Número de invitados"
        register={register}
        name="guests"
        error={errors.guests}
        type="number"
        validation={{
          required: "Guests is required",
        }}
      ></Input>
      <Input
        label="Fecha de entrada"
        type="date"
        register={register}
        name="startDate"
        error={errors.startDate}
        validation={{
          required: "Start date is required",
        }}
      ></Input>
      <Input
        label="Fecha de salida"
        type="date"
        register={register}
        name="endDate"
        error={errors.endDate}
        validation={{
          required: "End date is required",
        }}
      ></Input>
      <Button
        type="submit"
        name="Alquilar"
        className="text-white font-semibold rounded-md bg-[#ff07c1] px-6 py-2 hover:bg-[#ff07c1] hover:opacity-80 transition-all duration-300 mt-4"
      ></Button>
    </Form>
  );
};

export default BookingForm;
