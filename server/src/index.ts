import { app } from "./app.js";
import { config } from "./config/env.js";

if (!config.isVercel) {
  app.listen(config.port, () => {
    console.log(`🚀 Alghaish server running on http://localhost:${config.port}`);
  });
}

export default app;
