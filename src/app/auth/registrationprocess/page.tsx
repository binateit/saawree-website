"use client";
import { useState } from "react";
import CompleteRegistrationPage from "../completeregistration/page";
import Registration from "../register/Register";
import ValidateOTPPage from "../validateotp/ValidateOTPPage";
import Head from "next/head";

const RegistrationProcessPage = () => {
  const [step, setStep] = useState<number>(1);
  const [userId, setUserId] = useState<string>();

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
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
