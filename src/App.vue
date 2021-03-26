<template>
  <div id="app">
    <Navbar />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from '../src/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
