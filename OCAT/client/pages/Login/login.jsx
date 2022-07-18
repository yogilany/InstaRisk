import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginService } from '../../services/LoginService';

export const Login = () => {
  const { formState: { errors }, handleSubmit, register, watch } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {

    const Logindata = {
      username: data.username,
      password: data.password,
    };

    const response = await LoginService.checkCredentials(Logindata);

    if (response === `password is right`) {
      history.push(`/assessment/list`);
      window.location.reload(true);
    }
    else if (response === `password is wrong`) {
      document.getElementById(`passwordBlock`).innerHTML = `Wrong Password`;
    }
    else if (response === `no user found`) {
      document.getElementById(`passwordBlock`).innerHTML = `Wrong Username`;
    }

  };

  return <div>  <h1>
    Login
  </h1>
  <hr />
    <Form onSubmit={handleSubmit(onSubmit)}>

    <Form.Group className="form-outline mb-4">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" className='form-control'
        {...register(`username`, { required: true })} />
        <small id="usernameBlock" className='form-text text-muted' />
      </Form.Group>

    <Form.Group className="form-outline mb-4">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" className='form-control'
        {...register(`password`, { required: true })} />
        <small id="passwordBlock" className='form-text text-muted' />

      </Form.Group>

    <Button variant="primary" type="submit" className="btn btn-primary btn-block mb-4" >Log in</Button>
  </Form></div>;
};

export const Logout = () => {
  localStorage.setItem(`token`, `false`);
  const history = useHistory();
  history.push(`/login`);
  window.location.reload(true);
};
