<template>
  <div class="container">
    <!-- <p id="content-status" class="text-center">Now loading...</p> -->
    <Spinner v-if="isLoading" />
    <div
      v-else
      id="data-panel"
      class="row"
      @click.stop.prevent="handleClick"
    >
      <p
        v-if="!users.length"
        class="col-12 text-center font-weight-bolder"
      >
        No results found...
      </p>
      <!-- user data 放置場 -->
      <template v-if="mode === 'card'">
        <UserCard
          v-for="(user, index) in users"
          :key="user.id"
          :user="user"
          :index="index"
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
import Spinner from '../components/Spinner.vue'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import $ from 'jquery'

export default {
  components: {
    UserCard,
    UserList,
    Spinner
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
      route: this.$route.name,
      isLoading: true
    }
  },
  watch: {
    $route: function () {
      // 換路由後，初始化
      this.route = this.$route.name
      this.isLoading = true
      $(window).scrollTop(0)
      this.handleRoute()
      $(window).unbind('scroll')
      $(window).on('scroll', this.handleScroll)
    }
  },
  created () {
    this.handleRoute()
    $(window).on('scroll', this.handleScroll)
  },
  methods: {
    handleRoute () {
      if (this.route === 'home') { this.fetchUsers() }
      if (this.route === 'following') { this.fetchFollowing() }
      if (this.route === 'search') { this.fetchSearch() }
    },
    async fetchSearch () {
      try {
        this.isLoading = true
        const query = this.$route.query.key
        const regex = new RegExp(query, 'i')
        // Query API
        const { data } = await usersAPI.getUsers()
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // search 符合之 users，並添加 isFollowed 屬性
        const following = JSON.parse(sessionStorage.getItem('following'))
        const searchUsers = data.results
          .filter(user => {
            user.isFollowed = following.some(followingUser => user.id === followingUser.id)
            const account = user.email.split('@')[0]
            return regex.test(account)
          })
        this.users = searchUsers
        this.$emit('afterSearch', searchUsers.length)
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '伺服器忙碌中，請稍後再試'
        })
      }
    },
    async fetchUsers () {
      try {
        this.isLoading = true
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
        this.isLoading = false
        this.$emit('afterFetchUsers', this.users.length)
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得用戶資料，請稍後再試'
        })
      }
    },
    fetchFollowing () {
      const following = JSON.parse(sessionStorage.getItem('following'))
      this.users = following
      this.isLoading = false
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
