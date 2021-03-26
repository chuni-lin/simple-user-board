export const getEmailAccount = {
  filters: {
    getEmailAccount (email) {
      return email.split('@')[0]
    }
  }
}
