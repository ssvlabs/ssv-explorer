---
name: unstable-cache-tags
description: Rule for unstable_cache tags in this repo. Use whenever writing or editing an unstable_cache(...) call, or anything in src/api/*. Tags must be static string literals, never built from params.
---

# unstable_cache tags must be STATIC

In any `unstable_cache(...)` call, the `tags` array must contain only **static string literals**.

**Never** build a tag from a variable, param, or template literal.

```ts
// ❌ NEVER — leaks memory. Each unique value adds a permanent entry to Next's
//    process-global tagsManifest Map, which is never evicted.
tags: [`validator-events-${params.publicKey}`]
tags: [`cluster-events-${params.clusterHash}`]

// ✅ ALWAYS — static literal.
tags: ["validator-events"]
tags: ["cluster-events"]
```

Per-entity isolation is already handled by `keyParts` (the cache key), not by tags.
This caused a production memory leak (PR #413).
