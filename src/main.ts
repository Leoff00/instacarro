import { app } from "./infra/http/app";
import { connect } from "./shared/mongoose";

const PORT = 3000;

app.listen(PORT, async () => {
  await connect();
  console.log(
    `[INSTACARROS - LEILÃO] - Listening on PORT http://localhost:3000`
  );
});
