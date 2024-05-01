import React, { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';

import { AuthContext, AuthContextType } from '../../context/AuthContext';

interface ProfileFormInputs {
  username: string;
  email: string;
  newPassword?: string;
  confirmPassword?: string;
}

const schema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  newPassword: Yup.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Passwords must match')
}).required();

const ProfilePage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<ProfileFormInputs>({
    resolver: yupResolver(schema)
  });
  const authContext = useContext<AuthContextType>(AuthContext);
  const { email } = authContext?.state || {};

  React.useEffect(() => {
    setValue('email', email || '');  // Set email from AuthContext
  }, [setValue, email]);

  const onSubmit: SubmitHandler<ProfileFormInputs> = data => {
    console.log('Profile Update Data:', data);
    // You can add navigation or other effects here

    // Assuming you have a function to submit the form data
    try {
      //   await submitFormData(formState); // Replace with your actual submit function
      setIsSubmitted(true); // Set success state
      // setTimeout(() => setIsSubmitted(false), 1000); // Optional: clear message after 3 seconds
    } catch (error) {
      console.error('Submission failed', error);
      // Handle errors if necessary
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border border-gray-300 p-4 w-1/4 shadow-lg">
        {isSubmitted &&
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-3" role="alert">
            Profile updated successfully</div>}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                id="username"
                type="text"
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>}
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
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <input
                id="newPassword"
                type="password"
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.newPassword && <p className="mt-2 text-sm text-red-600">{errors.newPassword.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                id="confirmPassword"
                type="password"
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
