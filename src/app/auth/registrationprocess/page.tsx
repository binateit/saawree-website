"use client";
import { useState } from "react";
import ValidateOTPPage from "../validateotp/page";
import Registration from "../register/page";
import CompleteRegistrationPage from "../completeregistration/page";

const RegistrationProcessPage = () => {
  const [step, setStep] = useState<number>(1);
  const [userId, setUserId] = useState<string>();

  return (
    <>
      {step === 1 && (
        <Registration updateStep={setStep} setUserId={setUserId} />
      )}
      {step === 2 && (
        <ValidateOTPPage userId={userId as string} updateStep={setStep} />
      )}
      {step === 3 && <CompleteRegistrationPage />}
    </>
  );
};
export default RegistrationProcessPage;
