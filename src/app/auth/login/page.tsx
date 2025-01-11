"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const page = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>("customer");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const msgs = useRef<Messages>(null);
  const router = useRouter();
  const userLogin = async () => {
    try {
      const result = await signIn(
        userType == "customer" ? "sign-with-email" : "agent-sign-with-email",
        {
          username: email,
          password: password,
          redirect: false,
        }
      );
      console.log(result);
      if (result?.ok === false) {
        setAlertMessage("Invalid UserName and Password");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className='login-page'>
      <div className='container'>
        <h3 className='form-heading1'>Login</h3>
        <form className='login-form'>
          {alertMessage && (
            <div className='alert alert-danger' role='alert'>
              {alertMessage}
            </div>
          )}
          <div className='d-flex align-items-center justify-content-center'>
            <div className='form-group d-flex align-items-center mr-3'>
              <input
                type='radio'
                id='agent'
                name='role'
                value={"agent"}
                checked={userType === "agent"}
                onChange={() => setUserType("agent")}
              />
              <label htmlFor='agent' className='mb-0 ml-1 cursor-pointer'>
                Agent
              </label>
            </div>
            <div className='form-group d-flex align-items-center'>
              <input
                type='radio'
                id='customer'
                name='role'
                value={"customer"}
                checked={userType === "customer"}
                onChange={() => setUserType("customer")}
              />
              <label htmlFor='customer' className='mb-0 ml-1 cursor-pointer'>
                Customer
              </label>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              className='form-control checkout-input'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <div className='frg-lbl'>
              <label htmlFor='password'>Password</label>{" "}
              <Link
                href={{
                  pathname: "/auth/forgetpassword",
                  query: { userType: userType },
                }}
                // onClick={() =>
                //   router.push(`/auth/forgetpassword?q=${userType}`)
                // }
                className='frg-psd cursor-pointer'
              >
                Forgot password?
              </Link>
            </div>
            <input
              type='password'
              className='form-control checkout-input'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type='button'
            className='submit-btn btn btn-saawree'
            value='Login'
            onClick={userLogin}
          />
        </form>
        <p className='arha'>
          New customer?{" "}
          <Link href={"/auth/register"} className='frg-psd'>
            Create your account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default page;
