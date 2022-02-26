<template>
  <div>
    <b-card v-if="!editing" class="my-1">
      <b-row>
        <b-col>
          <h5 class="card-title">{{ category.name }}</h5>
        </b-col>
        <b-col class="text-end"
          ><i
            class="bi bi-pencil-square clickable mx-1"
            @click="editing = !editing"
          ></i>
          <i
            class="bi bi-trash clickable mx-1"
            @click="fireDelete(category)"
          ></i>
        </b-col>
      </b-row>

      <b-card-text> {{ category.description }} </b-card-text>
    </b-card>
    <b-card v-else>
      <b-form-group
        class="mb-3"
        id="category-title"
        label="Name:"
        label-for="title"
        description="The title of the category."
      >
        <b-form-input
          id="title"
          v-model="category.name"
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
          v-model="category.description"
          type="text"
          placeholder="Description"
          required
        ></b-form-input>
      </b-form-group>

      <b-button
        @click="fireUpdate(category)"
        :disabled="loading"
        variant="primary"
        size="sm"
      >
        Save
      </b-button>
      <b-button
        @click="editing = !editing"
        :disabled="loading"
        size="sm"
        variant="outline-secondary"
        class="mx-2"
      >
        Cancel
      </b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    fireDelete(category) {
      this.$emit("delete", category);
    },
    fireUpdate(category) {
      this.$emit("update", category);
      this.editing = false;
    },
  },
};
</script>

<style></style>
