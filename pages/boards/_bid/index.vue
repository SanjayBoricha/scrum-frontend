<template>
  <div class="container">
    <div class="row rounded-lg px-2">
      <div
        v-for="group in groups"
        :key="group.title"
        class="rounded-lg py-3 col-4 mt-0 h-100"
      >
        <p class="fw-semibold text-400">
          {{ group.title }}
        </p>
        <div class="task-column-wrapper">
          <div class="task-column">
            <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
            <draggable
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
    async onGroupsChange(e: DragEvent, group: any) {
      console.log(e, group)

      if (e.added) {
        console.log(e.added.element, group.id)

        await this.$axios
          .$patch(`/tasks/${e.added.element.id}/change-status`, {
            status: group.id,
          })
          .then((response) => {
            console.log(response)
          })
      }
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

<style lang="scss">
.task-column-wrapper {
  position: relative;
  &::before {
    content: '';
    display: block;
    height: 1.5em;
    width: calc(100% - 0.5em);
    background: linear-gradient(180deg, var(--bs-gray-800), transparent);
    z-index: 1;
    position: absolute;
  }
  &::after {
    content: '';
    display: block;
    height: 1.5em;
    width: calc(100% - 0.5em);
    background: linear-gradient(0deg, var(--bs-gray-800), transparent);
    z-index: 1;
    position: absolute;
    bottom: 0;
  }
}

.task-column {
  min-height: 600px;
  max-height: calc(100vh - 200px);
  overflow: auto;
  padding-right: 0.4em;
  position: relative;

  &::-webkit-scrollbar {
    width: 0.5rem;

    &-track {
      background: transparent;
    }

    &-thumb {
      background: var(--bs-gray-600);
      border-radius: 1rem;
    }
  }
}
</style>
