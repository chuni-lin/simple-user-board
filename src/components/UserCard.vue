<template>
  <div class="card-top col-6 col-lg-4 col-xl-3 mb-4">
    <div class="card">
      <div class="banner">
        <img
          class="show-modal"
          :src="getRandomPhoto(index)"
          data-toggle="modal"
          data-target="#modal"
          :data-id="user.id"
        >
      </div>
      <div class="row pt-2">
        <img
          class="avatar show-modal"
          :src="user.avatar"
          alt="photo"
          data-toggle="modal"
          data-target="#modal"
          :data-id="user.id"
        >
        <button
          class="btn btn-follow"
          :class="{ 'btn-primary': user.isFollowed, 'btn-outline-primary': !user.isFollowed }"
          data-follow="Follow"
          data-following="Following"
          :data-id="user.id"
          @click.stop.prevent="toggleFollow"
        />
      </div>
      <div class="card-body pl-3 pr-3">
        <h5
          class="card-title show-modal"
          data-toggle="modal"
          data-target="#modal"
          :data-id="user.id"
        >
          {{ user.name }}
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">
          <span
            class="show-modal"
            data-toggle="modal"
            data-target="#modal"
            :data-id="user.id"
          >
            @{{ user.email | getEmailAccount }}
          </span>
        </h6>
        <p class="card-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing......
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getEmailAccount } from '../utils/mixins'
import getRandomPhoto from '../apis/photos'
export default {
  mixins: [getEmailAccount],
  props: {
    user: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    getRandomPhoto,
    toggleFollow () {
      // toggle follow 狀態
      this.user.isFollowed = !this.user.isFollowed

      // toggle 瀏覽器storage 資料
      let followingUsers = JSON.parse(sessionStorage.getItem('following'))

      const isExist = followingUsers.some(item => item.id === this.user.id)
      isExist ? followingUsers = followingUsers.filter(item => item.id !== this.user.id) : followingUsers.push(this.user)

      sessionStorage.setItem('following', JSON.stringify(followingUsers))

      // 通知父元件
      this.$emit('afterToggleFollow', followingUsers.length)
    }
  }
}
</script>

<style scoped>
.show-modal {
  cursor: pointer;
}
.banner {
  overflow: hidden;
  width: 100%;
  height: 100px;
  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;
}
.avatar {
  max-width: 70px;
  margin-top: calc(-70px/2 - 0.5rem); /* 求出讓 avatar 能剛好卡一半的位置 */
  max-height: 70px; /* mt 是負值會影響到高, 需重設 */
  margin-left: calc(15px + 1rem); /* 與 card-body 對齊 */
  box-shadow: 0 0 0 5px #fff;
  border-radius: 50%;
}
.btn-follow {
  margin: 0 2rem 0 auto;
  min-width: 85px;
  font-size: 0.8em;
}
.btn-outline-primary::before {
  content: attr(data-follow);  /* 按鈕文字 */
}
.btn-primary::before {
  content: attr(data-following);
}
.card-body {
  padding: 0.6rem;
}
.card-title {
  margin-bottom: 0.3rem;
  display: inline-block; /* 讓按鈕判定框符合文字 */
}
.card-title:hover,
.card-subtitle span:hover {
  text-decoration: underline;
}
</style>
