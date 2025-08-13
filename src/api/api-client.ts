import Axios from "axios"

export const api = Axios.create({
  headers: {
    "web-app-source": true,
  },
})

api.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  (response) => response.data,
  // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
  (error) => Promise.reject(error)
)
