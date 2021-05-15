const projectSchema = `
type Project {
  _id: ID!
  name: String
  location: String
  type: String
  date: String
  desc: String
  cover: String
  photos: [String]
  products: [InvolvedProduct]
  isDraft: Boolean
  justCreated: Boolean
  createdBy: ID
  updatedBy: ID
  createdDate: String
}
type InvolvedProduct {
  name: String
  code: String
  primaryImage: String
}
type ProjectFeedback {
  _id: ID!
  name: String
  location: String
  type: String
  date: String
  desc: String
  cover: String
  photos: [String]
  products: [ID]
  isDraft: Boolean
  justCreated: Boolean
  createdBy: ID
  updatedBy: ID
  createdDate: String
}
input ProjectInput {
  _id: ID!
  name: String
  location: String
  type: String
  date: String
  desc: String
  cover: String
  photos: [String]
  products: [ID]
  isDraft: Boolean
  justCreated: Boolean
  updatedBy: ID
}
`

const projectQuery = `
getAllProjects: [Project]
getProjects: [Project]
getLatestProjects(_id: ID!): [Project]
getProjectById(_id: ID!): Project
getAdminProjectById(_id: ID!): ProjectFeedback
`

const projectMutation = `
createProject(id: ID!): ID
editProject(projectInput: ProjectInput!): ProjectFeedback
deleteProject(_id: ID!): String
`

module.exports = {
  projectSchema,
  projectQuery,
  projectMutation
}