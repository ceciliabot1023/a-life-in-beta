import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'https://content.tinajs.io/1.6/content/undefined/github/undefined', token: 'undefined', queries,  });
export default client;
  