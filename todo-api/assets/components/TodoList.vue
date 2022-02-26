<template>
  <div v-if="firstLoading">
    <b-spinner label=""></b-spinner>
  </div>
  <div v-else>
    <div v-if="errorDescripiton">
      <b-alert variant="danger" show>
        <strong>An error occured:</strong> {{ errorDescripiton }}
        <div class="mt-3">
          <b-button variant="primary">Try again...</b-button>
        </div>
      </b-alert>
    </div>
    <div v-else>
      <div class="mb-3">
        <b-form-checkbox v-model="showDone" name="check-button" switch>
          Show done
        </b-form-checkbox>
      </div>
    </div>
    <b-row> </b-row>
    <todo-note
      v-for="task in getTasksFiltered"
      :key="task.id"
      :task="task"
      :categories="categories"
      @update="updateTask"
      @delete="deleteTask"
    ></todo-note>
    <b-card class="mb-3" v-if="isAdding">
      <b-card-body>
        <b-form-group
          class="mb-3"
          id="task-title"
          label="Name:"
          label-for="title"
          description="The title of the task."
        >
          <b-form-input
            id="title"
            v-model="newTask.title"
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
            v-model="newTask.description"
            type="text"
            :disabled="loading"
            placeholder="What would you like to do?"
            required
          ></b-form-input>
        </b-form-group>
        <div class="mb-3">
          <b-form-select
            v-model="newTask.category.id"
            :options="categoryOptions"
          ></b-form-select>
        </div>
        <b-button @click="saveNew()" variant="primary" size="sm">Save</b-button>
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
</template>
<script>
import TodoClient from "../mixins/TodoClient";
import CategoryClient from "../mixins/CategoryClient";
import TodoNote from "./TodoNote.vue";
export default {
  components: { TodoNote },
  name: "todo-list",
  props: {},
  mixins: [TodoClient, CategoryClient],
  computed: {
    getTasksFiltered() {
      if (this.showDone) {
        return this.tasks;
      } else {
        return this.tasks.filter((t) => t.completed !== true);
      }
    },
    categoryOptions() {
      return this.categories.map((c) => ({
        value: c.id,
        text: c.name,
      }));
    },
  },
  data() {
    return {
      loading: false,
      tasks: [],
      categories: [],
      isAdding: false,
      firstLoading: false,
      showDone: true,
      isEditing: {},
      errorDescripiton: undefined,
      newTask: {
        category: {},
      },
    };
  },
  methods: {
    getCategoryTitle(id) {
      const found = this.categories.find((c) => c.id === id);
      return found ? found.title : "";
    },

    updateTask(todoTask) {
      this.loading = true;
      todoTask.category = this.categories.find(
        (c) => c.id === todoTask.category.id
      );
      const toSave = JSON.parse(JSON.stringify(todoTask));
      toSave.category = `/api/categories/${toSave.category.id}`;
      toSave.owner = `/api/users/1`;
      this.todoApiClient
        .update(toSave.id, toSave)
        .then(() => {
          this.loadData();
        })
        .catch((e) => {
          this.loadData();
        });
    },
    deleteTask(todoTask) {
      this.tasks = this.tasks.filter((t) => t.id !== todoTask.id);
      this.loading = true;
      this.todoApiClient
        .remove(todoTask.id)
        .then(() => {
          this.loadData();
        })
        .catch((e) => {
          this.errorDescription = e.message;
        });
    },
    saveNew() {
      this.isAdding = false;
      this.newTask.category = this.categories.find(
        (c) => c.id === this.newTask.category.id
      );
      const toSave = JSON.parse(JSON.stringify(this.newTask));
      toSave.owner = `/api/users/1`;
      toSave.category = `/api/categories/${toSave.category.id}`;
      this.tasks.push(this.newTask);
      this.todoApiClient
        .add(toSave)
        .then(() => {
          this.loadData();
        })
        .catch((e) => {
          this.errorDescripiton = e.message;
        })
        .finally((e) => {
          this.newTask = {
            category: {},
          };
        });
    },
    cancelNew() {
      this.isAdding = false;
      this.newTask = {};
    },
    toggleAddingMode(enabled) {
      this.isAdding = enabled;
    },
    loadData() {
      this.loading = true;

      this.todoApiClient
        .list()
        .exec()
        .then((todoNotes) => {
          this.tasks = todoNotes;
          return this.categoryApiClient.list().exec();
        })
        .then((cats) => {
          this.categories = cats;
          this.loading = false;
          this.firstLoading = false;
        });
    },
  },
  mounted() {
    this.firstLoading = true;
    this.loadData();
  },
};
</script>
