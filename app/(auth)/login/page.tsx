'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import RHFInput from '@/components/RHFInputs/RHFInput';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { signInGithub, signInGoogle } from '@/lib/actions/auth';
import { loginFormSchema, type ILoginFormData } from '@/lib/zod/user-schema';
import { signIn } from 'next-auth/react';

const Login = () => {
  const { toast } = useToast();
  const loginForm = useForm<ILoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: ILoginFormData) => {
    const { email, password } = data;

    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'error',
          title: 'Invalid email or password!',
        });
        return;
      }

      toast({
        variant: 'error',
        title: 'Something went wrong! Please try again.',
      });
    }
  };

  if (loginForm.formState.isSubmitSuccessful) {
    return <LoadingSpinner asLayout />;
  }

  return (
    <section className="px-5">
      <div className="m-auto my-16 flex w-full max-w-95.5 flex-col">
        <div className="mb-24 flex justify-center">
          <Image
            src="/assets/images/Logo.svg"
            alt="Logo"
            width={164}
            height={41}
          />
        </div>
        <div className="mb-5">
          <h2 className="h2-bold text-white-100">Login</h2>
          <p className="p4-regular text-green-500">
            Demo account: test@test.com pw: 123123
          </p>
        </div>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onSubmit)}>
            <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
              <RHFInput
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-6 max-w-sm items-center gap-1.5">
              <RHFInput
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-6">
              <Button type="submit" disabled={loginForm.formState.isSubmitting}>
                Login
              </Button>
            </div>
          </form>
        </Form>
        <Link
          href="/register"
          className="mb-6 text-center text-sm text-white-300 underline"
        >
          I don&apos;t have an account
        </Link>
        <p className="p4-regular mb-6 text-center">or</p>
        <Button
          variant="secondary"
          className="mb-4 text-white-300"
          onClick={() => signInGoogle()}
        >
          <Image
            src="/assets/images/google.svg"
            alt="Google"
            width={16}
            height={16}
          />
          Continue with Google
        </Button>
        <Button
          variant="secondary"
          className="text-sm text-white-300"
          onClick={() => signInGithub()}
        >
          <Image
            src="/assets/images/github.svg"
            alt="Google"
            width={16}
            height={16}
          />
          Continue with GitHub
        </Button>
      </div>
    </section>
  );
};

export default Login;
