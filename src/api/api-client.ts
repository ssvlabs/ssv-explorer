import Axios from "axios"

// Per-request timeout. Without it, a request that connects to an unresponsive
// upstream but never receives a response hangs forever. In the App Router that
// keeps the background-revalidation promise — and the whole captured request
// context (incl. the cached stale response) — referenced by Next's end-of-request
// `Promise.all(pendingRevalidates)`, so it can never be garbage-collected. Under a
// flaky backend that accumulates into a steady server-side memory leak. A finite
// timeout turns every hang into a fast rejection that is caught and freed.
// Applied at the instance level, axios merges this into every request.
const REQUEST_TIMEOUT_MS = 15_000

export const api = Axios.create({
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    "web-app-source": true,
  },
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)
