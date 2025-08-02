import fs from 'fs';
import path from 'path';
import { StudyData } from '@/types';

export const loadStudyData = (): StudyData => {
  try {
    const dataPath = path.join(__dirname, '../../../data/study-projects.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData) as StudyData;
    
    console.log(`Loaded ${data.projects.length} projects and ${data.faqs.length} FAQs`);
    return data;
  } catch (error) {
    console.error('Error loading study data:', error);
    // 기본 데이터 반환
    return {
      projects: [],
      faqs: []
    };
  }
};

export const validateStudyData = (data: StudyData): boolean => {
  if (!data.projects || !data.faqs) {
    return false;
  }
  
  // 기본적인 데이터 구조 검증
  const hasValidProjects = data.projects.every(project => 
    project.id && project.title && project.description
  );
  
  const hasValidFAQs = data.faqs.every(faq => 
    faq.id && faq.question && faq.answer
  );
  
  return hasValidProjects && hasValidFAQs;
};
