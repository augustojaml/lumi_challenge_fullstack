export const UserStorage = {
  get: (key: string) => {
    const user = localStorage.getItem(key)
    return user
  },
  set: (key: string, value: string | null) => {
    if (!value) {
      return
    }
    return localStorage.setItem(key, value)
  },
  remove: (key: string) => {
    localStorage.removeItem(key)
  },
}
