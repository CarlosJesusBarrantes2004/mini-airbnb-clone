import { useForm } from "react-hook-form";
import { Inputs } from "./inputs";
import { Form } from "../../common/Form";
import useAuth from "../../../hooks/useAuth";
import { Input } from "../../common/Input";
import { Button } from "../../common/Button";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuth();

  const onSubmit = async (data: Inputs) => await login(data);

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      className="mt-10 border border-gray-100 p-6 rounded-lg shadow-md flex flex-col"
    >
      <Input
        register={register}
        name="email"
        placeholder="Email"
        type="email"
        error={errors.email}
        validation={{
          required: "Email is required",
        }}
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
        name="Iniciar sesión"
        className="text-white font-semibold rounded-md bg-[#ff07c1] px-6 py-2 hover:bg-[#ff07c1] hover:opacity-80 transition-all duration-300 mt-4"
      ></Button>
    </Form>
  );
};
