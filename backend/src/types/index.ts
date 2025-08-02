export interface StudyProject {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'recruiting';
  participants: number;
  duration: string;
  tech_stack: string[];
  meeting_schedule: string;
  keywords: string[];
  tags: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  tags: string[];
}

export interface StudyData {
  projects: StudyProject[];
  faqs: FAQ[];
}

export interface SearchResult {
  item: StudyProject | FAQ;
  score: number;
  matches?: readonly {
    indices: readonly [number, number][];
    value?: string;
    key?: string;
    arrayIndex?: number;
  }[];
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  message: string;
  sources?: Array<{
    id: string;
    title: string;
    content: string;
    score: number;
    type: 'project' | 'faq';
  }>;
}
