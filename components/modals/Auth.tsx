import { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';

import { authActionCreators } from '@/store/auth/index';
import Input from '@/components/form/Input';
import Checkbox from '@/components/form/Checkbox';
import Modal from '@/components/Modal';
import Axios from '@/utils/axios';

type Msg = {
  state: string;
  msg: string;
}

type AuthProps = {
  auth: any;
};

type AuthState = {
  auth: string,
  isLoading: boolean,
  login: {
    email: string;
    password: string;
    msg: Msg;
  },
  register: {
    username: string;
    email: string;
    password: string;
    terms: boolean;
    msg: Msg;
  },
  forgotPassword: {
    email: string;
  },
};

class Auth extends Component<AuthProps, AuthState> {
  public state: AuthState = {
    auth: 'login',
    isLoading: false,
    login: {
      email: '',
      password: '',
      msg: {
        state: '',
        msg: '',
      }
    },
    register: {
      username: '',
      email: '',
      password: '',
      terms: false,
      msg: {
        state: '',
        msg: '',
      }
    },
    forgotPassword: {
      email: '',
    },
  };

  public render() {
    if (this.props.auth?.token) return null;
    return (
      <Modal
        name="auth"
        content={
          <div className="container block__container">
            {this.state.auth === 'login' && (
              <div className="block__content block__content--login">
                <div className="block__title">Login</div>
                <div className="block__lead">
                  or <span className="block__link" onClick={() => this.switch('register')}>Register</span>
                </div>
                <span className={`block__msg ${this.state.login.msg.state == 'success' ? 'block__msg--success' : this.state.login.msg.state == 'error' ? 'block__msg--error' : ''}`}>
                  {this.state.login.msg.msg}
                </span>
                <div className="block__form">
                  <form>
                    <Input
                      type="email"
                      name="login.email"
                      title="E-mail address"
                      onChange={this.setValue.bind(this)}
                    />
                    <Input
                      type="password"
                      name="login.password"
                      title="Password"
                      onChange={this.setValue.bind(this)}
                      eye={true}
                    />
                    <span
                      className="block__link block__link--single"
                      onClick={() => this.switch('forgot-password')}>
                      Forgot password?
                    </span>
                    <button
                      className={`btn btn-primary w-100 ${this.state.auth === 'login'
                        && this.state.isLoading ? 'is-loading' : ''} `}
                      onClick={this.login}
                      disabled={!this.filled([this.state.login.email, this.state.login.password])}>
                      Login
                    </button>
                  </form>
                </div>
              </div>
            )}

            {this.state.auth === 'register' && (
              <div className="block__content block__content--register">
                <div className="block__title">Register</div>
                <div className="block__lead">
                  or <span className="block__link" onClick={() => this.switch('login')}>Login</span>
                </div>
                <span className={`block__msg ${this.state.register.msg.state == 'success' ? 'block__msg--success' : this.state.register.msg.state == 'error' ? 'block__msg--error' : ''}`}>
                  {this.state.register.msg.msg}
                </span>
                <div className="block__form">
                  <form>
                    <Input
                      type="text"
                      name="register.username"
                      title="Username"
                      onChange={this.setValue.bind(this)}
                    />
                    <Input
                      type="email"
                      name="register.email"
                      title="E-mail address"
                      onChange={this.setValue.bind(this)}
                    />
                    <Input
                      type="password"
                      name="register.password"
                      title="Password"
                      onChange={this.setValue.bind(this)}
                      eye={true}
                    />
                    <Checkbox
                      name="register.terms"
                      title="I agree the Terms and conditions."
                      onChange={this.setValue.bind(this)}
                    />
                    <button
                      className="btn btn-primary w-100"
                      onClick={this.register}
                      disabled={!this.filled([this.state.register.username, this.state.register.email, this.state.register.password, this.state.register.terms])}>
                      Registration
                    </button>
                  </form>
                </div>
              </div>
            )}

            {this.state.auth === 'forgot-password' && (
              <div className="block__content block__content--forgot-password">
                <div className="block__title">Forgot password</div>
                <div className="block__lead">
                  or <span className="block__link" onClick={() => this.switch('login')}>Login</span>
                </div>
                <div className="block__form">
                  <form>
                    <Input
                      type="email"
                      name="forgotPassword.email"
                      title="E-mail address"
                      onChange={this.setValue.bind(this)}
                    />
                    <button
                      className="btn btn-primary w-100"
                      onClick={this.forgotPassword}
                      disabled={!this.filled([this.state.forgotPassword.email])}>
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
  }

  public setValue = (field: string, value: string): void => {
    const data = this.fieldHandler(field, value);
    this.setState(data as Pick<AuthState, keyof AuthState>);
  };

  public fieldHandler = (field: string, value: string) => {
    const currentState = this.state;

    if (field.includes('.')) currentState[field.split('.')[0]][field.split('.')[1]] = value;
    else currentState[field] = value;

    return currentState;
  }

  public switch = (auth: string) => {
    this.setState({ auth: auth });
  }

  public filled = (fields: Array<string | boolean>) => {
    return fields.every(f => f);
  }

  public login = async (e): Promise<void> => {
    e.preventDefault();

    if (this.state.login.email
      && this.state.login.password) {
      this.setState({ isLoading: true });

      try {
        const user = await Axios.post('/auth/login', {
          email: this.state.login.email,
          password: this.state.login.password,
        });

        if (user && user.data?.token) {
          localStorage.setItem('token', user.data.token);
          Router.reload();
        }
      }
      catch (e) {
        const loginState = this.state.login;

        if (e.response) loginState.msg = { state: 'error', msg: e.response.data?.message };
        else loginState.msg = { state: 'error', msg: 'Login failed.' };

        this.setState({ login: loginState });
      }
      finally {
        setTimeout(() => this.setState({ isLoading: false }), 800);
      }
    }
  };

  public register = async (e): Promise<void> => {
    e.preventDefault();

    if (this.state.register.username 
      && this.state.register.email
      && this.state.register.password) {
      this.setState({ isLoading: true });

      try {
        await Axios.post('/user/register', {
          username: this.state.register.username,
          email: this.state.register.email,
          password: this.state.register.password,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const registerState = this.state.register;
        registerState.msg = { state: 'success', msg: 'Successful registration.' };

        this.setState({ register: registerState });
      }
      catch (e) {
        const registerState = this.state.register;

        if (e.response) registerState.msg = { state: 'error', msg: e.response.data?.message };
        else registerState.msg = { state: 'error', msg: 'Registration failed.' };

        this.setState({ register: registerState });
      }
      finally {
        setTimeout(() => this.setState({ isLoading: false }), 250);
      }
    }
  };

  public forgotPassword = async (e): Promise<void> => {
    e.preventDefault();

    if (this.state.forgotPassword.email) {
      this.setState({ isLoading: true });

      try {
        const user = await Axios.post('/auth/forgot-password', {
          email: this.state.register.email,
        });

        console.log(user);
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setTimeout(() => this.setState({ isLoading: false }), 250);
      }
    }
  };
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(authActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
