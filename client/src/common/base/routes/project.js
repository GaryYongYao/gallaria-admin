import { Route } from 'react-router-dom'
import { ProjectFormScreen, ProjectListScreen } from 'modules/projects'

function ProjectsRoute() {
  return (
    <>
      <Route exact path="/projects" component={ProjectListScreen} />
      <Route exact path="/project/:id" component={ProjectFormScreen} />
    </>
  )
}

export default ProjectsRoute
