import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export default function Home() {

  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')
  console.log(token);

  return (
    redirect('/login')
  )
}
