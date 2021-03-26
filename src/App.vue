<template>
  <div id="app">
    <Navbar />
    <ModeBar />
    <main
      role="main"
      class="pt-3"
    >
      <router-view />
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
  }
}
</script>
