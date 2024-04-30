import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../../context/AuthContext';
import Logo from '../Logo';

const schema = Yup.object({
  email: Yup.string().required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
}).required();

// Form values type
type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { dispatch } = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    dispatch({ type: 'LOGIN', email: data.email });
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border bg-white border-gray-300 p-4 w-1/4 shadow-lg rounded-md">
        <div className="flex justify-center mb-1">
          <Logo maxWidth='80px' />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                id="email"
                type="email"
                placeholder="Enter your email" 
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                id="password"
                type="password"
                placeholder="Enter your password" 
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <div>
          <button type="submit" data-testid="btn-submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

