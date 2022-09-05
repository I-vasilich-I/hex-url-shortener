import { NextPage } from 'next';
import Head from 'next/head';
import AuthForm from 'src/components/AuthForm/AuthForm';

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>URL-Shortener - Sign up</title>
        <meta name="description" content="Sign up form" />
      </Head>
      <section>
        <AuthForm />
      </section>
    </>
  );
};

export default SignUp;
