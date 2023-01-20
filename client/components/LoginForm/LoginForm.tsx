import React from 'react';
import { Form, Link } from 'react-router-dom';
import useLoginState from '../../hooks/useLoginState';
import AuthForm, { AuthAction, AuthProperty } from '../AuthForm/AuthForm';
import AuthIcons from '../AuthIcons/AuthIcons';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { updateLogin } = useLoginState();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target === null) return;
    const info = { email, password };

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        updateLogin(data);
      });
  };

  const formProperties: AuthProperty[] = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    }
  ];

  const formActions: AuthAction[] = [
    {
      text: 'Sign In',
      type: 'submit',

    },
    {
      text: 'Sign Up',
      type: 'link',
      to: '/signup',
    }
  ];

  return (
    <AuthForm properties={formProperties} actions={formActions} onSubmit={handleSubmit}>
      <Link to='findPw' className={styles.link}> Forgot password?</Link>
      <AuthIcons options= {
        [
          {
            name: 'google',
            href: '#',
            className: 'fa-brands fa-google'
          },
          {
            name: 'github',
            href: 'http://localhost:8080/api/oauth/gh',
            className: 'fa-brands fa-github'
          },
          {
            name: 'apple',
            href: '#',
            className: 'fa-brands fa-apple'
          }
        ]
      } />
    </AuthForm>
  );
};

export default LoginForm;
