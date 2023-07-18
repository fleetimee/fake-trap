import { Content } from "@/types/content-res"
import { QuizData } from "@/types/quiz-res"

export interface Section {
  id_section: number
  section_title: string
  content: Content[]
  quiz: QuizData[]
}
