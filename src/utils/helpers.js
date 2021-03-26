import Swal from 'sweetalert2'
import axios from 'axios'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

const apiHelper = axios.create({
  baseURL: 'https://lighthouse-user-api.herokuapp.com/api/v1'
})

export { apiHelper }
