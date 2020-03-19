<template>
  <div class="view-task-list-task iteration-tree-container">
    <Tree
      ref="tree"
      class="h-tree-theme-row-selected"
      :option="options"
      v-model="currentItem"
      @select="selectItem"
    >
    </Tree>
    <div class="task-views">
      <Row :space-y="5" v-if="currentSelect && currentSelect.isIteration">
        <Cell v-if="iterationStages.length > 1">
          <Button class="h-btn" @click="openAddTaskModal = true"
            >新建任务</Button>
          <span
            :style="{
              margin: '0 5px',
              color: '#4c4a4a',
              padding: '0 5px 0 0'
            }"
            >筛选:</span
          >
          <Select
            :style="{ width: '100px', display: 'inline-block' }"
            v-model="currentStatus"
            :datas="TaskStatusList"
            :deletable="false"
          ></Select>
          <i :style="{ margin: '0 5px', padding: '0 5px 0 0' }"></i>
          <Select
            :style="{ width: '150px', display: 'inline-block' }"
            v-model="currentStage"
            :keyName="'id'"
            :datas="iterationStages"
            :deletable="false"
          ></Select>
          <i :style="{ margin: '0 5px', padding: '0 5px 0 0' }"></i>
          <Checkbox v-model="assignedMe">分配给我的</Checkbox>
          <i :style="{ margin: '0 5px', padding: '0 5px 0 0' }"></i>
          <Checkbox v-model="createdByMe">我创建的</Checkbox>
          <i :style="{ margin: '0 5px', padding: '0 5px 0 0' }"></i>
          <Button class="h-btn" color="primary" @click="(page = 1) && listTasks()">筛选</Button>
          <i :style="{ margin: '0 5px', padding: '0 5px 0 0' }"></i>
          <Button class="h-btn" @click="prevPage" :disabled="page <= 1">&lt;</Button>
          <Button class="h-btn" @click="nextPage" :disabled="!(count  && (count == limit))" >&gt;</Button>
        </Cell>
        <Cell>
          <Table :datas="tasks" ref="table">
            <TableItem title="名称">
              <template slot-scope="{ data }">
                <span>{{ data.title }}</span>
              </template>
            </TableItem>
            <TableItem title="状态" :width="60">
              <template slot-scope="{ data }">
                <span>{{data.taskStatus | mapTaskStatus}}</span>
              </template>
            </TableItem>
            <TableItem title="阶段">
              <template slot-scope="{ data }">
                <span v-if="data.iterationStage">{{ data.iterationStage.title }}</span>
                <span v-else>-</span>
              </template>
            </TableItem>
            <TableItem title="创建人" :width="70">
              <template slot-scope="{ data }">
                <span v-if="data.createdBy">{{ data.createdBy.nick }}</span>
                <span v-else>-</span>
              </template>
            </TableItem>
            <TableItem title="执行人" :width="70">
              <template slot-scope="{ data }">
                <span v-if="data.assignUser">{{ data.assignUser.nick }}</span>
                <span v-else>-</span>
              </template>
            </TableItem>
            <TableItem title="预计开始">
              <template slot-scope="{ data }">
                <span v-if="data.prepareStartDate">{{
                  data.prepareStartDate | formatDate("yyyy-MM-dd")
                }}</span>
                <span v-else>-</span>
              </template>
            </TableItem>
            <TableItem title="预计结束">
              <template slot-scope="{ data }">
                <span v-if="data.prepareEndDate">{{
                  data.prepareEndDate | formatDate("yyyy-MM-dd")
                }}</span>
                <span v-else>-</span>
              </template>
            </TableItem>
            <TableItem title="预计工时(h)">
              <template slot-scope="{ data }">
                <span>{{data.estimateHours}}</span>
              </template>
            </TableItem>
            <TableItem title="实际开始">
              <template slot-scope="{ data }">
                <span
                  v-if="
                    data.taskStatus === 2 && isWriteAble
                  "
                  ><button
                    class="h-btn h-btn-s"
                    @click="startTask(data)"
                  >
                    开始
                  </button></span
                >
                <span
                  v-else-if="
                    data.iterationStage &&
                      data.iterationStage &&
                      data.realStartDate
                  "
                  >{{ data.realStartDate | formatDate("yyyy-MM-dd hh:mm") }}</span
                >
                <span v-else>-</span>
              </template>
            </TableItem>
            <TableItem title="实际结束">
              <template slot-scope="{ data }">
                <span
                  v-if="
                    data.taskStatus === 3 &&
                    isWriteAble
                  "
                  ><button
                    class="h-btn h-btn-s"
                    @click="endTask(data)"
                  >
                    结束
                  </button></span
                >
                <span v-else-if="data.iterationStage && data.realEndDate">{{
                  data.realEndDate | formatDate("yyyy-MM-dd hh:mm")
                }}</span>
                <span v-else>-</span>
              </template>
            </TableItem>
            <TableItem title="操作" :width="100">
              <template slot-scope="{ data }">
                <button
                  v-tooltip
                  content="编辑"
                  :disabled="!isEditAble(data)"
                  class="h-btn h-btn-s"
                  @click="editTask(data)"
                >
                  <i class="h-icon-edit"></i>
                </button>
                <button
                  v-tooltip
                  content="删除"
                  v-if="isWriteAble"
                  class="h-btn h-btn-s"
                  @click="deleteTask(data)"
                >
                  <i class="h-icon-trash"></i>
                </button>
              </template>
            </TableItem>
          </Table>
        </Cell>
      </Row>
    </div>
    <Modal v-model="openAddTaskModal">
      <TaskEditTask
        :prepareData="prepareData"
        :taskStatusList="TaskStatusList.slice(1)"
        :iterationStages="iterationStages.slice(1)"
        :productUsers="productUsers"
        @close="openAddTaskModal = false"
        @success="successAddTask"
      ></TaskEditTask>
    </Modal>
    <Modal v-model="openEditTaskModal">
      <TaskEditTask
        :prepareData="prepareData"
        :taskStatusList="TaskStatusList.slice(1)"
        :iterationStages="iterationStages.slice(1)"
        :productUsers="productUsers"
        :isEdit = "true"
        :item="currentEditTask"
        @close="openEditTaskModal = false"
        @success="successEditTask"
        @prev="editPrevTask"
        @next="editNextTask"
      ></TaskEditTask>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TaskEditTask from "./TaskEditTask.vue";
import {TaskStatus, ProductUserRole} from '../../utils'

let usersMaps : any = {}

Component.registerHooks([
  "beforeRouteLeave",
])
@Component({
  name: "TaskListTask",
  components: {
    TaskEditTask
  },
})
export default class TaskListTask extends Vue {
  private options = {
    keyName: "id",
    titleName: "title",
    dataMode: "list",
    datas: []
  };
  private tasks: any[] = [];
  private openAddTaskModal: boolean = false;
  private openEditTaskModal: boolean = false;
  private currentItem: any = null;
  private currentTask: any = null;
  private currentEditTask: any = null;
  private currentSelect: any = null;
  private TaskStatusList: any = [
    { key: 0, title: "全部状态" },
    { key: 1, title: "规划中" },
    { key: 2, title: "待处理" },
    { key: 3, title: "进行中" },
    { key: 4, title: "已完成" }
  ];
  private currentStatus: any = 0;
  private currentStage: any = 0;
  private iterationStages: any[] = [];
  private currentTasks: any[] = [];
  private currentProduct: any = null;
  private assignedMe: boolean = false;
  private createdByMe: boolean = false;
  private productUsers: any[] = [];
  private page: number = 1;
  private limit: number = 5;
  get count(): number  {
    return this.tasks.length
  }
  private beforeRouteLeave(to: any, from: any, next: any) {
    usersMaps = {}
    next()
  }
  isEditAble(data: any) {
    return this.isWriteAble && data.taskStatus < TaskStatus.Doing
  }
  editTask(item: any) {
    this.currentTask = item;
    let task = JSON.parse(JSON.stringify(item));
    if (task.assignUser) {
      task.assignUser = task.assignUser.id
    }
    if (task.iterationStage) {
      task.iterationStage = task.iterationStage.id
    }
    this.currentEditTask = task
    this.openEditTaskModal = true;
  }
  editPrevTask () {
    let task = this.currentTask
    if (!task) {
      return
    }
    let index = this.tasks.findIndex((it: any) => it.id === task.id)
    if (index > 0) {
      this.editTask(this.tasks[index -1])
    }
  }
  editNextTask() {
    let task = this.currentTask
    if (!task) {
      return
    }
    let index = this.tasks.findIndex((it: any) => it.id === task.id)
    if (index < this.tasks.length - 1) {
      this.editTask(this.tasks[index+1])
    }
  }
  async deleteTask(item: any) {
    try {
      await this.$Confirm("确定删除？", "删除后不可恢复");
    } catch (err) {
      return;
    }
    await this.$api.Task.DeleteTask({
      id: item.id
    });
    this.tasks = this.tasks.filter(it => it !== item);
  }
  get prepareData() {
    let data: any = {};
    let { currentSelect } = this;
    if (currentSelect) {
      data.iteration = currentSelect.id;
      data.product = currentSelect.parent;
      this.options.datas.some((it: any) => {
        if ((it.id = data.product)) {
          data.team = it.parent;
        }
      });
    }
    switch (this.currentStatus) {
      case TaskStatus.Backlog:
        data.taskStatus = this.currentStatus;
        break
      default:
        data.taskStatus = TaskStatus.Todo;
        break
    }
    data.iterationStage = this.currentStage;
    return data;
  }
  async created() {
    let { products } = await this.$api.Product.ListTeamsProducts();
    this.options.datas = products;
  }
  get isWriteAble () {
    if (this.currentProduct) {
      let {role} = this.currentProduct
      return role === ProductUserRole.Master ||
        role === ProductUserRole.Owner
    }
    return false
  }
  private async selectItem(current: any) {
    if (this.currentItem === current.id) {
      return;
    }
    if (current.isIteration) {
      this.currentSelect = current;
      this.iterationStages = [
        {
          id: 0,
          color: "",
          title: "全部阶段"
        }
      ].concat(
        current.stages.map((it: any) => {
          return {
            id: it.id,
            color: it.color,
            title: it.title
          };
        })
      );
      this.currentStatus = 0;
      this.currentStage = 0;
      this.tasks = [];
      this.currentProduct = this.getParent(current.parent)
      if (!usersMaps[current.parent]) {
        let {users} = await this.$api.Product.GetProductUserList({
          product: current.parent
        });
        usersMaps[current.parent] = users
      }
      this.productUsers = usersMaps[current.parent]
      return;
    }
    if (!current.parent) {
      return;
    }
    this.currentProduct = null
    this.currentSelect = null;
    let ref: any = this.getParent(current.id);
    if (!ref) {
      return;
    }
    if (ref.synced) {
      return;
    }
    let { iterations } = await this.$api.Iteration.ListProductIterations({
      product: ref.id
    });
    iterations.forEach((iter: any) => {
      let iteration = {
        parent: ref.id,
        id: iter.id,
        title: iter.title,
        stages: iter.stages,
        isIteration: true
      };
      // this.options.datas.push(iteration)
      (this.$refs.tree as any).appendTreeItem(ref.id, iteration);
    });
    ref.synced = true;
  }
  getParent(id: string) {
    let ref: any = (this.$refs.tree as any).treeObj[id].value
    return ref
  }
  async listTasks() {
    let { tasks } = await this.$api.Task.ListTasks({
      iterationStage: this.currentStage || null,
      taskStatus: this.currentStatus,
      assignedMe: this.assignedMe,
      createdByMe: this.createdByMe,
      iteration: this.currentSelect.id,
      page: this.page,
      limit: this.limit,
    });
    this.tasks = tasks;
  }
  successAddTask(task: any) {
    this.tasks.unshift(task)
  }
  successEditTask(task: any, input: {
    continue?: boolean
    next?: boolean
  }) {
    if (task && this.currentTask) {
      if (task.id === this.currentTask.id) {
        Object.assign(this.currentTask, task)
      }
    }
  }
  async startTask(item: any) {
    let {task} = await this.$api.Task.StartTask({
      id: item.id
    })
    Object.assign(item, {
      taskStatus: task.taskStatus,
      realStartDate: task.realStartDate
    })
  }
  async endTask(item: any) {
    let {task} = await this.$api.Task.StopTask({
      id: item.id
    })
    Object.assign(item, {
      taskStatus: task.taskStatus,
      realEndDate: task.realEndDate
    })
  }
  prevPage() {
    this.page--
    this.listTasks()
  }
  nextPage() {
    this.page++
    this.listTasks()
  }
}
</script>
