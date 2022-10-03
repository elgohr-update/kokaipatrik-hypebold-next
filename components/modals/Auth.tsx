import { useState } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import Input from '@/components/form/Input';
import Checkbox from '@/components/form/Checkbox';
import Modal from '@/components/Modal';
import Axios from '@/utils/axios';

export interface Msg {
  state: String;
  msg: String;
};

export interface ILogin {
  email: string;
  password: string;
  msg: Msg;
};

export interface IRegister {
  username: string;
  email: string;
  password: string;
  terms: boolean;
  msg: Msg;
};

export interface IForgotPassword {
  email: string;
};

export interface IFieldHandler {
  state: string;
  field: string;
  value: string;
};

const Auth: React.FC = () => {
  const authManagement = useSelector(state => state.auth);

  const [auth, setAuth] = useState<String>('login');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [login, setLogin] = useState<ILogin>({
    email: '',
    password: '',
    msg: {
      state: '',
      msg: '',
    }
  });
  const [register, setRegister] = useState<IRegister>({
    username: '',
    email: '',
    password: '',
    terms: false,
    msg: {
      state: '',
      msg: '',
    }
  });
  const [forgotPassword, setForgotPassword] = useState<IForgotPassword>({
    email: '',
  });

  const fieldHandler = (name: string, value: string): IFieldHandler => {
    const [state, field] = name.split('.');

    return {
      state,
      field,
      value,
    };
  };

  const setValue = (field: string, value: string): void => {
    const data = fieldHandler(field, value);

    if (data.state === 'login') {
      setLogin(prevState => ({
        ...prevState,
        [data.field]: value,
      }));
    }

    if (data.state === 'register') {
      setRegister(prevState => ({
        ...prevState,
        [data.field]: value,
      }));
    }

    if (data.state === 'forgotPassword') {
      setForgotPassword(prevState => ({
        ...prevState,
        [data.field]: value,
      }));
    }
  };

  const filled = (fields: Array<string | boolean>): Boolean => fields.every(f => f);

  const loginFn = async (e): Promise<void> => {
    e.preventDefault();

    if (login.email && login.password) {
      setIsLoading(true);

      try {
        const user = await Axios.post('/auth/login', {
          email: login.email,
          password: login.password,
        });

        if (user && user.data?.token) {
          localStorage.setItem('token', user.data.token);
          Router.reload();
        }
      }
      catch (e) {
        if (e.response) {
          setLogin(prevState => ({
            ...prevState,
            msg: {
              state: 'error',
              msg: e.response.data?.message,
            },
          }));
        }
        else {
          setLogin(prevState => ({
            ...prevState,
            msg: {
              state: 'error',
              msg: 'Login failed.',
            },
          }));
        }
      }
      finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    }
  };

  const registerFn = async (e): Promise<void> => {
    e.preventDefault();

    if (register.username
      && register.email
      && register.password) {
      setIsLoading(true);

      try {
        await Axios.post('/user/register', {
          username: register.username,
          email: register.email,
          password: register.password,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        setRegister(prevState => ({
          ...prevState,
          msg: {
            state: 'success',
            msg: 'Successful registration.',
          },
        }));
      }
      catch (e) {
        if (e.response) {
          setRegister(prevState => ({
            ...prevState,
            msg: {
              state: 'error',
              msg: e.response.data?.message,
            },
          }));
        }
        else {
          setRegister(prevState => ({
            ...prevState,
            msg: {
              state: 'error',
              msg: 'Registration failed.',
            },
          }));
        }
      }
      finally {
        setTimeout(() => setIsLoading(false), 250);
      }
    }
  };

  const forgotPasswordFn = async (e): Promise<void> => {
    e.preventDefault();

    if (forgotPassword.email) {
      setIsLoading(true);

      try {
        const user = await Axios.post('/auth/forgot-password', {
          email: register.email,
        });

        console.log(user);
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setTimeout(() => setIsLoading(false), 250);
      }
    }
  };

  if (authManagement?.token) return null;
  return (
    <Modal
      name="auth"
      content={
        <div className="container block__container">
          {auth === 'login' && (
            <div className="block__content block__content--login">
              <div className="block__title">Login</div>
              <div className="block__lead">
                or <span className="block__link" onClick={() => setAuth('register')}>Register</span>
              </div>
              <span className={`block__msg ${login.msg.state == 'success' ? 'block__msg--success' : login.msg.state == 'error' ? 'block__msg--error' : ''}`}>
                {login.msg.msg}
              </span>
              <div className="block__form">
                <form>
                  <Input
                    type="email"
                    name="login.email"
                    title="E-mail address"
                    onChange={setValue.bind(this)}
                  />
                  <Input
                    type="password"
                    name="login.password"
                    title="Password"
                    onChange={setValue.bind(this)}
                    eye={true}
                  />
                  <span
                    className="block__link block__link--single"
                    onClick={() => setAuth('forgot-password')}
                  >
                    Forgot password?
                  </span>
                  <button
                    className={`btn btn-primary w-100 ${auth === 'login'
                      && isLoading ? 'is-loading' : ''} `}
                    onClick={loginFn}
                    disabled={!filled([login.email, login.password])}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          )}

          {auth === 'register' && (
            <div className="block__content block__content--register">
              <div className="block__title">Register</div>
              <div className="block__lead">
                or <span className="block__link" onClick={() => setAuth('login')}>Login</span>
              </div>
              <span className={`block__msg ${register.msg.state == 'success' ? 'block__msg--success' : register.msg.state == 'error' ? 'block__msg--error' : ''}`}>
                {register.msg.msg}
              </span>
              <div className="block__form">
                <form>
                  <Input
                    type="text"
                    name="register.username"
                    title="Username"
                    onChange={setValue.bind(this)}
                  />
                  <Input
                    type="email"
                    name="register.email"
                    title="E-mail address"
                    onChange={setValue.bind(this)}
                  />
                  <Input
                    type="password"
                    name="register.password"
                    title="Password"
                    onChange={setValue.bind(this)}
                    eye={true}
                  />
                  <Checkbox
                    name="register.terms"
                    title="I agree the Terms and conditions."
                    onChange={setValue.bind(this)}
                  />
                  <button
                    className="btn btn-primary w-100"
                    onClick={registerFn}
                    disabled={!filled([register.username, register.email, register.password, register.terms])}
                  >
                    Registration
                  </button>
                </form>
              </div>
            </div>
          )}

          {auth === 'forgot-password' && (
            <div className="block__content block__content--forgot-password">
              <div className="block__title">Forgot password</div>
              <div className="block__lead">
                or <span className="block__link" onClick={() => setAuth('login')}>Login</span>
              </div>
              <div className="block__form">
                <form>
                  <Input
                    type="email"
                    name="forgotPassword.email"
                    title="E-mail address"
                    onChange={setValue.bind(this)}
                  />
                  <button
                    className="btn btn-primary w-100"
                    onClick={forgotPasswordFn}
                    disabled={!filled([forgotPassword.email])}
                  >
                    Forgot password
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
};

export default Auth;
