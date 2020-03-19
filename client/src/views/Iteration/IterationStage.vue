<template>
  <div class="view-iteration-iteration-stage">
    <Row :space-y="5">
      <Cell>
        <header class="h-modal-header">
          {{ "编辑阶段" }}
        </header>
      </Cell>
      <Cell>
        <Table :datas="currentStages">
          <TableItem title="名称">
            <template slot-scope="{ data }">
              <span
                :style="{
                  padding: '2px 5px',
                  margin: '0 4px',
                  width: '10px',
                  backgroundColor: data.color
                }"
              ></span>
              <span>{{ data.title }}</span>
            </template>
          </TableItem>
          <TableItem title="预计开始">
            <template slot-scope="{ data }">
              <span v-if="isWriteAble && !data.realStartDate">
                <DatePicker
                  v-model="data.prepareStartDate"
                  placeholder="请选择开始日期"
                  :option="{ end: data.prepareEndDate }"
                ></DatePicker>
              </span>
              <span v-else-if="data.prepareStartDate">{{
                data.prepareStartDate | formatDate("yyyy-MM-dd")
              }}</span>
              <span v-else>-</span>
            </template>
          </TableItem>
          <TableItem title="预计结束">
            <template slot-scope="{ data }">
              <span v-if="isWriteAble && !data.realStartDate">
                <DatePicker
                  v-model="data.prepareEndDate"
                  placeholder="请选择结束日期"
                  :option="{ start: data.prepareStartDate }"
                ></DatePicker>
              </span>
              <span v-else-if="data.prepareEndDate">{{
                data.prepareEndDate | formatDate("yyyy-MM-dd")
              }}</span>
              <span v-else>-</span>
            </template>
          </TableItem>
          <TableItem title="实际开始">
            <template slot-scope="{ data }">
              <span
                v-if="data.iterationStage && !data.realStartDate && isWriteAble"
                ><button
                  class="h-btn h-btn-s"
                  @click="startIterationStage(data)"
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
                >{{ data.realStartDate | formatDate("yyyy-MM-dd") }}</span
              >
              <span v-else>-</span>
            </template>
          </TableItem>
          <TableItem title="实际结束">
            <template slot-scope="{ data }">
              <span
                v-if="
                  data.iterationStage &&
                    !data.realEndDate &&
                    data.realStartDate &&
                    isWriteAble
                "
                ><button class="h-btn h-btn-s" @click="endIterationStage(data)">
                  结束
                </button></span
              >
              <span v-else-if="data.iterationStage && data.realEndDate">{{
                data.realEndDate | formatDate("yyyy-MM-dd")
              }}</span>
              <span v-else>-</span>
            </template>
          </TableItem>
        </Table>
      </Cell>
      <Cell>
        <Button color="primary" @click="submit()">保存</Button>
        <Button @click="$emit('close')">关闭</Button>
      </Cell>
    </Row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "IterationStage"
})
export default class IterationStage extends Vue {
  @Prop()
  private iteration!: any;
  @Prop()
  private isWriteAble!: boolean;
  private stages: any[] = [];
  private currentStage: any = null;
  async created() {
    let { stages } = await this.$api.Stage.ListStages();
    this.iteration.stages.forEach((stage: any) => {
      stages.forEach((defaultStage: any) => {
        if (stage.stage === defaultStage.id) {
          defaultStage.iterationStage = stage;
          defaultStage.prepareStartDate = stage.prepareStartDate || null;
          defaultStage.prepareEndDate = stage.prepareEndDate || null;
          defaultStage.realStartDate = stage.realStartDate || null;
          defaultStage.realEndDate = stage.realEndDate || null;
        }
      });
    });
    this.stages = stages;
  }
  get currentStages() {
    return this.stages;
  }
  async startIterationStage(data: any) {
    data.realStartDate = new Date();
  }
  async endIterationStage(data: any) {
    data.realEndDate = new Date();
  }
  async submit() {
    let datas = this.stages
      .filter(it => {
        return (
          it.prepareStartDate ||
          it.realStartDate ||
          it.realEndDate ||
          it.prepareEndDate ||
          it.iterationStage
        );
      })
      .map(it => {
        return Object.assign({}, it.iterationStage, {
          prepareStartDate: it.prepareStartDate || null,
          prepareEndDate: it.prepareEndDate || null,
          realStartDate: it.realStartDate || null,
          realEndDate: it.realEndDate || null,
          color: it.color,
          stage: it.id,
          code: it.code,
          title: it.title,
          description: it.description
        });
      });
    let { stages } = await this.$api.Iteration.UpdateIterationStages({
      iteration: this.iteration.id,
      product: this.iteration.product,
      stages: datas
    });
    this.$emit("success", stages);
    this.$emit("close");
    // stages.forEach((stage: any) => {
    //   this.stages.forEach((defaultStage: any) => {
    //     if (stage.stage === defaultStage.id) {
    //       defaultStage.iterationStage = stage
    //     }
    //   })
    // })
  }
}
</script>
