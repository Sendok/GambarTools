'use client';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', error: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value, error: '' });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push('/');
    } catch (err: any) {
      setForm({ ...form, error: err.message });
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push('/');
    } catch (err: any) {
      setForm({ ...form, error: err.message });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Welcome Back</CardTitle>
          <CardDescription>Please enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" required value={form.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-muted-foreground hover:text-accent underline-offset-4 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" placeholder="your password" type="password" required value={form.password} onChange={handleChange} />
            </div>
            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
              size="lg"
            >
              Sign In
            </Button>
          </form>
          <Separator className="my-6 flex items-center justify-center">
            <span className="px-4 bg-card text-muted-foreground text-center block mx-auto">OR</span>
          </Separator>
          <div className="space-y-3">
            <Button variant="outline" className="w-full" size="lg" onClick={handleGoogle}>
              <span className="flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block" aria-hidden="true">
                  <g>
                    <path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.6l6-6C34.5 5.1 29.5 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
                    <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c2.7 0 5.2.9 7.2 2.6l6-6C34.5 5.1 29.5 3 24 3 16.3 3 9.4 7.8 6.3 14.7z"/>
                    <path fill="#FBBC05" d="M24 43c5.3 0 10.1-1.7 13.8-4.7l-6.4-5.2C29.6 34.7 27 35.5 24 35.5c-5.5 0-10.1-3.7-11.7-8.7l-6.6 5.1C9.4 40.2 16.3 43 24 43z"/>
                    <path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 3-3.7 5.5-7.3 6.7l6.4 5.2C39.7 37.1 44 31.7 44 24c0-1.3-.1-2.7-.4-4z"/>
                  </g>
                </svg>
                Continue with Google
              </span>
            </Button>
          </div>
          {form.error && <div className="text-red-500 text-center">{form.error}</div>}
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-accent font-semibold hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
