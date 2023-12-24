import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ParticleComponent } from "../components/particle-component";
import { ResetPasswordStepComponent } from "../components/reset-password-step-component";
import { useCredentialReset } from "../hooks/use-credential-reset";
import useTheme from "../hooks/use-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import otpApi from "../api/otp-api";
import { ToastContainer, toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useDocumentTitle } from "usehooks-ts";

const FormSchema = z.object({
  otp1: z.string().length(1),
  otp2: z.string().length(1),
  otp3: z.string().length(1),
  otp4: z.string().length(1),
});

export default function VerifyOtpPage() {
  useDocumentTitle("TaskEase - Verify OTP");
  const { isDarkVariant } = useTheme();
  const { email } = useCredentialReset();
  const navigate = useNavigate();

  useEffect(() => {
    if (email === "") {
      navigate("/request-recovery");
    }
  }, [email, navigate]);

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) => otpApi.verifyOtp(email, otp),
    onSuccess: () => {
      navigate("/reset-password");
    },
    onError: (error) => {
      toast.error(error.response.data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const requestOtpMutation = useMutation({
    mutationFn: () => otpApi.requestRecovery(email),
    onSuccess: (data) => {
      toast.success(data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message, {
        delay: 1500,
        theme: isDarkVariant ? "dark" : "light",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
  });

  const onSubmit = handleSubmit((formData) => {
    const combinedOTP =
      formData.otp1 + formData.otp2 + formData.otp3 + formData.otp4;

    verifyOtpMutation.mutate(combinedOTP);
  });

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center bg-base-100">
      <ParticleComponent hoverGesture />
      <ResetPasswordStepComponent currentSteps={2} />
      <div className="bg-base-300 p-6 rounded-md z-50">
        <h3 className="text-lg font-bold text-center mb-4">Enter OTP</h3>
        <div className="grid grid-cols-4 gap-4">
          {/* Input OTP */}
          <input
            type="text"
            id="otp-1"
            maxLength={1}
            className="border p-2 text-center w-14 rounded-md focus:outline-primary h-20 text-3xl font-bold"
            required
            {...register("otp1")}
          />
          <input
            type="text"
            id="otp-2"
            maxLength={1}
            className="border p-2 text-center w-14 rounded-md focus:outline-primary h-20 text-3xl font-bold"
            required
            {...register("otp2")}
          />
          <input
            type="text"
            id="otp-3"
            maxLength={1}
            className="border p-2 text-center w-14 rounded-md focus:outline-primary h-20 text-3xl font-bold"
            required
            {...register("otp3")}
          />
          <input
            type="text"
            id="otp-4"
            maxLength={1}
            className="border p-2 text-center w-14 rounded-md focus:outline-primary h-20 text-3xl font-bold"
            required
            {...register("otp4")}
          />
        </div>
        <div className="w-full mt-4 flex justify-between">
          <button
            className="btn btn-sm btn-primary w-[40%]"
            onClick={() => onSubmit()}
            disabled={!isDirty || verifyOtpMutation.isPending}
          >
            {verifyOtpMutation.isPending && (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            )}
            {verifyOtpMutation.isPending ? "Verifying OTP..." : "Verify OTP"}
          </button>
          <button
            className="btn btn-sm btn-ghost w-[55%]"
            onClick={() => requestOtpMutation.mutate()}
            disabled={requestOtpMutation.isPending}
          >
            {requestOtpMutation.isPending && (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            )}
            {requestOtpMutation.isPending ? "Resending OTP..." : "Resend OTP"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
