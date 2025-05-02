import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Issue, IssueStatus, IssueType, Suggestion } from '../types';
import { mockIssues } from '../data/mockData';

interface IssueContextType {
  issues: Issue[];
  filteredIssues: Issue[];
  statusFilter: IssueStatus | 'All';
  typeFilter: IssueType | 'All';
  searchTerm: string;
  setStatusFilter: (status: IssueStatus | 'All') => void;
  setTypeFilter: (type: IssueType | 'All') => void;
  setSearchTerm: (term: string) => void;
  addIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'suggestions'>) => string | null;
  addSuggestion: (issueId: string, suggestionText: string) => void;
  voteSuggestion: (issueId: string, suggestionId: string, isHelpful: boolean) => void;
  reopenIssue: (issueId: string, attachment: string) => void;
  resolveIssue: (issueId: string) => void;
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const useIssues = () => {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};

interface IssueProviderProps {
  children: ReactNode;
}

export const IssueProvider: React.FC<IssueProviderProps> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<IssueType | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(issues);

  useEffect(() => {
    let filtered = [...issues];

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== 'All') {
      filtered = filtered.filter(issue => issue.type === typeFilter);
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        issue =>
          issue.title.toLowerCase().includes(term) ||
          issue.keywords.some(keyword => keyword.toLowerCase().includes(term)) ||
          issue.type.toLowerCase().includes(term)
      );
    }

    setFilteredIssues(filtered);
  }, [issues, statusFilter, typeFilter, searchTerm]);

  const addIssue = (
    newIssue: Omit<Issue, 'id' | 'createdAt' | 'suggestions'>
  ): string | null => {
    // Check for duplicate issues
    const isDuplicate = issues.some(
      issue =>
        issue.title.toLowerCase() === newIssue.title.toLowerCase() &&
        issue.type === newIssue.type
    );

    if (isDuplicate) {
      return 'A similar issue already exists. Please check existing issues.';
    }

    const issue: Issue = {
      ...newIssue,
      id: `${issues.length + 1}`,
      createdAt: new Date(),
      suggestions: [],
    };

    setIssues(prev => [...prev, issue]);
    return null;
  };

  const addSuggestion = (issueId: string, suggestionText: string) => {
    setIssues(prev =>
      prev.map(issue => {
        if (issue.id === issueId) {
          const newSuggestion: Suggestion = {
            id: `s${Date.now()}`,
            text: suggestionText,
            votes: {
              helpful: 0,
              notHelpful: 0,
            },
          };
          return {
            ...issue,
            suggestions: [...issue.suggestions, newSuggestion],
          };
        }
        return issue;
      })
    );
  };

  const voteSuggestion = (issueId: string, suggestionId: string, isHelpful: boolean) => {
    setIssues(prev =>
      prev.map(issue => {
        if (issue.id === issueId) {
          const updatedSuggestions = issue.suggestions.map(suggestion => {
            if (suggestion.id === suggestionId) {
              return {
                ...suggestion,
                votes: {
                  ...suggestion.votes,
                  helpful: isHelpful
                    ? suggestion.votes.helpful + 1
                    : suggestion.votes.helpful,
                  notHelpful: !isHelpful
                    ? suggestion.votes.notHelpful + 1
                    : suggestion.votes.notHelpful,
                },
              };
            }
            return suggestion;
          });
          return {
            ...issue,
            suggestions: updatedSuggestions,
          };
        }
        return issue;
      })
    );
  };

  const reopenIssue = (issueId: string, attachment: string) => {
    setIssues(prev =>
      prev.map(issue => {
        if (issue.id === issueId) {
          return {
            ...issue,
            status: 'Pending',
            attachments: [...(issue.attachments || []), attachment],
          };
        }
        return issue;
      })
    );
  };

  const resolveIssue = (issueId: string) => {
    setIssues(prev =>
      prev.map(issue => {
        if (issue.id === issueId) {
          return {
            ...issue,
            status: 'Resolved',
          };
        }
        return issue;
      })
    );
  };

  return (
    <IssueContext.Provider
      value={{
        issues,
        filteredIssues,
        statusFilter,
        typeFilter,
        searchTerm,
        setStatusFilter,
        setTypeFilter,
        setSearchTerm,
        addIssue,
        addSuggestion,
        voteSuggestion,
        reopenIssue,
        resolveIssue,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};