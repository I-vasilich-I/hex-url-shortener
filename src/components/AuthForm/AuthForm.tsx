import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import eye from 'public/images/eye.svg';
import eyeBlocked from 'public/images/eye-blocked.svg';

import {
  Form,
  NameLabel,
  PasswordLabel,
  FormTitle,
  EyeButton,
  Input,
  Button,
} from './AuthForm.style';
import { signInUser, signUpUser } from 'src/services';
import useAuthContext from 'src/hooks/useAuthContext';
import { LINKS } from 'src/constants';

type PathName = '/signup' | '/signin';

interface IFormInputs {
  username: string;
  password: string;
}

const BOTTOM_LINKS = {
  '/signup': {
    text: 'Already a member?',
    linkText: 'Sign in',
    link: '/signin',
  },
  '/signin': {
    text: `Don't have an account yet?`,
    linkText: 'Sign up',
    link: '/signup',
  },
};

const AuthForm = () => {
  const { pathname } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(yup.object({
      username: yup.string().required(`Username's required`),
      password: yup.string().required(`Password's required`).min(4, `Password's less then 8 characters`),
    })),
  });

  const [visible, setVisible] = useState(false);
  const isSignUp = pathname === '/signup';
  const title = isSignUp ? 'Sign up' : 'Sign in';
  const { text, linkText, link: bottomLink } = BOTTOM_LINKS[pathname as PathName];
  const passwordErrorMessage = errors.password?.message;
  const usernameErrorMessage = errors.username?.message;
  const isButtonDisabled = useMemo(() => !!(passwordErrorMessage || usernameErrorMessage), [passwordErrorMessage, usernameErrorMessage]);
  const { setToken } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async ({ username, password }: IFormInputs) => {
    const response = await signInUser(username, password);
    if (!response || response.error) {
      handleError(response?.error || 'Something went wrong');
      return null;
    }
    return response.data;
  };

  const handleSignUp = async ({ username, password }: IFormInputs) => {
    const response = await signUpUser(username, password);
    if (!response || response.error) {
      handleError(response?.error || 'Something went wrong');
      return null;
    }
    return response.data;
  };

  // there could be your ad... I mean error message;
  const handleError = (error: any) => {
    alert(JSON.stringify(error));
  }

  const onSubmit = async (user: IFormInputs) => {
    setIsLoading(true);
    if (isSignUp) {
      const username = await handleSignUp(user);
      
      if (!username) {
        setIsLoading(false);
        return;
      }
    }

    const response = await handleSignIn(user);
    if (!response) {
      setIsLoading(false);
      return;
    }

    setToken(response.access_token);
    localStorage.setItem('hex_token', response.access_token)
    router.push(LINKS.HOME.href)
  };

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <Form aria-label="form" onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>{title}</FormTitle>
      <NameLabel>
        <Input {...register('username', { required: true })} type="text" id="username" placeholder="Username" />
        {usernameErrorMessage ? <span role="alert">{usernameErrorMessage}</span> : null}
      </NameLabel>
      <PasswordLabel>
        <Input
          {...register('password', { required: true })}
          type={visible ? 'text' : 'password'}
          id="password"
          placeholder="Password"
        />
        <EyeButton type="button" data-testid="visibility-toggle" onClick={handleClick}>
          <Image src={visible ? eye : eyeBlocked} alt="eye" />
        </EyeButton>
        {passwordErrorMessage ? <span role="alert">{passwordErrorMessage}</span> : null}
      </PasswordLabel>
      <Button type="submit" disabled={isLoading || isButtonDisabled}>{title}</Button> 
      {/* it could've been a fancy loader, but we're out of budget */}
      {isLoading ? <span>{`it could've been a fancy loader...`}</span> : null}
      <p>
        {text}{' '}
        <Link href={bottomLink} passHref>
          <a>{linkText}</a>
        </Link>
      </p>
    </Form>
  );
};

export default AuthForm;
