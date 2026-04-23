'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import RHFInput from '@/components/RHFInputs/RHFInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { signIn, signInGithub, signInGoogle } from '@/lib/actions/auth';
import { createNewUser } from '@/lib/actions/user-actions';
import { signUpFormSchema, type ISignUpFormData } from '@/lib/zod/user-schema';

// ----------------------------------------------------------------

const Register = () => {
  const { toast } = useToast();
  const router = useRouter();

  const registerForm = useForm<ISignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: ISignUpFormData) => {
    try {
      const response = await createNewUser(data);
      if (!response.ok) {
        if (response.status === 409)
          return toast({
            variant: 'error',
            title: 'Email already exists!',
          });
      }

      await signIn('credentials', {
        email: data.email,
        password: data.password,
      });

      router.push('/');
    } catch (error) {}
  };

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
        <h2 className="h2-bold mb-5 text-white-100">Create an account</h2>
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onSubmit)}>
            <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
              <RHFInput
                name="fullName"
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
              <RHFInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-6 grid w-full max-w-sm items-center gap-1.5">
              <RHFInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-6">
              <Button
                type="submit"
                disabled={registerForm.formState.isSubmitting}
              >
                Create an account
              </Button>
            </div>
          </form>
        </Form>
        <Link
          href="/login"
          className="mb-6 text-center text-sm text-white-300 underline"
        >
          Already have an acount
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

export default Register;
