import { Content } from "@/types/content-res"
import { Quiz } from "@/types/quiz-res"

/**
 * Represents a section of a course, including its ID and title.
 */
export interface Section {
  id_section: number
  section_title: string
  content: Content[]
  quiz: Quiz[]
}
