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
        />
      </template>

      <template v-else>
        <UserList
          v-for="user in users"
          :key="user.id"
          :user="user"
        />
      </template>
    </div>
  </div>
</template>

<script>
import UserCard from '../components/UserCard'
import UserList from '../components/UserList.vue'
const dummyData = {
  results: [
    {
      id: 457,
      name: 'Lâm',
      surname: 'Quân',
      email: 'lâm.quân@example.com',
      gender: 'female',
      age: 21,
      region: 'Vietnam',
      birthday: '05/13/1998',
      avatar: 'https://uinames.com/api/photos/female/19.jpg',
      created_at: '2019-07-15T10:53:13.949Z',
      updated_at: '2019-07-15T10:53:13.949Z'
    },
    {
      id: 458,
      name: 'Biljana',
      surname: 'Turković',
      email: 'biljana-89@example.com',
      gender: 'female',
      age: 30,
      region: 'Bosnia and Herzegovina',
      birthday: '11/26/1989',
      avatar: 'https://uinames.com/api/photos/female/22.jpg',
      created_at: '2019-07-15T10:53:14.289Z',
      updated_at: '2019-07-15T10:53:14.289Z'
    },
    {
      id: 459,
      name: 'Radomír',
      surname: 'Moravčík',
      email: 'radomír89@example.com',
      gender: 'male',
      age: 30,
      region: 'Slovakia',
      birthday: '11/30/1989',
      avatar: 'https://uinames.com/api/photos/male/19.jpg',
      created_at: '2019-07-15T10:53:14.616Z',
      updated_at: '2019-07-15T10:53:14.616Z'
    }
  ]
}

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
      allUsers: [],
      following: []
    }
  },
  watch: {
    $route: function (to) {
      console.log(to)
      if (to.name === 'home') { this.users = this.allUsers }
      if (to.name === 'following') { this.users = this.following }
    }
  },
  created () {
    const route = this.$route.name
    if (route === 'home') { this.fetchUsers() }
    if (route === 'following') { this.fetchFollowing() }
  },
  methods: {
    fetchUsers () {
      this.allUsers = dummyData.results
      this.users = [...this.allUsers]
    },
    fetchFollowing () {
      this.users = [...this.following]
    }
  }
}
</script>
