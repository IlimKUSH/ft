'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  signInWithCredentials,
  signUpUser,
  signOutUser,
} from '@/lib/actions/user.actions';
import { useSession } from 'next-auth/react';

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends SignInCredentials {
  name: string;
  confirmPassword: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { status } = useSession();

  const signIn = useMutation({
    mutationFn: async (credentials: SignInCredentials) => {
      const formData = new FormData();
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);
      formData.append('callbackUrl', '/profile');

      const result = await signInWithCredentials(null, formData);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const signUp = useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      const formData = new FormData();
      formData.append('name', credentials.name);
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);
      formData.append('confirmPassword', credentials.confirmPassword);

      const result = await signUpUser(null, formData);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const signOut = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  return {
    status,
    signIn,
    signUp,
    signOut,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
  };
}
