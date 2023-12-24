import { useNavigate } from "react-router-dom";
import { ParticleComponent } from "../components/particle-component";
import { ResetPasswordStepComponent } from "../components/reset-password-step-component";
import IconEmailOutline from "../components/svg/email-svg";
import useTheme from "../hooks/use-theme";
import { Loader2, MoveLeft } from "lucide-react";
import { useCredentialReset } from "../hooks/use-credential-reset";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import otpApi from "../api/otp-api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDocumentTitle } from "usehooks-ts";

const FormSchema = z.object({
  email: z
    .string({
      invalid_type_error: "value must an email!",
      required_error: "Must be filled!",
    })
    .email(),
});

export default function RequestRecoveryPage() {
  useDocumentTitle("TaskEase - Request Recovery");
  const { isDarkVariant } = useTheme();
  const navigate = useNavigate();
  const { setEmail } = useCredentialReset();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isDirty },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const requestOtpMutation = useMutation({
    mutationFn: (email: string) => otpApi.requestRecovery(email),
    onSuccess: (data) => {
      if (data?.data?.verified) {
        setEmail(getValues("email"));
        navigate("/reset-password");
      } else {
        setEmail(getValues("email"));
        navigate("/verify-otp");
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const onSubmit = handleSubmit((formData) => {
    requestOtpMutation.mutate(formData.email);
  });

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center bg-base-100">
      <ParticleComponent hoverGesture />
      <ResetPasswordStepComponent currentSteps={1} />
      <div className="bg-base-300 w-fit flex flex-col gap-2 rounded-md p-4 z-50">
        <h3 className="text-lg font-bold text-center">Enter Email</h3>
        <div className="relative w-full border-b-[1px]">
          <div className="absolute inset-y-0 -start-2 flex items-center ps-3 pointer-events-none">
            <IconEmailOutline className="opacity-50 w-5 h-5" />
          </div>
          <input
            type="email"
            id="email"
            className="bg-base-300 focus:outline-none text-sm rounded-lg block w-full ps-10 p-2.5 focus:bg-base-200 transition group"
            placeholder="Type your Email Address..."
            {...register("email")}
            required
          />
        </div>
        <button
          disabled={!isDirty || requestOtpMutation.isPending}
          className="btn btn-primary w-full btn-sm"
          onClick={onSubmit}
        >
          {requestOtpMutation.isPending && (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          )}
          {requestOtpMutation.isPending ? "Sending OTP..." : "Send OTP"}
        </button>
        <p
          className="flex items-center justify-center text-xs hover:underline cursor-pointer hover:text-primary mt-4"
          onClick={() => navigate("/login")}
        >
          <MoveLeft className="h-4 w-4 mr-2" /> Back to Login
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
