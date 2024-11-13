import { prisma } from '@/lib/prisma';
import { DataTable } from './data-table';
import { columns } from './columns';

export default async function ProfilesPage() {
  const profiles = await prisma.profile.findMany({
    orderBy: {
      code: 'asc',
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profiles</h1>
      </div>

      <DataTable columns={columns} data={profiles} />
    </div>
  );
}