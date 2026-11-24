// AI provider abstraction — free-first fallback chain (researched 2026-11-24).
// Order = priority. A provider is only tried when its key exists in env
// (Pollinations needs no key). Every call has a timeout; on 429/5xx/timeout
// the chain moves to the next provider. Keys live ONLY in server env.
const TIMEOUT_MS = 30000;

export function listProviders(env = process.env) {
  const P = [];
  if (env.AI_API_KEY && env.AI_BASE_URL) P.push({ id: 'custom', base: env.AI_BASE_URL, key: env.AI_API_KEY, model: env.AI_MODEL || 'gpt-4.1-mini', vision: true });
  if (env.GEMINI_API_KEY) P.push({ id: 'gemini', base: 'https://generativelanguage.googleapis.com/v1beta/openai', key: env.GEMINI_API_KEY, model: env.GEMINI_MODEL || 'gemini-2.5-flash', vision: true });
  if (env.OPENROUTER_API_KEY) P.push({ id: 'openrouter', base: 'https://openrouter.ai/api/v1', key: env.OPENROUTER_API_KEY, model: env.OPENROUTER_MODEL || 'google/gemma-4-31b-it:free', vision: true });
  if (env.GROQ_API_KEY) P.push({ id: 'groq', base: 'https://api.groq.com/openai/v1', key: env.GROQ_API_KEY, model: env.GROQ_MODEL || 'meta-llama/llama-4-scout-17b-16e-instruct', vision: true });
  if (env.ZAI_API_KEY) P.push({ id: 'zai', base: 'https://api.z.ai/api/paas/v4', key: env.ZAI_API_KEY, model: env.ZAI_MODEL || 'glm-4.6v-flash', vision: true });
  if (env.MISTRAL_API_KEY) P.push({ id: 'mistral', base: 'https://api.mistral.ai/v1', key: env.MISTRAL_API_KEY, model: env.MISTRAL_MODEL || 'mistral-small-latest', vision: true });
  if (env.SAMBANOVA_API_KEY) P.push({ id: 'sambanova', base: 'https://api.sambanova.ai/v1', key: env.SAMBANOVA_API_KEY, model: env.SAMBANOVA_MODEL || 'Meta-Llama-3.3-70B-Instruct', vision: false });
  if (env.NVIDIA_API_KEY) P.push({ id: 'nvidia', base: 'https://integrate.api.nvidia.com/v1', key: env.NVIDIA_API_KEY, model: env.NVIDIA_MODEL || 'meta/llama-3.3-70b-instruct', vision: false });
  if (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_API_TOKEN) P.push({ id: 'cloudflare', base: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`, key: env.CLOUDFLARE_API_TOKEN, model: env.CLOUDFLARE_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast', vision: false });
  if (env.POLLINATIONS_ENABLED !== '0') P.push({ id: 'pollinations', base: 'https://text.pollinations.ai/openai', key: null, model: 'openai', vision: false, noKey: true });
  return P;
}
export const aiStatus = (env = process.env) => {
  const ps = listProviders(env);
  return { configured: ps.filter(p => !p.noKey).map(p => p.id), noKeyFallback: ps.some(p => p.noKey), liveAvailable: ps.length > 0 };
};

async function callProvider(p, messages, { json = false } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(p.base.replace(/\/$/, '') + '/chat/completions', {
      method: 'POST', signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', ...(p.key ? { Authorization: 'Bearer ' + p.key } : {}) },
      body: JSON.stringify({ model: p.model, messages, temperature: 0.4, ...(json ? { response_format: { type: 'json_object' } } : {}) }),
    });
    if (!res.ok) { const err = new Error('provider ' + p.id + ' HTTP ' + res.status); err.status = res.status; throw err; }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (typeof text !== 'string' || !text.trim()) throw new Error('provider ' + p.id + ' trả nội dung rỗng');
    return { text, provider: p.id, model: p.model };
  } finally { clearTimeout(t); }
}

// Tries providers in order; returns {text, provider, model, attempts:[{provider,error}]}
export async function chatWithFallback(messages, { json = false, vision = false, env = process.env, fetchImpl } = {}) {
  const providers = listProviders(env).filter(p => !vision || p.vision);
  const attempts = [];
  for (const p of providers) {
    try {
      if (fetchImpl) { // test seam
        const r = await fetchImpl(p, messages, { json });
        if (r && r.text) return { ...r, provider: p.id, model: p.model, attempts };
        throw new Error('empty');
      }
      const r = await callProvider(p, messages, { json });
      return { ...r, attempts };
    } catch (e) { attempts.push({ provider: p.id, error: String(e.message || e).slice(0, 200) }); }
  }
  const err = new Error('ALL_PROVIDERS_FAILED'); err.attempts = attempts; throw err;
}

export function extractJson(text) {
  const s = text.indexOf('{'), e = text.lastIndexOf('}');
  if (s < 0 || e <= s) return null;
  try { return JSON.parse(text.slice(s, e + 1)); } catch { return null; }
}
