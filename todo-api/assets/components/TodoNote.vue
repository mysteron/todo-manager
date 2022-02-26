<template>
  <div>
    <b-card v-if="!editing" class="my-1">
      <b-row>
        <b-col>
          <b-form-checkbox
            v-model="task.completed"
            @change="fireUpdate(task)"
            name="check-button"
            switch
          >
            <h5 class="card-title px-1">{{ task.title }}</h5>
          </b-form-checkbox>
        </b-col>
        <b-col class="text-end"
          ><i
            class="bi bi-pencil-square clickable mx-1"
            @click="editing = !editing"
          ></i>
          <i class="bi bi-trash clickable mx-1" @click="fireDelete(task)"></i>
        </b-col>
      </b-row>

      <b-card-text> {{ task.description }} </b-card-text>
      <b-badge variant="primary">{{ task.category.name }}</b-badge>
    </b-card>
    <b-card v-else>
      <b-form-group
        class="mb-3"
        id="task-title"
        label="Name:"
        label-for="title"
        description="The title of the task."
      >
        <b-form-input
          id="title"
          v-model="task.title"
          type="text"
          :disabled="loading"
          placeholder="Your task..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        class="mb-3"
        id="task-desc"
        label="Description:"
        label-for="desc"
        description="The Description of the task."
      >
        <b-form-input
          id="desc"
          v-model="task.description"
          type="text"
          :disabled="loading"
          placeholder="What would you like to do?"
          required
        ></b-form-input>
      </b-form-group>
      <div class="mb-3">
        <b-form-select
          v-model="task.category.id"
          :options="categoryOptions"
        ></b-form-select>
      </div>
      <b-button
        @click="fireUpdate(task)"
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
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    categoryOptions() {
      return this.categories.map((c) => ({
        value: c.id,
        text: c.name,
      }));
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    fireDelete(task) {
      this.$emit("delete", task);
    },
    fireUpdate(task) {
      this.$emit("update", task);
      this.editing = false;
    },
  },
};
</script>

<style></style>
