<script>
  import { Route } from "svelte-routing";

  import Home from "./routes/Home.svelte";
  import Editor from "./routes/Editor.svelte";
  import Graph from "./routes/Graph.svelte";
  import NotFound from "./routes/NotFound.svelte";
</script>

<Route path="/" component={Home} />
<Route path="/editor" component={Editor} />
<Route path="/graph" component={Graph} />
<Route path="*" component={NotFound} />
