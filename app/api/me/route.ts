import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = await headers();
    const authToken = headersList.get('authorization');

    if (!authToken || !authToken.startsWith('Bearer ')) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/1`,
      {
        headers: {
          Authorization: authToken,
          'x-api-key': process.env.REQRES_API_KEY ?? '',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    const user = data.data;

    const userProfile = {
      email: user.email,
      avatar: user.avatar,
      firstName: user.first_name,
      lastName: user.last_name,
      dateOfCreation: new Date().toISOString(),
      subscribes: [],
      support: data.support,
    };

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('[ME_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
