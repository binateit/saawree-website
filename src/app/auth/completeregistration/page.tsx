import Link from "next/link";

const CompleteRegistrationPage = () => {
  return (
    <div>
      <section className='thankyou-page'>
        <div className='container'>
          <div className='inner-wrap-th'>
            <h2 className='thank-title'>Succesfull Registration</h2>
            <h4 className='ord-n'></h4>
            <p className='ord-txt'>Thank you for registering with Saawree.</p>
            <p className='btn-th'>
              <Link href={"/auth/login"} className='btn-crt'>
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompleteRegistrationPage;
