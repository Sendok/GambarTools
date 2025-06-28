'use client';
import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
      if (!u) router.push('/login');
      setUser(u);
      setDisplayName(u?.displayName || '');
      setEmail(u?.email || '');
    });
    return () => unsub();
  }, [router]);

  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateProfile(user, { displayName });
      setUser({ ...user, displayName });
      setEditMode(false);
      setMessage('Profile updated successfully!');
    } catch (err: any) {
      setMessage('Failed to update profile.');
    }
    setSaving(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-accent">
              {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
            </div>
            <Button variant="outline" size="sm" onClick={() => setEditMode((v) => !v)}>
              {editMode ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
          {editMode ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input value={email} disabled />
              </div>
              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              {message && <div className="text-center text-sm mt-2">{message}</div>}
            </form>
          ) : (
            <div className="space-y-2 text-center">
              <div className="text-lg font-semibold">{user.displayName}</div>
              <div className="text-muted-foreground">{user.email}</div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/profile/setting" className="w-full">
            <Button variant="outline" className="w-full">Setting</Button>
          </Link>
          <Link href="/profile/billing" className="w-full">
            <Button variant="outline" className="w-full">Billing Plan</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}