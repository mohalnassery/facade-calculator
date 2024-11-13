import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { BarChart3, Users, Box, Wrench, Layers } from 'lucide-react';

export default async function AdminDashboard() {
  const [
    profileCount,
    accessoryCount,
    gasketCount,
    userCount,
  ] = await Promise.all([
    prisma.profile.count(),
    prisma.accessory.count(),
    prisma.gasket.count(),
    prisma.user.count(),
  ]);

  const stats = [
    {
      name: 'Total Profiles',
      value: profileCount,
      icon: Box,
      href: '/admin/profiles',
    },
    {
      name: 'Total Accessories',
      value: accessoryCount,
      icon: Wrench,
      href: '/admin/accessories',
    },
    {
      name: 'Total Gaskets',
      value: gasketCount,
      icon: Layers,
      href: '/admin/gaskets',
    },
    {
      name: 'Total Users',
      value: userCount,
      icon: Users,
      href: '/admin/users',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-semibold">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 text-gray-400" />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">No recent activity</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Database</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">API</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Operational
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}