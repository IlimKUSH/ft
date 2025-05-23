import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Session } from 'next-auth';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

interface ISession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('Profile'),
  };
}

async function getProfile() {
  const session = (await auth()) as ISession | null;

  if (!session || !session.user) {
    redirect('/sign-in');
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/me`, {
    headers: {
      Authorization: `Bearer ${session.user.token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
}

export default async function ProfilePage() {
  const t = await getTranslations();
  const profile = await getProfile();

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {profile.avatar && (
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={profile.avatar}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <CardTitle>
                {profile.firstName} {profile.lastName}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              {t('AccountCreated')}
            </h3>
            <p className="text-lg">
              {new Date(profile.dateOfCreation).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              {t('Subscriptions')}
            </h3>
            {profile.subscribes.length > 0 ? (
              <ul className="list-disc list-inside">
                {profile.subscribes.map((subscribe: string, index: number) => (
                  <li key={index}>{subscribe}</li>
                ))}
              </ul>
            ) : (
              <p className="text-lg">{t('NoActiveSubscriptions')}</p>
            )}
          </div>
          {profile.support && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {t('Support')}
              </h3>
              <p className="text-lg">{profile.support.text}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
