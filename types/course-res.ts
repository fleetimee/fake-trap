/**
 * Represents the data of a course, including its ID, knowledge ID, name, description, image, start and end dates, and sections.
 */
export interface CourseData {
  id_course: number
  id_knowledge: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
  section: Section[]
}

/**
 * Represents a section of a course, including its ID and title.
 */
export interface Section {
  id_section: number
  section_title: string
}

/**
 * Represents a response containing a list of courses, including the total count, data, page number, and total number of pages.
 */
export interface Course {
  count: number
  data: CourseData[]
  page: number
  totalPages: number
}
