<template>
  <div class="bg-white rounded p-3 shadow-sm">
    <p class="fw-semibold">{{ task.title }}</p>

    <p class="fs-14">
      {{
        task.description.length > 120
          ? task.description.slice(0, 100) + '...'
          : task.description
      }}
    </p>

    <div class="d-flex justify-content-between align-items-end">
      <div>
        <span
          class="badge rounded-pill fs-14 fw-semibold font-monospace"
          :class="{
            'bg-red-400': task.priority === 'high',
            'bg-yellow-400 text-dark': task.priority === 'medium',
            'bg-green-400': task.priority === 'low',
          }"
        >
          {{ task.priority }}
        </span>

        <!-- task type badge -->
        <span
          class="badge rounded-pill fs-14 fw-semibold font-monospace bg-blue-400"
        >
          {{ task.task_type }}
        </span>
      </div>

      <div>
        <Avatar
          v-if="task.assignee"
          :username="task.assignee.name"
          :size="32"
          :lighten="80"
          color="rgba(255, 255, 255, 0.8)"
          class="float-end"
          :custom-style="{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '16px',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Avatar from 'vue-avatar'
import { Task } from '~/interfaces/index'

export default Vue.extend({
  name: 'TaskCard',
  components: {
    Avatar,
  },
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
})
</script>
