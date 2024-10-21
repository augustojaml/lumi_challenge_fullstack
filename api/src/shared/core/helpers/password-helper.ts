import bcryptjs from 'bcryptjs'

export const passwordHelper = {
  hash: async (password: string, salt = 6) => {
    const hashPassword = await bcryptjs.hash(password, salt)
    return hashPassword
  },

  compare: async (password: string, hash: string) => {
    const comparePassword = await bcryptjs.compare(password, hash)
    return comparePassword
  },
}
