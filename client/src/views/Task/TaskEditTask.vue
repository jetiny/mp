<template>
  <div class="view-task-edit-task">
    <header class="h-modal-header">
      {{ isEdit ? '编辑任务' : "创建任务" }}
    </header>
    <Form
      :model="item"
      ref="form"
      :rules="rules"
      v-width="600"
      :showErrorTip="true"
    >
      <FormItem label="任务状态" prop="taskStatus" :required="true">
        <Select
            :style="{ width: '100px', display: 'inline-block' }"
            v-model="item.taskStatus"
            :datas="taskStatusList"
            :disabled="true"
            :deletable="false"
          ></Select>
      </FormItem>
      <FormItem label="任务阶段" prop="iterationStage" :required="true">
        <Select
          :style="{ width: '150px', display: 'inline-block' }"
          v-model="item.iterationStage"
          :keyName="'id'"
          :datas="iterationStages"
          :deletable="false"
        ></Select>
      </FormItem>
      <FormItem label="任务标题" prop="title" :required="true">
        <input type="text" v-model="item.title" />
      </FormItem>
      <FormItem label="任务内容" prop="content" :required="true">
        <textarea type="text" v-model="item.content" />
      </FormItem>
      <FormItem label="任务分派" prop="assignUser" >
        <Select
          :style="{ width: '150px', display: 'inline-block' }"
          v-model="item.assignUser"
          :keyName= "'id'"
          :titleName= "'nick'"
          :datas="productUsers"
          :deletable="false"
          @change="updateStatus"
        ></Select>
      </FormItem>
      <FormItem label="预计时间" prop="prepareStartDate">
        <DatePicker
          :style="{ width: 'auto' }"
          v-model="item.prepareStartDate"
          placeholder="请选择开始日期"
          :option="{ end: item.prepareEndDate }"
          @input="updateDuration"
          @change="updateStatus"
        ></DatePicker>
        -
        <DatePicker
          :style="{ width: 'auto' }"
          v-model="item.prepareEndDate"
          placeholder="请选择结束日期"
          :option="{ start: item.prepareStartDate }"
          @input="updateDuration"
          @change="updateStatus"
        ></DatePicker>
        <span v-if="totalDays"> ({{workDays}}工作日/{{totalDays}}自然日)</span>
      </FormItem>
      <FormItem label="预估工时" prop="estimateHours">
        <input @change="updateStatus" :style="{width: '60px'}" type="number" :min="1" :max="50" v-model.number="item.estimateHours" />
        <label :style="{margin: '5px', display:'inline-block'}">
          <input type="checkbox" v-model="autoCalc"/>
          自动计算
        </label>
      </FormItem>
      <FormItem :no-padding="true">
        <Button v-if="isEdit" @click="$emit('prev')">上一个</Button>
        <Button v-if="isEdit" color="blue" @click="submitWait()">保存</Button>
        <Button v-if="isEdit" @click="$emit('next')">下一个</Button>
        <Button v-if="!isEdit" color="primary" @click="submitClose()">保存&关闭</Button>
        <Button v-if="!isEdit" color="blue" @click="submitContinue()">保存&继续</Button>
        <button class="h-btn" @click="close">关闭</button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TaskStatus } from "../../utils";
@Component({
  name: "TaskEditTask",
})
export default class TaskEditTask extends Vue {
  @Prop({
    type: Object,
    default: () => {
      return {
        title: "",
        content: "",
        prepareStartDate: null,
        prepareEndDate: null,
        taskStatus: TaskStatus.Backlog,
        iterationStage: '',
        estimateHours: '',
      };
    }
  })
  private item!: any;
  private rules: object = {};
  @Prop()
  private prepareData?: any;
  @Prop()
  private taskStatusList?: any[];
  @Prop()
  private iterationStages?: any[];
  @Prop()
  private productUsers?:any[];
  @Prop()
  private isEdit ?:boolean;
  private autoCalc: boolean = true;
  getUserById(id: string) {
    let item = ((this.productUsers) as []).find((it: any) => it.id === id)
    return item ? JSON.parse(JSON.stringify(item)) : null
  }
  getStageById(id: string) {
    let item = ((this.iterationStages) as []).find((it: any) => it.id === id)
    return item ? JSON.parse(JSON.stringify(item)) : null
  }
  async submitWait() {
    return this.submit({next: true})
  }
  async submitContinue() {
    return this.submit({continue: true})
  }
  async submitClose() {
    return this.submit({next: false})
  }
  updateStatus () {
    let {prepareStartDate, prepareEndDate, estimateHours, taskStatus, assignUser} : any = this.item
    if (taskStatus < TaskStatus.Doing) {
      taskStatus = (prepareStartDate && prepareEndDate && estimateHours && assignUser) ? TaskStatus.Todo : TaskStatus.Backlog
      this.item.taskStatus = taskStatus
    }
  }
  dateDiff(firstDate : string | Date, secondDate: string | Date){
    firstDate = new Date(firstDate);
    secondDate = new Date(secondDate);
    let diffDay = (+secondDate - +firstDate) / (1000 * 60 * 60 * 24) + 1;
    return parseInt(diffDay as any)
  }
  countWorkDay(sDay: string | Date, eDay: string | Date){
    sDay = new Date(sDay);
    eDay = new Date(eDay);
    // 总相差天数
    let diffDay = (+eDay - +sDay) / (1000 * 60 * 60 * 24) + 1;
    if(parseInt(diffDay as any) === 0) {
      return 0;
    }
    // 周末天数
    let weekEnds = 0; 
    for(let i = 0; i < diffDay; i++) { 
        if(sDay.getDay() == 0 || sDay.getDay() == 6) {
          weekEnds ++; 
        }
        sDay = new Date(sDay.valueOf() + 1000 * 60 * 60 * 24); 
    } 
    return parseInt((diffDay - weekEnds) as any);
  }
  get workDays () {
    let {prepareStartDate, prepareEndDate, estimateHours} : any = this.item
    if (prepareStartDate && prepareEndDate) {
      let startDate = new Date(prepareStartDate)
      let endDate = new Date(prepareEndDate)
      let days = this.countWorkDay(startDate, endDate)
      return days
    }
    return 0
  }
  get totalDays() {
    let {prepareStartDate, prepareEndDate, estimateHours} : any = this.item
    if (prepareStartDate && prepareEndDate) {
      let startDate = new Date(prepareStartDate)
      let endDate = new Date(prepareEndDate)
      let days = this.dateDiff(startDate, endDate)
      return days
    }
    return 0
  }
  updateDuration() {
    if (!this.autoCalc) {
      return
    }
    let {workDays} = this
    if (workDays) {
      this.item.estimateHours = workDays * 8
    }
  }
  async submit(input: {
    next?: boolean,
    continue?: boolean,
  }) {
    let from: any = this.$refs.form;
    from.resetValid();
    let validResult = from.valid();
    if (validResult.result) {
      let task = null
      if (this.isEdit) {
        let res = await this.$api.Task.UpdateTask(
          Object.assign({}, this.prepareData, this.item)
        );
        task = res.task
      } else {
        let res = await this.$api.Task.CreateTask(
          Object.assign({}, this.prepareData, this.item)
        );
        task = res.task
      }
      Object.assign(task, {
        assignUser: this.getUserById(task.assignUser),
        iterationStage: this.getStageById(task.iterationStage),
        createdBy: {
          id: this.$store.state.user.id,
          nick: this.$store.state.user.nick,
        }
      });
      this.$Message("保存成功");
      if (input.continue) {
        this.$emit("success", task, input);
      } else if (input.next){
        this.$emit("success", task, input);
      } else {
        this.$emit("success", task, input);
        this.$emit("close");
      }
    }
  }
  async close() {
    this.$emit("close");
  }
}
</script>
