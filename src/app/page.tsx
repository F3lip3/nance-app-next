import { getUserAuth } from '@/lib/auth/utils';
import { UserButton } from '@clerk/nextjs';

export default async function Home() {
  const userAuth = await getUserAuth();
  return (
    <main className="">
      <UserButton afterSignOutUrl="/" />
      <pre>{JSON.stringify(userAuth, null, 2)}</pre>
    </main>
  );
}
