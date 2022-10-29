<template>
  <div class="min-h-full bg-gray-100 rounded">
    <div class="flex -mx-2 h-full p-4">
      <!-- <div class="w-1/3 px-2 h-full">
        <h4 class="mb-4 py-1 rounded-md font-semibold">Todo</h4>

        <div class="overflow-auto task-list pr-1.5">
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>
      </div>
      <div class="w-1/3 px-2">
        <div class="border p-3 rounded-lg h-full">
          <h4 class="mb-4 bg-green-100 py-2 px-4 rounded-md font-semibold">
            In Progress
          </h4>

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, modi?
        </div>
      </div>
      <div class="w-1/3 px-2">
        <div class="border p-3 rounded-lg h-full">
          <h4 class="mb-4 bg-gray-100 py-2 px-4 rounded-md font-semibold">
            Done
          </h4>

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, modi?
        </div>
      </div> -->

      <div
        v-for="group in groups"
        :key="group.title"
        class="bg-gray-100 rounded-lg px-3 py-3 group-width rounded mr-4"
      >
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
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
const { mapActions } = createNamespacedHelpers('modules/board')

export default Vue.extend({
  name: 'Boards',
  components: {
    TaskCard,
    draggable,
  },
  layout: 'app',
  middleware: ['auth'],
  computed: {
    todos() {
      return this.$store.state.modules.board.groups
    },
    groups() {
      return JSON.parse(JSON.stringify(this.$store.state.modules.board.groups))
    },
  },
  mounted() {
    setTimeout(() => {
      this.setGroups([
        {
          title: 'Todo',
          tasks: [
            {
              id: 1,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
            {
              id: 2,
              title: 'Provide documentation on integrations',
              date: 'Sep 12',
            },
            {
              id: 3,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design',
            },
            {
              id: 4,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
            {
              id: 5,
              title: 'Test checkout flow',
              date: 'Sep 15',
              type: 'QA',
            },
          ],
        },
        {
          title: 'In Progress',
          tasks: [
            {
              id: 6,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design',
            },
            {
              id: 7,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
            {
              id: 8,
              title: 'Provide documentation on integrations',
              date: 'Sep 12',
              type: 'Backend',
            },
          ],
        },
        {
          title: 'In Review',
          tasks: [
            {
              id: 9,
              title: 'Provide documentation on integrations',
              date: 'Sep 12',
            },
            {
              id: 10,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design',
            },
            {
              id: 11,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
            {
              id: 12,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design',
            },
            {
              id: 13,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
          ],
        },
        {
          title: 'Done',
          tasks: [
            {
              id: 14,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
            {
              id: 15,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design',
            },
            {
              id: 16,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request',
            },
          ],
        },
      ])
    }, 1000)
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
