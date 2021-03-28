# Simple User Board with Vue.js

![](https://i.imgur.com/LBPnAuc.jpg)

Demo - [Github Pages](https://chuni-lin.github.io/user-list-vue/#/home)

A project to practice Vue using "User API" that provided by ALPHA Camp online course.<br>

Try to realize user list functions in Twitter/LinkedIn.<br>
You can follow or unfollow someone in the unlimited scroll page.

## Features

- HomePage
  - Find everyone who you want to be friends with.
  - Use key word to search someone.
  - Click User avatar or name to have detailed information.
  - Check who you're following is available.
- Able to switch from Card to List mode.
- Able to follow or unfollow someone.
- Unlimited scroll page design.

#### Follow / Unfollow

As User API only provide with "GET Users", "GET User", follow / unfollow function is realized with session storage to simulate database.<br>

#### Unlimited scroll page design

Event listener will be removed to release resources once page is fully loaded.

#### Components structure

| TOP     |             |                             |
| ------- | ----------- | --------------------------- |
| App.vue | Navbar      |                             |
|         | ModeBar     |                             |
|         | Home (main) | Spinner、UserCard、UserList |
|         | Modal       |                             |

※ Home、Following、Search share Home.vue page.

## Techniques

|           | item   | item   | item       | item      |
| --------- | ------ | ------ | ---------- | --------- |
| Frontend  | HTML5  | CSS3   | JavaScript |           |
| Concept   | RWD    | MVC    | AJAX       |           |
| Framework | Vue.js | jQuery | axios      | Bootstrap |

<br>

|               | API information                         |
| ------------- | --------------------------------------- |
| Users data    | Alpha Camp API for course               |
| banner images | [Lorem Picusum](https://picsum.photos/) |

## Installation

Clone this repository

```
$ git clone https://github.com/chuni-lin/user-list-vue.git
```

install dependencies

```
$ npm install
```

run

```
$ npm run serve
```
