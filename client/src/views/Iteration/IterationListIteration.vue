<template>
  <div class="view-iteration-list-iteration iteration-tree-container">
    <Tree
      ref="tree"
      class="h-tree-theme-row-selected"
      :option="options"
      v-model="currentProduct"
      @select="changeProduct"
    >
    </Tree>
    <div class="iteracion-display">
      <Table :datas="iterations" v-show="showIteration">
        <TableItem title="名称" prop="title"></TableItem>
        <TableItem title="版本" prop="version"> </TableItem>
        <TableItem title="阶段">
          <template slot-scope="{ data }">
            <span>{{ getStageText(data) }}</span>
          </template>
        </TableItem>
        <TableItem title="预计开始">
          <template slot-scope="{ data }">
            <span>{{ data.prepareStartDate | formatDate("yyyy-MM-dd") }}</span>
          </template>
        </TableItem>
        <TableItem title="预计结束">
          <template slot-scope="{ data }">
            <span>{{ data.prepareEndDate | formatDate("yyyy-MM-dd") }}</span>
          </template>
        </TableItem>
        <TableItem title="实际开始">
          <template slot-scope="{ data }">
            <span v-if="!data.realStartDate && isWriteAble(data)"
              ><button class="h-btn h-btn-s" @click="startIteration(data)">
                开始
              </button></span
            >
            <span v-else>{{
              data.realStartDate | formatDate("yyyy-MM-dd")
            }}</span>
          </template>
        </TableItem>
        <TableItem title="实际结束">
          <template slot-scope="{ data }">
            <span
              v-if="
                !data.realEndDate && data.realStartDate && isWriteAble(data)
              "
              ><button class="h-btn h-btn-s" @click="endIteration(data)">
                结束
              </button></span
            >
            <span v-else>{{
              data.realEndDate | formatDate("yyyy-MM-dd")
            }}</span>
          </template>
        </TableItem>
        <TableItem title="操作">
          <template slot-scope="{ data }">
            <button
              v-tooltip
              content="编辑阶段"
              v-if="isEditAble(data)"
              class="h-btn h-btn-s"
              @click="editIterationStage(data)"
            >
              <i class="h-icon-star"></i>
            </button>
            <button
              v-tooltip
              content="编辑"
              v-if="isEditAble(data)"
              class="h-btn h-btn-s"
              @click="editIteration(data)"
            >
              <i class="h-icon-edit"></i>
            </button>
            <button
              v-tooltip
              content="删除"
              v-if="isEditAble(data)"
              class="h-btn h-btn-s"
              @click="deleteIteration(data)"
            >
              <i class="h-icon-trash"></i>
            </button>
          </template>
        </TableItem>
      </Table>
    </div>
    <Modal v-model="openEditIterationModal">
      <IterationEditIteration
        :item="currentIteration"
        :product="currentProduct"
        @close="openEditIterationModal = false"
        @success="refresh"
      ></IterationEditIteration>
    </Modal>
    <Modal v-model="openEditIterationStages">
      <IterationStage
        :isWriteAble="writeAble"
        :iteration="currentIteration"
        @close="openEditIterationStages = false"
        @success="updateIteration"
      ></IterationStage>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ProductUserRole } from "../../utils";
import IterationEditIteration from "./IterationEditIteration.vue";
import IterationStage from "./IterationStage.vue";
@Component({
  name: "IterationListIteration",
  components: {
    IterationEditIteration,
    IterationStage
  }
})
export default class IterationListIteration extends Vue {
  private options = {
    keyName: "id",
    titleName: "title",
    dataMode: "list",
    datas: []
  };
  private openEditIterationStages: boolean = false;
  private openEditIterationModal: boolean = false;
  async created() {
    let { products } = await this.$api.Product.ListTeamsProducts();
    this.options.datas = products;
  }
  private currentIteration = null;
  private currentProduct = null;
  private iterations: [] = [];
  private showIteration: boolean = false;
  private async changeProduct(product: any) {
    if (!product.parent) {
      this.iterations = [];
      this.showIteration = false;
      this.currentProduct = null;
      return;
    }
    let { iterations } = await this.$api.Iteration.ListProductIterations({
      product: product.id
    });
    this.iterations = iterations;
    this.showIteration = true;
    this.currentProduct = product;
  }
  get treeWidth() {
    return 400;
  }
  isEditAble(data: any) {
    let product: any = this.currentProduct;
    if (product) {
      return (
        product.role === ProductUserRole.Master ||
        product.role === ProductUserRole.Owner
      );
    }
    return false;
  }
  get writeAble() {
    return this.isWriteAble(null);
  }
  isWriteAble(data: any) {
    let product: any = this.currentProduct;
    if (product) {
      switch (product.role) {
        case ProductUserRole.Master:
        case ProductUserRole.Owner:
        case ProductUserRole.Writer:
          return true;
      }
    }
    return false;
  }
  editIteration(data: any) {
    this.currentIteration = JSON.parse(JSON.stringify(data));
    this.openEditIterationModal = true;
  }
  editIterationStage(data: any) {
    this.currentIteration = data;
    this.openEditIterationStages = true;
  }
  updateIteration(data: any) {
    (this.currentIteration as any).stages = data;
  }
  async startIteration(item: any) {
    try {
      await this.$Confirm("确定开始？", "开始迭代默认使用当前时间");
    } catch (err) {
      return;
    }
    await this.$api.Iteration.StartIteration({
      product: (this.currentProduct as any).id,
      id: item.id
    });
    this.refresh();
  }
  async endIteration(item: any) {
    try {
      await this.$Confirm("确定结束？", "结束迭代默认使用当前时间");
    } catch (err) {
      return;
    }
    await this.$api.Iteration.StopIteration({
      product: (this.currentProduct as any).id,
      id: item.id
    });
    this.refresh();
  }
  async deleteIteration(item: any) {
    try {
      await this.$Confirm("确定删除？", "删除后不可恢复");
    } catch (err) {
      return;
    }
    await this.$api.Iteration.DeleteIteration({
      product: (this.currentProduct as any).id,
      id: item.id
    });
    this.refresh();
  }
  refresh() {
    if (this.currentProduct) {
      this.changeProduct(this.currentProduct);
    }
  }
  getStageText(data: any) {
    let totalCount = data.stages.length;
    let doneCount = data.stages.filter((it: any) => !!it.realEndDate).length;
    return `${doneCount}/${totalCount}`;
  }
}
</script>
