import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LoginUserResponse } from "../../types.ts";
import { useCookies } from "react-cookie";
import useTheme from "../hooks/use-theme.tsx";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../config/firebase.ts";
import userApi from "../api/user-api.ts";
import IconGithub from "../components/svg/github-svg.tsx";
import IconFacebook from "../components/svg/facebook-svg.tsx";
import { ParticleComponent } from "../components/particle-component.tsx";
import IconLock from "../components/svg/lock-svg.tsx";
import IconUnlock from "../components/svg/unlock-svg.tsx";
import IconEmailOutline from "../components/svg/email-svg.tsx";
import { useBoolean, useDocumentTitle } from "usehooks-ts";
import { ToastContainer, toast } from "react-toastify";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";

const FormSchema = z.object({
  email: z
    .string({
      invalid_type_error: "value must an email!",
      required_error: "Must be filled!",
    })
    .email(),
  password: z.string(),
});

export default function LoginPage() {
  useDocumentTitle("TaskEase - Login");
  const { toggle, value } = useBoolean(false);
  const [tab, setTab] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(["token"]);
  const { isDarkVariant } = useTheme();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const oneDayInSeconds = 86400;

  const isFilled =
    Object.keys(dirtyFields).length === Object.keys(FormSchema.shape).length;

  const onSubmit = handleSubmit(async (formData) => {
    await axios
      .post("http://localhost:3000/api/user/login", formData)
      .then((value) => {
        const data = value.data as LoginUserResponse;

        // pass token
        setCookie("token", data.data?.token, { maxAge: oneDayInSeconds });

        navigate("/todo");
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          delay: 1500,
          theme: isDarkVariant ? "dark" : "light",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  });

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        toast.success(`Welcome ${user.displayName}`, {
          delay: 1500,
          theme: isDarkVariant ? "dark" : "light",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        const response = await userApi.loginWithFirebase({
          id: user.uid as string,
          email: user.email as string,
          username: user.displayName as string,
          imgUrl: user.photoURL as string,
          method: "GOOGLE",
        });

        setCookie("token", response.data?.token, { maxAge: oneDayInSeconds });

        navigate("/todo");
      })
      .catch((error) => {
        toast.error(error, {
          delay: 1500,
          theme: isDarkVariant ? "dark" : "light",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const loginWithGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then(async (result) => {
        const user = result.user;
        toast.success(`Welcome ${user.displayName}`, {
          delay: 1500,
          theme: isDarkVariant ? "dark" : "light",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        const response = await userApi.loginWithFirebase({
          id: user.uid as string,
          email: user.email as string,
          username: user.displayName as string,
          imgUrl: user.photoURL as string,
          method: "GITHUB",
        });

        setCookie("token", response.data?.token, { maxAge: oneDayInSeconds });

        navigate("/todo");
      })
      .catch((error) => {
        toast.error(error, {
          delay: 1500,
          theme: isDarkVariant ? "dark" : "light",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const loginWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const user = result.user;
        toast.success(`Welcome ${user.displayName}`, {
          delay: 1500,
          theme: isDarkVariant ? "dark" : "light",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        const response = await userApi.loginWithFirebase({
          id: user.uid as string,
          email: user.email as string,
          username: user.displayName as string,
          imgUrl: user.photoURL as string,
          method: "FACEBOOK",
        });

        setCookie("token", response.data?.token, { maxAge: oneDayInSeconds });

        navigate("/todo");
      })
      .catch((error) => {
        toast.error(error, {
          delay: 1500,
          theme: isDarkVariant ? "dark" : "light",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-base-100">
      <ParticleComponent hoverGesture />
      <div className="flex flex-col overflow-hidden rounded-md bg-base-300 z-50 px-14 h-fit pb-6 shadow-lg ">
        {/* Login Form */}
        <div className="h-full justify-start flex flex-col gap-4 pt-12">
          <div className="flex items-center gap-2">
            <ArrowLeftIcon
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
            <h1 className="text-2xl font-bold text-center">Sign In</h1>
          </div>
          <div role="tablist" className="tabs tabs-boxed bg-base-300">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Oauth"
              onClick={() => setTab(0)}
              checked={tab === 0}
            />
            <div role="tabpanel" className="tab-content p-10">
              <div className="flex items-center justify-center flex-col">
                <div className="flex flex-col gap-4">
                  <button
                    className="btn hover:bg-white hover:text-black"
                    onClick={loginWithGoogle}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                    Login With Google
                  </button>
                  <button
                    className="btn hover:bg-black px-3"
                    onClick={loginWithGithub}
                  >
                    <IconGithub className="w-5 h-5" />
                    Login with Github
                  </button>
                  <button
                    className="btn hover:bg-[#4267B2] hover:text-white px-3"
                    onClick={loginWithFacebook}
                  >
                    <IconFacebook className="w-5 h-5" />
                    Login with Facebook
                  </button>
                </div>
              </div>
            </div>
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab hover:bg-base-100 ml-2"
              aria-label="Credential"
              onClick={() => setTab(1)}
              checked={tab === 1}
            />

            <div role="tabpanel" className="tab-content p-10">
              <div className="flex flex-col gap-8">
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
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="font-semibold text-sm opacity-70"
                    >
                      Password
                    </label>
                    <p
                      className="hover:underline text-xs cursor-pointer hover:text-primary"
                      onClick={() => navigate("/request-recovery")}
                    >
                      Forgot Password?
                    </p>
                  </div>
                  <div className="relative w-full border-b-[1px]">
                    <div className="absolute inset-y-0 -start-2 flex items-center ps-3">
                      {value ? (
                        <IconUnlock
                          className="opacity-50 w-6 h-6 cursor-pointer"
                          onClick={toggle}
                        />
                      ) : (
                        <IconLock
                          className="opacity-50 w-6 h-6 cursor-pointer"
                          onClick={toggle}
                        />
                      )}
                    </div>
                    <input
                      id="password"
                      type={value ? "text" : "password"}
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
                  <>Login</>
                )}
              </button>
              <button
                className="btn btn-link opacity-60 hover:opacity-100 w-full"
                onClick={() => navigate("/signup")}
              >
                Don't have an account ?
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
