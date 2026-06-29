import React, { useState } from 'react';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { Auth } from '@/components/Auth';

export default function App() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  if (!user) {
    return <Auth onLoginSuccess={setUser} />;
  }

  return <ResumeBuilder />;
}
