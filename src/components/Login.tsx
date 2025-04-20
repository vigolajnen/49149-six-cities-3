import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { useLoginUserMutation } from '../services/api';
import { useTypedActions } from '../hooks/useTypedActions';
import { AuthStatus } from '../enums/auth';
import { saveToken } from '../services/token';
import { ApiError } from '../types';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { setAuthorizationStatus, setUser } = useTypedActions();

  if (isSuccess) {
    setAuthorizationStatus(AuthStatus.Auth);
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loginRef.current || !passwordRef.current) {
      return;
    }

    const credentials = {
      email: loginRef.current.value,
      password: passwordRef.current.value,
    };

    loginUser(credentials)
      .unwrap()
      .then((result) => {
        setAuthorizationStatus(AuthStatus.Auth);
        saveToken(result.token);
        setUser(result);
        navigate('/');
      })
      .catch((error: ApiError) => {
        const firstMessage = error.data?.details?.[0]?.messages?.[0];
        toast.error(firstMessage || 'Произошла непредвиденная ошибка.');
      });
  };

  return (
    <main className='page__main page__main--login'>
      <div className='page__login-container container'>
        <section className='login'>
          <h1 className='login__title'>Sign in</h1>
          <form className='login__form form' action='#' method='post' onSubmit={handleFormSubmit}>
            <div className='login__input-wrapper form__input-wrapper'>
              <label className='visually-hidden'>E-mail</label>
              <input ref={loginRef} className='login__input form__input' type='email' name='email' placeholder='Email' required />
            </div>
            <div className='login__input-wrapper form__input-wrapper'>
              <label className='visually-hidden'>Password</label>
              <input ref={passwordRef} className='login__input form__input' type='password' name='password' placeholder='Password' required />
            </div>
            <button className='login__submit form__submit button' type='submit' disabled={isLoading}>
              Sign in
            </button>
          </form>
        </section>
        <section className='locations locations--login locations--current'>
          <div className='locations__item'>
            <a className='locations__item-link' href='#'>
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
      <ToastContainer />
    </main>
  );
}
