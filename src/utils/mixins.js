import { formatDistanceToNow, parseISO } from 'date-fns'

export const fromNowFilter = {
  filters: {
    fromNow (datetime) {
      return datetime ? formatDistanceToNow(parseISO(datetime)) : '-'
    }
  }
}

export const getEmailAccount = {
  filters: {
    getEmailAccount (email) {
      return email.split('@')[0]
    }
  }
}
