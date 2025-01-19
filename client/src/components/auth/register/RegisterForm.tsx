import { useForm } from "react-hook-form";
import { Form } from "../../common/Form";
import { Inputs } from "./inputs";
import useAuth from "../../../hooks/useAuth";
import { Input } from "../../common/Input";
import { Button } from "../../common/Button";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { register: registerUser } = useAuth();

  const onSubmit = async (data: Inputs) => await registerUser(data);

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      className="mt-10 border border-gray-100 p-6 rounded-lg shadow-md flex flex-col"
    >
      <Input
        name="username"
        register={register}
        placeholder="Username"
        error={errors.username}
        validation={{ required: "Username is required" }}
      ></Input>
      <Input
        type="email"
        name="email"
        register={register}
        placeholder="Email"
        error={errors.email}
        validation={{ required: "Email is required" }}
      ></Input>
      <Input
        type="password"
        name="password"
        register={register}
        placeholder="******"
        error={errors.password}
        validation={{
          required: "Password is required",
        }}
      ></Input>
      <Button
        type="submit"
        name="Register"
        className="text-white font-semibold rounded-md bg-[#ff07c1] px-6 py-2 hover:bg-[#ff07c1] hover:opacity-80 transition-all duration-300 mt-4"
      ></Button>
    </Form>
  );
};
