import { User } from "lucide-react";
import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/use-theme.tsx";
import { ParticleComponent } from "../components/particle-component.tsx";
import IconEmailOutline from "../components/svg/email-svg.tsx";
import IconUnlock from "../components/svg/unlock-svg.tsx";
import IconLock from "../components/svg/lock-svg.tsx";
import { useDocumentTitle } from "usehooks-ts";
import { ToastContainer, toast } from "react-toastify";

const FormSchema = z.object({
  username: z.string({ required_error: "Must be filled!" }),
  email: z
    .string({
      invalid_type_error: "value must an email!",
      required_error: "Must be filled!",
    })
    .email(),
  password: z.string({ required_error: "Must be filled!" }),
});

export default function SignupPage() {
  useDocumentTitle("TaskEase - Signup");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document?.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleShowPassword = () => {
    setIsShowPassword((prevValue) => !prevValue);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const isFilled =
    Object.keys(dirtyFields).length === Object.keys(FormSchema.shape).length;

  const onSubmit = handleSubmit(async (formData) => {
    await axios
      .post("http://localhost:3000/api/user/signup", formData)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          delay: 1500,
          theme:
            theme === "dark" ? "dark" : theme === "light" ? "light" : "colored",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-base-100">
      <ParticleComponent isDark={theme === "dark"} hoverGesture />
      <div className="flex flex-col overflow-hidden rounded-md lg:h-fit pb-6 bg-base-300 z-50 px-14 h-[80%] shadow-lg ">
        {/* Login Form */}
        <div className="h-full justify-start flex flex-col gap-8 pt-12">
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                className="font-semibold text-sm opacity-70"
              >
                Username
              </label>
              <div className="relative w-full border-b-[1px]">
                <div className="absolute inset-y-0 -start-2 flex items-center ps-3 pointer-events-none">
                  <User className="opacity-50 w-6 h-6 cursor-pointer" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="bg-base-300 focus:outline-none text-sm rounded-lg block w-full ps-10 p-2.5 focus:bg-base-200 transition group"
                  placeholder="Type your Username"
                  {...register("username")}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="font-semibold text-sm opacity-70"
              >
                Email
              </label>
              <div className="relative w-full border-b-[1px]">
                <div className="absolute inset-y-0 -start-2 flex items-center ps-3 pointer-events-none">
                  <IconEmailOutline className="opacity-50 w-6 h-6 cursor-pointer" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="bg-base-300 focus:outline-none text-sm rounded-lg block w-full ps-10 p-2.5 focus:bg-base-200 transition group"
                  placeholder="Type your Email Address"
                  {...register("email")}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="font-semibold text-sm opacity-70"
              >
                Password
              </label>
              <div className="relative w-full border-b-[1px]">
                <div className="absolute inset-y-0 -start-2 flex items-center ps-3">
                  {isShowPassword ? (
                    <IconUnlock
                      className="opacity-50 w-6 h-6 cursor-pointer"
                      onClick={toggleShowPassword}
                    />
                  ) : (
                    <IconLock
                      className="opacity-50 w-6 h-6 cursor-pointer"
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
                <input
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Type your Password"
                  className="bg-base-300 focus:outline-none text-sm rounded-lg block w-full ps-10 p-2.5 focus:bg-base-200 transition group"
                  {...register("password")}
                  required
                />
              </div>
            </div>
            {errors && (
              <div className="text-red-500">
                {Object.values(errors).map((error, index) => (
                  <p key={index}>{error.message}</p>
                ))}
              </div>
            )}
          </div>
          <button
            disabled={!isFilled || isSubmitting}
            onClick={onSubmit}
            type="submit"
            className="btn btn-primary btn-sm rounded-full w-full btn-square"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>loading
              </>
            ) : (
              <>Register</>
            )}
          </button>
          <button
            className="btn btn-link opacity-60 hover:opacity-100"
            onClick={() => navigate("/login")}
          >
            Already have an account ?
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
