<template>
  <div class="container">
    <!-- <p id="content-status" class="text-center">Now loading...</p> -->
    <div
      id="data-panel"
      class="row"
    >
      <!-- user data 放置場 -->
      <template v-if="mode === 'card'">
        <UserCard
          v-for="user in users"
          :key="user.id"
          :user="user"
          @afterToggleFollow="afterToggleFollow"
        />
      </template>

      <template v-else>
        <UserList
          v-for="user in users"
          :key="user.id"
          :user="user"
          @afterToggleFollow="afterToggleFollow"
        />
      </template>
    </div>
  </div>
</template>

<script>
import UserCard from '../components/UserCard'
import UserList from '../components/UserList.vue'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import $ from 'jquery'

export default {
  components: {
    UserCard,
    UserList
  },
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      users: [],
      initialUsers: [],
      LIMIT: 24,
      isLoading: false
    }
  },
  watch: {
    $route: function (to) {
      if (to.name === 'find') { this.fetchUsers() }
      if (to.name === 'following') { this.fetchFollowing() }
    }
  },
  created () {
    const route = this.$route.name
    if (route === 'home') { this.fetchUsers() }
    if (route === 'following') { this.fetchFollowing() }
    // 監聽 scroll 無限下拉分頁
    $(window).on('scroll', this.handleScroll)
  },
  methods: {
    async fetchUsers () {
      try {
        const { data } = await usersAPI.getUsers()
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        const users = data.results
        // 判斷 isFollowed
        const following = JSON.parse(sessionStorage.getItem('following'))
        for (const user of users) {
          user.isFollowed = following.some(followingUser => user.id === followingUser.id)
        }
        this.initialUsers = users
        this.users = this.initialUsers.splice(0, this.LIMIT)
        this.$emit('afterFetchUsers', this.users.length)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得用戶資料，請稍後再試'
        })
      }
    },
    fetchFollowing () {
      const following = JSON.parse(sessionStorage.getItem('following'))
      this.users = following
    },
    afterToggleFollow (count) {
      this.$emit('afterToggleFollow', count)
    },
    handleScroll () {
      // scroll 接近底部時，載入新 users
      const bottom = $(document).height() - $(window).height()
      if ($(window).scrollTop() >= (bottom - 300)) {
        const newUsers = this.initialUsers.splice(0, this.LIMIT)
        this.users.push(...newUsers)
        // 通知父層 users 數量
        this.$emit('afterLoadUsers', this.users.length)
      }
      // 全載入後解除 scroll 監聽器
      if (!this.initialUsers.length) {
        $(window).unbind('scroll')
      }
    }
  }
}
</script>
