<template>
  <div id="app">
    <Navbar />
    <ModeBar
      :mode="mode"
      @afterToggleMode="afterToggleMode"
    />
    <main
      role="main"
      class="pt-3"
    >
      <router-view :mode="mode" />
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
      mode: 'card'
    }
  },
  methods: {
    afterToggleMode (selectedMode) {
      this.mode = selectedMode
    }
  }
}
</script>
