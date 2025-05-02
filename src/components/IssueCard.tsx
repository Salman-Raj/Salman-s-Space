import React, { useState } from 'react';
import { Issue, IssueType } from '../types';
import { ThumbsUp, ThumbsDown, RefreshCw, CheckCircle } from 'lucide-react';
import { useIssues } from '../context/IssueContext';

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [reopenAttachment, setReopenAttachment] = useState('');
  const [newSuggestion, setNewSuggestion] = useState('');
  const [reopenMode, setReopenMode] = useState(false);
  
  const { addSuggestion, voteSuggestion, reopenIssue, resolveIssue } = useIssues();

  const getTypeColor = (type: IssueType) => {
    switch (type) {
      case 'Frontend':
        return 'bg-blue-100 text-blue-800';
      case 'Backend':
        return 'bg-purple-100 text-purple-800';
      case 'QA':
        return 'bg-amber-100 text-amber-800';
      case 'Common':
        return 'bg-green-100 text-green-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSuggestion.trim()) {
      addSuggestion(issue.id, newSuggestion);
      setNewSuggestion('');
    }
  };

  const handleReopenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reopenAttachment.trim()) {
      reopenIssue(issue.id, reopenAttachment);
      setReopenAttachment('');
      setReopenMode(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg border border-gray-100">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
            <div className="flex items-center mt-1 space-x-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                  issue.type
                )}`}
              >
                {issue.type}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  issue.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {issue.status}
              </span>
            </div>
          </div>
          <span className="text-sm text-gray-500">{formatDate(issue.createdAt)}</span>
        </div>

        <div className="mt-3">
          <p className="text-sm text-gray-600">
            {issue.description || 'No description provided.'}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {issue.keywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Raised by: <span className="font-medium">{issue.raisedBy}</span>
          </div>

          <div className="flex space-x-2">
            {issue.status === 'Pending' ? (
              <button
                onClick={() => resolveIssue(issue.id)}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 transition-colors duration-200"
              >
                <CheckCircle size={14} className="mr-1" />
                Resolve
              </button>
            ) : (
              <button
                onClick={() => setReopenMode(true)}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded hover:bg-amber-200 transition-colors duration-200"
              >
                <RefreshCw size={14} className="mr-1" />
                Reopen
              </button>
            )}
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded hover:bg-indigo-200 transition-colors duration-200"
            >
              {showSuggestions ? 'Hide Suggestions' : 'Show Suggestions'}
            </button>
          </div>
        </div>
      </div>

      {/* Reopen Form */}
      {reopenMode && (
        <div className="p-4 bg-amber-50 border-t border-amber-200">
          <h4 className="text-sm font-medium text-amber-900 mb-2">Reopen Issue</h4>
          <form onSubmit={handleReopenSubmit}>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Attachment URL (required)
              </label>
              <input
                type="text"
                value={reopenAttachment}
                onChange={(e) => setReopenAttachment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter attachment URL"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setReopenMode(false)}
                className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-xs font-medium text-white bg-amber-600 rounded hover:bg-amber-700"
              >
                Reopen Issue
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Suggestions Section */}
      {showSuggestions && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Suggestions</h4>
          
          {issue.suggestions.length > 0 ? (
            <div className="space-y-3">
              {issue.suggestions.map((suggestion) => (
                <div key={suggestion.id} className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-sm text-gray-800">{suggestion.text}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Helpful: {suggestion.votes.helpful} | Not Helpful: {suggestion.votes.notHelpful}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => voteSuggestion(issue.id, suggestion.id, true)}
                        className="inline-flex items-center p-1 text-xs text-green-700 rounded hover:bg-green-100"
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        onClick={() => voteSuggestion(issue.id, suggestion.id, false)}
                        className="inline-flex items-center p-1 text-xs text-red-700 rounded hover:bg-red-100"
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No suggestions yet.</p>
          )}
          
          <form onSubmit={handleSuggestionSubmit} className="mt-3">
            <div className="flex">
              <input
                type="text"
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Add a suggestion..."
              />
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default IssueCard;