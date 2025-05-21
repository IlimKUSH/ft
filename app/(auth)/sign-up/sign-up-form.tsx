'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { signUpUser } from "@/lib/actions/user.actions";
import { SignUpDefaultValues } from "@/lib/constants";

const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: '',
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const SignUpButton = () => {
        const { pending } = useFormStatus();

        return (
            <Button disabled={pending} className='w-full' variant='default'>
                {pending ? 'Creating Account...' : 'Create Account'}
            </Button>
        );
    };

    return (
        <form action={action}>
            <input type='hidden' name='callbackUrl' value={callbackUrl} />
            <div className='space-y-6'>
                <div className="text-sm text-muted-foreground text-center">
                    Note: Using reqres.in mock API. Please use the predefined credentials:
                    <br />
                    Email: eve.holt@reqres.in
                    <br />
                    Password: pistol
                </div>
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                        id='name'
                        name='name'
                        type='text'
                        autoComplete='name'
                        required
                        placeholder='Enter your name'
                        defaultValue={SignUpDefaultValues.name}
                    />
                </div>
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        required
                        placeholder='Enter your email'
                        defaultValue={SignUpDefaultValues.email}
                    />
                </div>
                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        required
                        autoComplete='new-password'
                        placeholder='Enter your password'
                        defaultValue={SignUpDefaultValues.password}
                    />
                </div>
                <div>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        required
                        autoComplete='new-password'
                        placeholder='Confirm your password'
                        defaultValue={SignUpDefaultValues.confirmPassword}
                    />
                </div>
                <div>
                    <SignUpButton />
                </div>

                {data && !data.success && (
                    <div className='text-center text-destructive'>{data.message}</div>
                )}

                <div className='text-sm text-center text-muted-foreground'>
                    Already have an account?{' '}
                    <Link href='/sign-in' target='_self' className='link'>
                        Sign In
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;