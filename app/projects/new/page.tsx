import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import NewProjectForm from './new-project-form';

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>

        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
          <NewProjectForm />
        </Card>
      </div>
    </main>
  );
}