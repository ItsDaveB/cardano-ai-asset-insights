import NodeCache from "node-cache";

export const CACHE_TTL_SECONDS = parseInt(process.env.CACHE_TTL_SECONDS || "3600", 10);

const cache = new NodeCache({ stdTTL: CACHE_TTL_SECONDS });

export default cache;
