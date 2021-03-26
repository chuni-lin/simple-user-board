<template>
  <div class="container">
    <!-- <p id="content-status" class="text-center">Now loading...</p> -->
    <div
      id="data-panel"
      class="row"
      @click="handleClick"
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
      route: this.$route.name
    }
  },
  watch: {
    $route: function () {
      // 真實跳頁，重掛 scroll 監聽
      $(window).scrollTop(0)
      this.$router.go()
    }
  },
  created () {
    if (this.route === 'home') { this.fetchUsers() }
    if (this.route === 'following') { this.fetchFollowing() }
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
      this.$emit('afterFetchFollowing')
    },
    afterToggleFollow (count) {
      this.$emit('afterToggleFollow', count)
    },
    findMore () {
      const newUsers = this.initialUsers.splice(0, this.LIMIT)
      this.users.push(...newUsers)
      // 全載入後解除 scroll 監聽器
      if (!this.initialUsers.length) { $(window).unbind('scroll') }
    },
    followingMore () {
      const following = JSON.parse(sessionStorage.getItem('following'))
      const offset = this.users.length
      const usersLength = this.users.push(...following.slice(offset, this.LIMIT))
      // 全載入後解除 scroll 監聽器
      if (following.length === usersLength) { $(window).unbind('scroll') }
    },
    handleScroll () {
      // scroll 接近底部時，載入新 users
      const bottom = $(document).height() - $(window).height()
      if ($(window).scrollTop() >= (bottom - 300)) {
        if (this.route === 'home') {
          this.findMore()
          // 通知父層 users 數量
          this.$emit('afterLoadUsers', this.users.length)
        }
        if (this.route === 'following') {
          this.followingMore()
        }
      }
    },
    handleClick (e) {
      if (e.target.matches('.show-modal')) {
        const targetId = +e.target.dataset.id
        const user = this.users.find(user => user.id === targetId)
        this.$emit('afterClickUser', user)
      }
    }
  }
}
</script>
