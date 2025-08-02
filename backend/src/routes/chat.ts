import { Router } from 'express';
import { z } from 'zod';
import { ChatRequest, ChatResponse } from '@/types';

const router = Router();

// 요청 스키마 검증
const chatRequestSchema = z.object({
  message: z.string().min(1).max(1000)
});

// 채팅 엔드포인트 (임시 구현)
router.post('/chat', async (req, res) => {
  try {
    const validatedData = chatRequestSchema.parse(req.body);
    const { message } = validatedData;

    // TODO: LLM API 연동 구현
    // 현재는 임시 응답
    const response: ChatResponse = {
      message: `"${message}"에 대한 답변입니다. (임시 응답 - LLM 연동 예정)`,
      sources: []
    };

    res.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: '잘못된 요청 형식입니다.',
        details: error.errors 
      });
    }

    console.error('Chat error:', error);
    res.status(500).json({ error: '채팅 처리 중 오류가 발생했습니다.' });
  }
});

export default router;
