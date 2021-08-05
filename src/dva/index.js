import dva from "dva";

// 1. Initialize (默认是hash路由)
const createHistory = require("history").createBrowserHistory;

export const app = dva({
  history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/example").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
