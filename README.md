# CareerPilot AI V3

CareerPilot AI V3 is organized around the product logic in `简历产品逻辑.docx`:

1. Resume intake
2. Resume parsing
3. Resume diagnosis
4. Target role input
5. JD parsing
6. Resume/JD matching
7. Targeted resume optimization
8. Optimized match score
9. Interview question prediction
10. Standard answer generation
11. Chinese/English mock interview, text/voice
12. Interview scoring
13. Interview review
14. Next-round training plan

## Run locally

```bash
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

Open http://localhost:3000.

Without `OPENAI_API_KEY`, analysis/evaluation/next-question endpoints use deterministic demo responses. PDF/DOCX/TXT resume parsing remains available.
