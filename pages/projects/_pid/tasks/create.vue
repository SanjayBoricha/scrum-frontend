<template>
  <div class="container">
    <h3 class="fw-semibold">Create task</h3>

    <form class="row">
      <!-- title input -->
      <div class="form-group mb-3">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="task.title"
          v-validate="{ required: true }"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $validator.errors.has('title') }"
          name="title"
          placeholder="Title"
        />
        <span class="invalid-feedback">
          {{ $validator.errors.first('title') }}
        </span>
      </div>

      <!-- description input -->
      <div class="form-group mb-3">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="task.description"
          v-validate="{ required: true }"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $validator.errors.has('description') }"
          name="description"
          placeholder="Description"
        ></textarea>
        <span class="invalid-feedback">
          {{ $validator.errors.first('description') }}
        </span>
      </div>

      <!-- task type input -->
      <div class="form-group col-md-4 mb-3">
        <label for="task_type">Task type</label>
        <vue-multiselect
          v-model="task.task_type"
          :options="[
            { id: 1, name: 'Bug' },
            { id: 2, name: 'Feature' },
          ]"
          :searchable="false"
          :close-on-select="true"
          :allow-empty="false"
          label="name"
          placeholder="Select one"
          track-by="id"
          @input="updateSelected"
        ></vue-multiselect>
      </div>

      <!-- priority input -->
      <div class="form-group col-md-4 mb-3">
        <label for="priority">Priority</label>
        <vue-multiselect
          v-model="task.priority"
          :options="[
            { id: 1, name: 'Low' },
            { id: 2, name: 'Medium' },
            { id: 3, name: 'High' },
          ]"
          :searchable="false"
          :close-on-select="true"
          :allow-empty="false"
          label="name"
          placeholder="Select one"
          track-by="id"
          @input="updateSelected"
        ></vue-multiselect>
      </div>

      <!-- due date input -->
      <div class="form-group col-md-4 mb-3">
        <label for="due_date">Due date</label>
        <input
          id="due_date"
          v-model="task.due_date"
          v-validate="{ required: true }"
          type="date"
          class="form-control"
          :class="{ 'is-invalid': $validator.errors.has('due_date') }"
          name="due_date"
        />
        <span class="invalid-feedback">
          {{ $validator.errors.first('due_date') }}
        </span>
      </div>

      <!-- assignee input -->
      <div class="form-group mb-3">
        <label for="assignee">Assignee</label>
        <select
          id="assignee"
          v-model="task.assignee"
          v-validate="{ required: true }"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': $validator.errors.has('assignee') }"
          name="assignee"
        >
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select>
        <span class="invalid-feedback">
          {{ $validator.errors.first('assignee') }}
        </span>
      </div>

      <!-- submit button -->
      <div class="form-group mb-3">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="$validator.errors.any()"
          @click.prevent="createTask"
        >
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueMultiselect from 'vue-multiselect'

export default Vue.extend({
  name: 'TasksCreate',
  components: {
    VueMultiselect,
  },
  layout: 'app',
  data() {
    return {
      task: {
        title: '',
        description: '',
        task_type: 1,
        priority: 1,
        assignee: null,
        due_date: '',
      },
    }
  },
  methods: {
    createTask() {
      this.$axios
        .$post(`/api/projects/${this.$route.params.id}/tasks`, this.task)
        .then(() => {
          this.$router.push(`/projects/${this.$route.params.id}/tasks`)
        })
    },
    updateSelected(value: { id: number; name: string }) {
      console.log(value)
      // this.task.task_type = value.id
    },
  },
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
