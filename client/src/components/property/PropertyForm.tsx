import { useForm } from "react-hook-form";
import useProperty from "../../hooks/useProperty";
import { Form } from "../common/Form";
import { Inputs, Photo } from "./inputs";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useState } from "react";
import PhotoUploader from "../upload/PhotoUploader";
import toast from "react-hot-toast";

const PropertyForm = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      extraInfo: "",
      price: 0,
      maxGuests: 0,
      location: "",
    },
    mode: "onSubmit",
  });
  const { createProperty } = useProperty();

  const onSubmit = async (data: Inputs) => {
    if (photos.length === 0) {
      toast.error("Tienes que subir una foto", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    const res = await createProperty({ ...data, photos });

    if (res.success) {
      toast.success("Propiedad creada", {
        duration: 3000,
        position: "top-center",
      });
      reset({
        title: "",
        description: "",
        extraInfo: "",
        price: 0,
        maxGuests: 0,
        location: "",
      });
    }
  };

  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        className="mt-4 border border-gray-100 p-6 rounded-lg shadow-md flex flex-col text-sm"
      >
        <Input
          register={register}
          name="title"
          placeholder="Title"
          type="text"
          error={errors.title}
          validation={{ required: "Title is required" }}
        ></Input>
        <Input
          register={register}
          name="description"
          placeholder="Description"
          type="text"
          error={errors.description}
          validation={{ required: "Description is required" }}
        ></Input>
        <Input
          register={register}
          name="extraInfo"
          placeholder="Extra Info"
          type="text"
          error={errors.extraInfo}
          validation={{ required: "Extra Info is required" }}
        ></Input>
        <Input
          register={register}
          name="price"
          placeholder="Price"
          type="number"
          error={errors.price}
          validation={{ required: "Price is required", valueAsNumber: true }}
        ></Input>
        <Input
          register={register}
          name="location"
          placeholder="Location"
          type="text"
          error={errors.location}
          validation={{ required: "Location is required" }}
        ></Input>
        <Input
          register={register}
          name="maxGuests"
          placeholder="Max Guests"
          type="number"
          error={errors.maxGuests}
          validation={{
            required: "Max Guests is required",
            valueAsNumber: true,
          }}
        ></Input>
        <div className="mb-4">
          <h2 className="text-base mb-2 text-gray-600">Photos</h2>
          <PhotoUploader onPhotosChange={setPhotos}></PhotoUploader>
        </div>
        <Button
          type="submit"
          name="Agregar nueva propiedad"
          className="text-white font-semibold rounded-md bg-[#ff07c1] px-6 py-2 hover:bg-[#ff07c1] hover:opacity-80 transition-all duration-300 mt-4"
        ></Button>
      </Form>
    </>
  );
};

export default PropertyForm;
