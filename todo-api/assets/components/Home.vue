<template>
  <div>
    <b-navbar toggleable="lg">
      <div class="container-fluid">
        <b-navbar-brand href="#">TodoApp</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              :class="{ active: currentRoute === ROUTES.TODO_LIST }"
              to="todo-list"
              >To-do list</b-nav-item
            >
            <b-nav-item
              :class="{ active: currentRoute === ROUTES.CATEGORIES }"
              to="categories"
              >Categories</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <div class="content container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ROUTES } from "../consts";
export default {
  name: "Home",
  props: {},
  data: () => ({
    ROUTES,
  }),
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
};
</script>
