export const getEmailAccount = {
  filters: {
    getEmailAccount (email) {
      return email.split('@')[0]
    }
  }
}

export const toggleFollow = {
  methods: {
    toggleFollow () {
      // toggle follow 狀態
      this.user.isFollowed = !this.user.isFollowed

      // toggle 瀏覽器storage 資料
      let followingUsers = JSON.parse(sessionStorage.getItem('following'))

      const isExist = followingUsers.some(item => item.id === this.user.id)
      isExist ? followingUsers = followingUsers.filter(item => item.id !== this.user.id) : followingUsers.push(this.user)

      sessionStorage.setItem('following', JSON.stringify(followingUsers))

      // 通知父元件
      this.$emit('afterToggleFollow', followingUsers.length)
    }
  }
}
