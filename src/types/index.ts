export type IssueType = 'Common' | 'Frontend' | 'Backend' | 'QA';
export type IssueStatus = 'Pending' | 'Resolved';

export interface Suggestion {
  id: string;
  text: string;
  votes: {
    helpful: number;
    notHelpful: number;
  };
}

export interface Issue {
  id: string;
  title: string;
  type: IssueType;
  raisedBy: string;
  keywords: string[];
  description?: string;
  attachments?: string[];
  status: IssueStatus;
  createdAt: Date;
  suggestions: Suggestion[];
}