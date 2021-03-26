<template>
  <div id="app">
    <Navbar
      :find-count="findCount"
      :following-count="followingCount"
    />
    <ModeBar
      :mode="mode"
      @afterToggleMode="afterToggleMode"
    />
    <main
      role="main"
      class="pt-3"
    >
      <router-view
        :mode="mode"
        @afterFetchUsers="afterFetchUsers"
        @afterToggleFollow="afterToggleFollow"
      />
    </main>
    <Modal />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from '../src/components/Navbar'
import ModeBar from '../src/components/ModeBar'
import Modal from '../src/components/Modal'

export default {
  name: 'App',
  components: {
    Navbar,
    ModeBar,
    Modal
  },
  data () {
    return {
      mode: 'card',
      findCount: 0,
      followingCount: 0
    }
  },
  created () {
    // 初始化 sessionStorage
    const following = JSON.parse(sessionStorage.getItem('following'))
    if (!following) return sessionStorage.setItem('following', '[]')
    this.followingCount = following.length
  },
  methods: {
    afterToggleMode (selectedMode) {
      this.mode = selectedMode
    },
    afterFetchUsers (count) {
      this.findCount = count
    },
    afterToggleFollow (count) {
      this.followingCount = count
    }
  }
}
</script>
