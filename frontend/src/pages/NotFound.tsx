import React from 'react';
import { PageLayout } from '../layout/PageLayout';
import { AlertOctagon, Home } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center font-mono">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#FF5C35]/30 bg-[#FF5C35]/10 text-[#FF5C35]">
          <AlertOctagon className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-black text-white">404 - RESOURCE NOT FOUND</h1>
        <p className="mt-2 text-xs text-slate-400">The requested forensic route or image reference does not exist on PixelVault.</p>
        <div className="mt-6">
          <Link to="/">
            <Button variant="primary" icon={<Home className="h-4 w-4" />}>
              RETURN TO DASHBOARD
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};
