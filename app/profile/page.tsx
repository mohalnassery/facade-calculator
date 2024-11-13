import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Card } from '@/components/ui/card';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1">{session.user.email}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            <p className="mt-1">{session.user.name || 'Not set'}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Role</h3>
            <p className="mt-1 capitalize">{session.user.role.toLowerCase()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}