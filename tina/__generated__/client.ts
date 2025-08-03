import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '896dd6592c32e64e5b68e82b5dab0f4cde56b85c', queries,  });
export default client;
  