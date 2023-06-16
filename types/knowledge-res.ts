/**
 * Represents a collection of knowledge data.
 */
export interface Knowledge {
  /**
   * The total number of knowledge data items in the collection.
   */
  count: number
  /**
   * An array of knowledge data items.
   */
  data: KnowledgeData[]
  /**
   * The current page number.
   */
  page: number
  /**
   * The total number of pages in the collection.
   */
  totalPages: number
}

/**
 * Represents a knowledge data item.
 */
export interface KnowledgeData {
  /**
   * The ID of the knowledge data item.
   */
  id_knowledge: number
  /**
   * The title of the knowledge data item.
   */
  knowledge_title: string
  /**
   * The description of the knowledge data item.
   */
  description: string
  /**
   * The status of the knowledge data item.
   */
  status: number
  /**
   * The image of the knowledge data item.
   */
  image: string
  /**
   * The sections of the knowledge data item.
   */
  section: KnowledgeSection[]
  /**
   * The courses of the knowledge data item.
   */
  course?: KnowledgeCourse[]
  /**
   * The ID of the category of the knowledge data item.
   */
  id_category: number
}

/**
 * Represents a course associated with a knowledge data item.
 */
export interface KnowledgeCourse {
  /**
   * The ID of the course.
   */
  id_course: number
  /**
   * The ID of the knowledge data item.
   */
  id_knowledge: number
  /**
   * The name of the course.
   */
  course_name: string
  /**
   * The description of the course.
   */
  course_desc: string
  /**
   * The image of the course.
   */
  image: string
  /**
   * The start date of the course.
   */
  date_start: Date
  /**
   * The end date of the course.
   */
  date_end: Date
}

/**
 * Represents a section associated with a knowledge data item.
 */
export interface KnowledgeSection {
  /**
   * The ID of the section.
   */
  id_section: number
  /**
   * The title of the section.
   */
  section_title: string
}
