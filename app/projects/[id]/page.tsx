import { notFound } from 'next/navigation';
import { Project } from '@/app/types/project';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock data - In a real app, this would come from your database
const mockProjects: Record<string, Project> = {
  '1': {
    id: '1',
    name: 'Marina Bay Tower',
    clientName: 'Coastal Developments Ltd',
    location: 'Manama, Bahrain',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    status: 'DESIGN',
    progress: 25,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  '2': {
    id: '2',
    name: 'Business District Plaza',
    clientName: 'Commercial Properties Inc',
    location: 'Riffa, Bahrain',
    startDate: '2024-02-01',
    endDate: '2025-03-31',
    status: 'FABRICATION',
    progress: 45,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-01'
  }
};

export function generateStaticParams() {
  return Object.keys(mockProjects).map((id) => ({
    id: id,
  }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = mockProjects[params.id];

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <p className="text-gray-600">{project.clientName}</p>
            </div>
            <Badge variant={project.status === 'COMPLETED' ? 'default' : 'secondary'}>
              {project.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Project Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Last Updated</h3>
              <p className="text-sm text-gray-600">
                {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Created On</h3>
              <p className="text-sm text-gray-600">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Project Duration</h3>
              <p className="text-sm text-gray-600">
                {Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}