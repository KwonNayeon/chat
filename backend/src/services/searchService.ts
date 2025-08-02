import Fuse from 'fuse.js';
import { StudyProject, FAQ, SearchResult } from '@/types';

// Fuse.js 설정
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'keywords', weight: 0.3 },
    { name: 'description', weight: 0.2 },
    { name: 'tech_stack', weight: 0.1 }
  ],
  threshold: 0.4, // 0.0 (완전 일치) ~ 1.0 (모든 것 매칭)
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2
};

export class SearchService {
  private projectsFuse: Fuse<StudyProject>;
  private faqsFuse: Fuse<FAQ>;

  constructor(projects: StudyProject[], faqs: FAQ[]) {
    this.projectsFuse = new Fuse(projects, fuseOptions);
    this.faqsFuse = new Fuse(faqs, fuseOptions);
  }

  searchProjects(query: string): SearchResult[] {
    const results = this.projectsFuse.search(query);
    return results
      .filter(result => (result.score ?? 1) < 0.6) // 관련성 필터
      .map(result => ({
        item: result.item,
        score: result.score ?? 0,
        matches: result.matches as readonly {
          indices: readonly [number, number][];
          value?: string;
          key?: string;
          arrayIndex?: number;
        }[]
      }));
  }

  searchFAQs(query: string): SearchResult[] {
    const results = this.faqsFuse.search(query);
    return results
      .filter(result => (result.score ?? 1) < 0.6)
      .map(result => ({
        item: result.item,
        score: result.score ?? 0,
        matches: result.matches as readonly {
          indices: readonly [number, number][];
          value?: string;
          key?: string;
          arrayIndex?: number;
        }[]
      }));
  }

  searchAll(query: string): SearchResult[] {
    const projectResults = this.searchProjects(query);
    const faqResults = this.searchFAQs(query);
    
    // 결과를 점수 순으로 정렬하여 반환
    return [...projectResults, ...faqResults]
      .sort((a, b) => a.score - b.score)
      .slice(0, 5); // 상위 5개 결과만 반환
  }

  searchByCategory(query: string, category: string): SearchResult[] {
    const allResults = this.searchAll(query);
    
    if (category === 'general') {
      return allResults;
    }
    
    return allResults.filter(result => 
      result.item.tags.includes(category)
    );
  }
}

export const detectCategory = (query: string): string => {
  const categoryKeywords = {
    'project': ['프로젝트', '과제', 'project'],
    'study': ['스터디', '공부', 'study', '학습'],
    'schedule': ['일정', '시간', '언제', 'when', 'schedule'],
    'participation': ['참여', '신청', '가입', 'join', 'apply']
  };
  
  const queryLower = query.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => queryLower.includes(keyword))) {
      return category;
    }
  }
  return 'general';
};
