import Home from './routes/Home.svelte'
import Editor from './routes/Editor.svelte'
import Graph from './routes/Graph.svelte'

const routes = {
  '/': Home,
  '/editor': Editor,
  '/graph': Graph, 
}

export default routes