import app from "./app";
import config from "./config";

const PORT = config.NODE_PORT ? config.NODE_PORT : 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
