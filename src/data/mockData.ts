import { Issue } from '../types';

// Function to generate a random date in the last 30 days
const getRandomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  return new Date(now.setDate(now.getDate() - daysAgo));
};

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Cannot connect to API endpoint',
    type: 'Backend',
    raisedBy: 'John Doe',
    keywords: ['API', 'connection', 'error'],
    description: 'When trying to connect to the /users endpoint, I receive a 500 error.',
    status: 'Pending',
    createdAt: getRandomDate(),
    suggestions: [
      {
        id: 's1',
        text: 'Check if the server is running and the endpoint is correctly implemented',
        votes: {
          helpful: 12,
          notHelpful: 2,
        },
      },
    ],
  },
  {
    id: '2',
    title: 'Button styling is inconsistent across pages',
    type: 'Frontend',
    raisedBy: 'Jane Smith',
    keywords: ['UI', 'buttons', 'styling'],
    description: 'The primary button has different styling on the dashboard vs the profile page',
    status: 'Resolved',
    createdAt: getRandomDate(),
    suggestions: [
      {
        id: 's2',
        text: 'Create a shared button component that can be used across all pages',
        votes: {
          helpful: 8,
          notHelpful: 1,
        },
      },
    ],
  },
  {
    id: '3',
    title: 'Login page is not mobile responsive',
    type: 'Frontend',
    raisedBy: 'Mike Johnson',
    keywords: ['responsive', 'mobile', 'login'],
    description: 'The login form elements overlap on mobile screens smaller than 375px',
    status: 'Pending',
    createdAt: getRandomDate(),
    suggestions: [],
  },
  {
    id: '4',
    title: 'Tests failing for user authentication',
    type: 'QA',
    raisedBy: 'Sarah Williams',
    keywords: ['tests', 'authentication', 'failing'],
    description: 'The user authentication tests are failing on the CI pipeline',
    status: 'Resolved',
    createdAt: getRandomDate(),
    suggestions: [
      {
        id: 's3',
        text: 'Update the test fixtures with the new auth schema',
        votes: {
          helpful: 5,
          notHelpful: 0,
        },
      },
    ],
  },
  {
    id: '5',
    title: 'Database migration script timeout',
    type: 'Backend',
    raisedBy: 'Alex Chen',
    keywords: ['database', 'migration', 'timeout'],
    description: 'The database migration script times out when running on production',
    status: 'Pending',
    createdAt: getRandomDate(),
    suggestions: [
      {
        id: 's4',
        text: 'Break the migration into smaller batches',
        votes: {
          helpful: 7,
          notHelpful: 1,
        },
      },
    ],
  },
  {
    id: '6',
    title: 'Documentation is outdated',
    type: 'Common',
    raisedBy: 'Emma Lee',
    keywords: ['documentation', 'outdated'],
    description: 'The API documentation does not match the current implementation',
    status: 'Pending',
    createdAt: getRandomDate(),
    suggestions: [],
  },
  {
    id: '7',
    title: 'Performance issue on dashboard loading',
    type: 'Frontend',
    raisedBy: 'Tom Wilson',
    keywords: ['performance', 'dashboard', 'loading'],
    description: 'The dashboard takes more than 5 seconds to load on slower connections',
    status: 'Pending',
    createdAt: getRandomDate(),
    suggestions: [
      {
        id: 's5',
        text: 'Implement lazy loading for dashboard widgets',
        votes: {
          helpful: 10,
          notHelpful: 2,
        },
      },
    ],
  },
];