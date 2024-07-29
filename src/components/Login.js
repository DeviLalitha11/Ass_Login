import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const SubmitHandler = async (data) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          expiresInMins: 30,
        }),
      });

      const result = await response.json();
      console.log("Login Result:", result);

      if (response.ok && result.token && result.id) { 
        toast.success('Login successful!');
        navigate(`/profile/${result.id}`); 
      } else {
        throw new Error('Authentication failed. Please check your username and password.');
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-6xl font-bold ml-3">Login now!</h1>
          <p className="py-6 text-2xl ml-3">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(SubmitHandler)} className="card-body">
            {error && <p className="text-red-500">{error}</p>}
            <div className="form-control">
              <label className="label mt-10">
                <span className="label-text text-xl font-bold">Username</span>
              </label>
              <input
                {...register('username')}
                type="text"
                placeholder="username"
                className="input input-bordered text-xl"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-bold">Password</span>
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="password"
                className="input input-bordered text-xl"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary mb-10 text-xl font-italic" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
