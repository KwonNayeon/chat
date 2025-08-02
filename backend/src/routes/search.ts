import { Router } from 'express';
import { z } from 'zod';
import { SearchService, detectCategory } from '@/services/searchService';
import { loadStudyData } from '@/utils/dataLoader';

const router = Router();
const studyData = loadStudyData();
const searchService = new SearchService(studyData.projects, studyData.faqs);

// 검색 엔드포인트
router.get('/search', (req, res) => {
  try {
    const { q: query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: '검색어가 필요합니다.' });
    }

    const category = detectCategory(query);
    const results = searchService.searchByCategory(query, category);
    
    res.json({
      query,
      category,
      results: results.map(result => ({
        id: result.item.id,
        title: 'title' in result.item ? result.item.title : result.item.question,
        content: 'description' in result.item ? result.item.description : result.item.answer,
        score: result.score,
        type: 'title' in result.item ? 'project' : 'faq'
      }))
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: '검색 중 오류가 발생했습니다.' });
  }
});

export default router;
