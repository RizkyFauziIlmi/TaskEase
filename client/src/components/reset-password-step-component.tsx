interface ResetPasswordStepComponentProps {
  currentSteps: number;
}
export const ResetPasswordStepComponent = ({
  currentSteps = 1,
}: ResetPasswordStepComponentProps) => {
  return (
    <ul className="steps steps-vertical md:steps-horizontal">
      <li className={`step ${currentSteps >= 1 && "step-primary"}`}>
        Request Recovery
      </li>
      <li className={`step ${currentSteps >= 2 && "step-primary"}`}>
        Verify OTP
      </li>
      <li className={`step ${currentSteps >= 3 && "step-primary"}`}>
        Reset Password
      </li>
    </ul>
  );
};
