import React from 'react';
import IssueCard from './IssueCard';
import { useIssues } from '../context/IssueContext';
import { ClipboardList } from 'lucide-react';

const IssueList: React.FC = () => {
  const { filteredIssues } = useIssues();

  if (filteredIssues.length === 0) {
    return (
      <div className="mt-8 text-center p-8 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No issues found</h3>
        <p className="mt-1 text-gray-500">
          No issues match your current filters. Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {filteredIssues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
};

export default IssueList;