<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
      <div class="toolbar mr-2">
        <a
          href="#"
          title="Go to Github"
        >
          <svg
            class="svg-btn"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path
              d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"
            />
          </svg>
        </a>
      </div>

      <router-link
        class="navbar-brand"
        to="/home"
      >
        <img
          class="rounded-circle"
          src="https://assets-lighthouse.alphacamp.co/uploads/user/photo/4412/medium_5915EB44-7E19-430E-B5BA-3915AD9CA05B-58163-00001B687D072988.JPG"
          width="30"
          height="30"
          alt="account icon"
        >
      </router-link>

      <!-- search form -->
      <form
        id="search-form"
        class="form-inline position-relative"
        @submit.stop.prevent="handleSearch"
      >
        <input
          id="search-input"
          v-model="search"
          name="key"
          class="form-control mr-sm-2"
          type="text"
          placeholder="Search user"
          required
        >
        <span class="search-icon">
          <button
            type="submit"
            class="search-icon-btn"
          />
        </span>
      </form>

      <!-- mobile mode btn -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <!-- link list -->
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav nav">
          <li class="nav-item">
            <router-link
              id="nav-following"
              to="following"
              class="nav-link"
            >
              <span class="nav-label">Following</span>
              <span
                class="nav-value"
                :data-count="followingCount"
              />
            </router-link>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >
              <span class="nav-label sample">Followers</span>
              <span
                class="nav-value"
                data-count="0"
              />
            </a>
          </li>
          <li class="nav-item">
            <router-link
              id="nav-find"
              to="home"
              class="nav-link active"
            >
              <span class="nav-label">results</span>
              <span
                class="nav-value"
                :data-count="findCount"
              />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    findCount: {
      type: Number,
      required: true
    },
    followingCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      search: this.$route.query.key || ''
    }
  },
  watch: {
    $route: function () {
      if (this.$route.name !== 'search') {
        this.search = ''
      }
    }
  },
  methods: {
    handleSearch () {
      const query = this.search.trim()
      if (!query) return false
      this.$router
        .push(`/search?key=${query}`)
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.svg-btn {
  width: 2rem;
}
.sample {  /* 未實裝功能標示用 */
  text-decoration: line-through;
}
.sample.nav-link:hover,
.sample.nav-link:focus {  /* 覆蓋 Bootstrap 設定 */
  text-decoration: line-through;
}
.nav-link {
  border-bottom: 2px solid #fff;
  transition-property: border-bottom;
  transition: 0.15s linear;
  padding: 0;
  text-align: center;
  min-width: 4rem;
}
.nav-link:hover {
  border-bottom: 2px solid #000;
}
a.nav-link span {
  /* 禁止 click, 讓 .nav-link 永遠只會點到 <a>, 方便 JS 下判定*/
  pointer-events: none;
}
.nav-label {
  display: block;
  font-size: 0.9rem;
}
.nav-value {
  display: block;
  margin-top: -0.3rem;
  font-size: 1.1rem;
}
.nav-value::before {
  content: attr(data-count);
}
.navbar-nav .active {
  border-bottom: 2px solid #000;
}
.search-icon {
  position: absolute;
  right: 1rem;
}
.search-icon-btn {
  background: transparent;
  border: 0;
}
.search-icon-btn::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f002";
  color: #adb5bd;
}
@media (max-width: 991.98px) {
  .navbar-brand {
    margin: 0 auto 0 0;
  }

  .navbar-collapse {
    text-align: center;
  }
  .nav-item {
    border-top: 1px solid rgb(212, 212, 212);
  }
  .nav-item:first-child {
    border-top: 0;
  }
  .navbar-nav .active {
    border-bottom: 0;
    border-left: 2px solid #000;
    border-right: 2px solid #000;
    margin: 0 auto;
  }
  .nav-link {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .nav-link:hover { /* mobile 時, 關閉 hover 效果 */
    border-bottom: 0;
  }
  .nav-item:active { /* mobile 時, 用 active 取代 hover */
    background-color: #ccc;
  }
  .nav-label {
    display: inline;
    font-size: 1rem;
    margin-right: .3rem;
  }
  .nav-value {
    display: inline;
    font-size: 1rem;
  }
}
</style>
