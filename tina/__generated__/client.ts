import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/Users/sudongyang/Desktop/trae_mcp/a-life-in-beta/tina/__generated__/.cache/1753956290426', url: 'http://localhost:4001/graphql', token: 'undefined', queries,  });
export default client;
  