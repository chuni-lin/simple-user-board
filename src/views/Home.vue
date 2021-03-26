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
      LIMIT: 24
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
        this.users = users.slice(0, this.LIMIT)
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
    }
  }
}
</script>
