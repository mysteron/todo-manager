<template>
  <div v-if="firstLoading">
    <b-spinner label=""></b-spinner>
  </div>
  <div v-else>
    <div v-if="errorDescripiton">
      <b-alert variant="danger" show>
        <strong>An error occured:</strong> {{ errorDescripiton }}
        <div class="mt-3">
          <b-button variant="primary" @click="loadData()"
            >Try again...</b-button
          >
        </div>
      </b-alert>
    </div>
    <div v-else>
      <category
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @update="updateCategory"
        @delete="deleteCategory"
      ></category>
      <b-card class="mb-3" v-if="isAdding">
        <b-card-body>
          <b-form-group
            class="mb-3"
            id="category-title"
            label="Name:"
            label-for="title"
            description="The title of the category."
          >
            <b-form-input
              id="title"
              v-model="newCategory.name"
              type="text"
              placeholder="Category"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="category-description"
            label="Description:"
            label-for="desc"
            description="The title of the category."
          >
            <b-form-input
              id="desc"
              v-model="newCategory.description"
              type="text"
              placeholder="Description"
              required
            ></b-form-input>
          </b-form-group>
          <b-button @click="saveNew()" variant="primary" size="sm"
            >Save</b-button
          >
          <b-button @click="cancelNew()" variant="outline-secondary" size="sm"
            >Cancel</b-button
          >
        </b-card-body>
      </b-card>
      <b-card v-else>
        <b-button @click="toggleAddingMode(true)" variant="primary" size="sm">
          Add..
        </b-button>
      </b-card>
    </div>
  </div>
</template>
<script>
import CategoryClient from "../mixins/CategoryClient";
import Category from "./Category.vue";

export default {
  name: "CategoryList",
  props: {},
  components: { Category },
  mixins: [CategoryClient],
  computed: {},
  data() {
    return {
      loading: false,
      categories: [],
      isAdding: false,
      firstLoading: false,
      showDone: true,
      errorDescripiton: undefined,
      newCategory: {},
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      this.categoryApiClient
        .list()
        .exec()
        .then((cats) => {
          this.categories = cats;
          this.loading = false;
          this.firstLoading = false;
          this.isEditing = {};
          for (const c of cats) {
            this.isEditing[c.id] = false;
          }
        });
    },

    updateCategory(category) {
      this.loading = true;
      category.owner = `/api/users/1`;
      this.categoryApiClient
        .update(category.id, category)
        .then(() => {
          this.loadData();
        })
        .catch((e) => {
          this.loadData();
        });
    },
    deleteCategory(category) {
      this.categories = this.categories.filter((t) => t.id !== category.id);
      this.loading = true;
      this.categoryApiClient
        .remove(category.id)
        .then(() => {
          this.loadData();
        })
        .catch((e) => {
          this.errorDescription = e.message;
        });
    },
    saveNew() {
      this.isAdding = false;
      this.newCategory.owner = `/api/users/1`;
      this.categories.push(this.newCategory);
      this.categoryApiClient
        .add(this.newCategory)
        .then(() => {
          this.loadData();
        })
        .catch((e) => {
          this.errorDescripiton = e.message;
        })
        .finally(() => {
          this.newCategory = {};
        });
    },
    cancelNew() {
      this.isAdding = false;
      this.newTask = {};
    },
    toggleAddingMode(enabled) {
      this.isAdding = enabled;
    },
  },
  mounted() {
    this.firstLoading = true;
    this.loadData();
  },
};
</script>
