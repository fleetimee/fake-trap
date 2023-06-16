/**
 * Defines the UserResponse type, which represents the response data of a user request.
 * @typedef {Object} UserResponse
 * @property {number} count - The total number of users in the response.
 * @property {UserData[]} data - An array of UserData objects representing the users in the response.
 * @property {number} page - The current page number of the response.
 * @property {number} totalPages - The total number of pages in the response.
 */
export type UserResponse = {
  count: number
  data: UserData[]
  page: number
  totalPages: number
}

/**
 * Defines the UserData type, which represents the data of a user.
 * @typedef {Object} UserData
 * @property {string} uuid - The unique identifier of the user.
 * @property {Date} created_at - The date when the user was created.
 * @property {Date} updated_at - The date when the user was last updated.
 * @property {null} deleted_at - The date when the user was deleted (null if not deleted).
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {Date|null} last_login - The date when the user last logged in (null if never logged in).
 * @property {null} user_quiz - The quiz data of the user (null if not available).
 */
export type UserData = {
  uuid: string
  created_at: Date
  updated_at: Date
  deleted_at: null
  username: string
  email: string
  password: string
  last_login: Date | null
  user_quiz: null
}
