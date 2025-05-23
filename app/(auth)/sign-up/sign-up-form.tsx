'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { signUpUser } from '@/lib/actions/user.actions';
import { SignUpDefaultValues } from '@/lib/constants';
import { useTranslations } from 'next-intl';

const SignUpForm = () => {
  const t = useTranslations();

  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    const t = useTranslations();
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? t('CreatingAccount') : t('CreateAccount')}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground text-center">
          {t('Note')}: {t('NoteText')}
          <br />
          {t('Email')}: eve.holt@reqres.in
          <br />
          {t('Password')}: pistol
        </div>
        <div>
          <Label htmlFor="name">{t('Name')}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder={t('Name')}
            defaultValue={SignUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor="email">{t('Email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={t('Email')}
            defaultValue={SignUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">{t('Password')}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            placeholder={t('Password')}
            defaultValue={SignUpDefaultValues.password}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">{t('ConfirmPassword')}</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            placeholder={t('ConfirmPassword')}
            defaultValue={SignUpDefaultValues.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          {t('AlreadyHaveAnAccount')}{' '}
          <Link href="/sign-in" target="_self" className="link">
            {t('SignIn')}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
