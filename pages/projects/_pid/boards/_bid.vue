<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>Board: {{ board?.name }}</h3>
      </div>
    </div>

    <div class="row bg-light rounded-lg mt-4 px-2">
      <div
        v-for="group in groups"
        :key="group.title"
        class="bg-light rounded-lg py-3 col-4 mt-0"
      >
        <p class="text-gray-700 fw-bold">
          {{ group.title }}
        </p>
        <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
        <draggable
          v-model="groups"
          :list="group.tasks"
          :animation="200"
          ghost-class="ghost-card"
          group="tasks"
          @change="onGroupsChange($event, group)"
        >
          <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
          <task-card
            v-for="task in group.tasks"
            :key="task.id"
            :task="task"
            class="mt-3 cursor-move"
          ></task-card>
          <!-- </transition-group> -->
        </draggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import { createNamespacedHelpers } from 'vuex'
import TaskCard from '~/components/TaskCard.vue'
import { DragEvent } from '~/interfaces/DragEvent'
import { Board, Task } from '~/interfaces/index'
const { mapActions } = createNamespacedHelpers('modules/board')

export default Vue.extend({
  name: 'Boards',
  components: {
    TaskCard,
    draggable,
  },
  layout: 'app',
  middleware: ['auth'],
  async asyncData({ params, $axios }) {
    const board = await $axios.$get(`/boards/${params.bid}`)
    const { data } = await $axios.$get(`/boards/${params.bid}/tasks`)

    console.log(data)

    const statuses = [
      {
        id: 'todo',
        title: 'To Do',
        tasks: [],
      },
      {
        id: 'in_progress',
        title: 'In Progress',
        tasks: [],
      },
      {
        id: 'done',
        title: 'Done',
        tasks: [],
      },
    ]

    return {
      groups: statuses.map((status) => {
        return {
          ...status,
          tasks: data.filter((task: Task) => task.status === status.id),
        }
      }),
      board,
    }
  },
  data(): {
    board?: Board
    groups: {
      id: string
      title: string
      tasks: Task[]
    }[]
  } {
    return {
      board: undefined,
      groups: [
        {
          id: 'todo',
          title: 'To Do',
          tasks: [],
        },
        {
          id: 'in_progress',
          title: 'In Progress',
          tasks: [],
        },
        {
          id: 'done',
          title: 'Done',
          tasks: [],
        },
      ],
    }
  },
  methods: {
    ...mapActions(['setGroups']),
    onGroupsChange: (e: DragEvent, group: any) => {
      console.log(e, group)

      // if (e.added) {
      //   console.log(e.added.element.title, group)
      // }
    },
  },
})
</script>

<style scoped>
.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>
