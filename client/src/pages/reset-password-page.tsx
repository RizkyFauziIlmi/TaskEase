import { useNavigate } from "react-router-dom";
import { ParticleComponent } from "../components/particle-component";
import { ResetPasswordStepComponent } from "../components/reset-password-step-component";
import { useCredentialReset } from "../hooks/use-credential-reset";
import useTheme from "../hooks/use-theme";
import { useEffect } from "react";
import { useBoolean, useDocumentTitle } from "usehooks-ts";
import IconLock from "../components/svg/lock-svg";
import IconUnlock from "../components/svg/unlock-svg";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import otpApi from "../api/otp-api";
import { ToastContainer, toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export default function ResetPasswordPage() {
  useDocumentTitle("TaskEase - Reset Password");
  const { isDarkVariant } = useTheme();
  const { email, clear } = useCredentialReset();
  const navigate = useNavigate();
  const { toggle, value } = useBoolean(true);

  const {
    register,
    watch,
    handleSubmit,
    formState: { isDirty },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (newPassword: string) =>
      otpApi.resetPassword(email, newPassword),
    onSuccess: () => {
      navigate("/login");
      clear();
    },
    onError: (error) => {
      toast.error(error.response.data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  useEffect(() => {
    if (email === "") {
      navigate("/request-recovery");
    }
  }, [email, navigate]);

  const isNotSame = watch("confirmPassword") !== watch("newPassword");

  const onSubmit = handleSubmit((formData) => {
    resetPasswordMutation.mutate(formData.newPassword);
  });

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center bg-base-100">
      <ParticleComponent hoverGesture />
      <ResetPasswordStepComponent currentSteps={3} />
      <div className="bg-base-300 w-fit flex flex-col gap-4 rounded-md p-4 z-50">
        <h3 className="text-lg font-bold text-center">Reset Your Password</h3>
        <div className="relative w-full border-b-[1px]">
          <div
            className="absolute inset-y-0 -start-2 flex items-center ps-3"
            onClick={toggle}
          >
            {value ? (
              <IconLock className="opacity-50 w-5 h-5 cursor-pointer" />
            ) : (
              <IconUnlock className="opacity-50 w-5 h-5 cursor-pointer" />
            )}
          </div>
          <input
            type={value ? "password" : "text"}
            id="password"
            className="bg-base-300 focus:outline-none text-sm rounded-lg block w-full ps-10 p-2.5 focus:bg-base-200 transition group"
            placeholder="Enter your new password..."
            required
            {...register("newPassword")}
          />
        </div>
        <div className="relative w-full border-b-[1px]">
          <div
            className="absolute inset-y-0 -start-2 flex items-center ps-3"
            onClick={toggle}
          >
            {value ? (
              <IconLock className="opacity-50 w-5 h-5 cursor-pointer" />
            ) : (
              <IconUnlock className="opacity-50 w-5 h-5 cursor-pointer" />
            )}
          </div>
          <input
            type={value ? "password" : "text"}
            id="password"
            className="bg-base-300 focus:outline-none text-sm rounded-lg block w-full ps-10 p-2.5 focus:bg-base-200 transition group"
            placeholder="Confirm your password..."
            required
            {...register("confirmPassword")}
          />
        </div>
        <button
          className="btn btn-primary btn-md"
          disabled={!isDirty || isNotSame || resetPasswordMutation.isPending}
          onClick={onSubmit}
        >
          {resetPasswordMutation.isPending && (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          )}
          {resetPasswordMutation.isPending
            ? "Reseting Password..."
            : "Reset Password"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
