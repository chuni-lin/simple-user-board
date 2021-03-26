<template>
  <div id="app">
    <Navbar :find-count="findCount" />
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
      findCount: 0
    }
  },
  methods: {
    afterToggleMode (selectedMode) {
      this.mode = selectedMode
    },
    afterFetchUsers (count) {
      this.findCount = count
    }
  }
}
</script>
