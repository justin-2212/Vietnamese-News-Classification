import axios from "axios";

export const CATEGORIES = [
  "bất động sản",
  "du lịch",
  "giáo dục",
  "giải trí",
  "góc nhìn",
  "khoa học công nghệ",
  "kinh doanh",
  "pháp luật",
  "sức khỏe",
  "thể thao",
  "thời sự",
  "tâm sự",
  "xe",
  "đời sống",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Prediction = {
  label: Category;
  confidence: number;
  scores: Record<Category, number>;
  timestamp: string;
  processingTimeMs: number;
};

// Keyword lexicon — lowercase, diacritics preserved.
const KEYWORDS: Record<Category, string[]> = {
  "bất động sản": ["nhà đất", "căn hộ", "chung cư", "bất động sản", "dự án", "biệt thự", "đất nền", "mặt bằng"],
  "du lịch": ["du lịch", "khách sạn", "tour", "điểm đến", "nghỉ dưỡng", "bãi biển", "khám phá", "resort"],
  "giáo dục": ["học sinh", "sinh viên", "giáo viên", "trường", "đại học", "kỳ thi", "giáo dục", "tuyển sinh"],
  "giải trí": ["ca sĩ", "diễn viên", "phim", "âm nhạc", "showbiz", "mv", "nghệ sĩ", "concert"],
  "góc nhìn": ["góc nhìn", "ý kiến", "quan điểm", "bình luận", "tranh luận", "suy nghĩ"],
  "khoa học công nghệ": ["công nghệ", "ai", "trí tuệ nhân tạo", "phần mềm", "ứng dụng", "smartphone", "máy tính", "khoa học"],
  "kinh doanh": ["doanh nghiệp", "thị trường", "cổ phiếu", "đầu tư", "kinh doanh", "tài chính", "ngân hàng", "lợi nhuận"],
  "pháp luật": ["pháp luật", "tòa án", "khởi tố", "bị cáo", "vụ án", "công an", "điều tra", "bắt giữ"],
  "sức khỏe": ["sức khỏe", "bệnh", "bác sĩ", "bệnh viện", "thuốc", "điều trị", "vắc xin", "dịch"],
  "thể thao": ["bóng đá", "cầu thủ", "huấn luyện viên", "trận đấu", "đội tuyển", "vô địch", "giải đấu", "ronaldo", "messi"],
  "thời sự": ["chính phủ", "thủ tướng", "quốc hội", "chính sách", "hội nghị", "quyết định", "ban hành"],
  "tâm sự": ["tâm sự", "vợ chồng", "hôn nhân", "tình yêu", "chia tay", "gia đình", "người yêu"],
  "xe": ["ô tô", "xe máy", "động cơ", "xe hơi", "mô tô", "honda", "toyota", "vinfast", "mã lực"],
  "đời sống": ["đời sống", "nấu ăn", "công thức", "mẹo", "gia đình", "thường ngày", "lối sống"],
};

function softmax(values: number[]): number[] {
  const max = Math.max(...values);
  const exps = values.map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

function scoreText(text: string): Record<Category, number> {
  const lower = text.toLowerCase();
  const raw: number[] = CATEGORIES.map((cat) => {
    const kws = KEYWORDS[cat];
    let hits = 0;
    for (const kw of kws) {
      const matches = lower.split(kw).length - 1;
      hits += matches;
    }
    // Logit: keyword hits dominate, small noise for ties.
    return hits * 1.6 + Math.random() * 0.25;
  });
  const probs = softmax(raw);
  const scores = {} as Record<Category, number>;
  CATEGORIES.forEach((cat, i) => {
    scores[cat] = probs[i];
  });
  return scores;
}

/**
 * Mock prediction service. Swap with a real PhoBERT REST call by replacing
 * the body of this function — the return shape stays identical.
 */
export async function predictTopic(text: string): Promise<Prediction> {
  const start = performance.now();
  const latency = 400 + Math.random() * 500;
  await new Promise((r) => setTimeout(r, latency));

  const scores = scoreText(text);
  const entries = Object.entries(scores) as [Category, number][];
  entries.sort((a, b) => b[1] - a[1]);
  const [label, confidence] = entries[0];

  return {
    label,
    confidence,
    scores,
    timestamp: new Date().toISOString(),
    processingTimeMs: Math.round(performance.now() - start),
  };
}

// Real API placeholder (unused). Kept so axios is wired for future swap.
export async function predictTopicRemote(text: string, endpoint: string): Promise<Prediction> {
  const { data } = await axios.post<Prediction>(endpoint, { text });
  return data;
}
