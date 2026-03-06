import { Suspense } from 'react';
import DashboardLayout from '@/components/portal/DashboardLayout';
import ResourcesContent from './ResourcesClient';

export default function ResourcesPage() {
  return (
    <Suspense fallback={
      <DashboardLayout memberType="student" userName="..." userRegNo="...">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin w-6 h-6 border-2 border-[#008751] border-t-transparent rounded-full" />
        </div>
      </DashboardLayout>
    }>
      <ResourcesContent />
    </Suspense>
  );
}

