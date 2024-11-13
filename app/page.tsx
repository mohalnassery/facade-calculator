import { ProjectList } from './components/projects/project-list';

// Mock data for demonstration
const mockProjects = [
  {
    id: '1',
    name: 'Marina Bay Tower',
    clientName: 'Coastal Developments Ltd',
    location: 'Manama, Bahrain',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    status: 'DESIGN' as const,
    progress: 25,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Business District Plaza',
    clientName: 'Commercial Properties Inc',
    location: 'Riffa, Bahrain',
    startDate: '2024-02-01',
    endDate: '2025-03-31',
    status: 'FABRICATION' as const,
    progress: 45,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-01'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Facade Projects</h1>
          <p className="text-gray-600 mt-2">
            Manage and track your facade construction projects
          </p>
        </div>

        <ProjectList projects={mockProjects} />
      </div>
    </main>
  );
}