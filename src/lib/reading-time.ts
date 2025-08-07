/**
 * Tính thời gian đọc dựa trên số từ
 * Trung bình người đọc 200-250 từ/phút
 */
export const calculateReadingTime = (content: string): number => {
  if (!content) return 0;

  // Loại bỏ HTML tags
  const textContent = content.replace(/<[^>]*>/g, "");

  // Đếm số từ (split by whitespace)
  const wordCount = textContent.trim().split(/\s+/).length;

  // Tính phút đọc (trung bình 200 từ/phút)
  const readingTime = Math.ceil(wordCount / 200);

  return Math.max(1, readingTime); // Tối thiểu 1 phút
};
