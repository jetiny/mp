<template>
  <div class="view-team-user">
    <Row :space-y="5">
      <Cell>
        <header class="h-modal-header">
          {{ "迭代列表" }}
        </header>
      </Cell>
      <Cell>
        <Table :datas="iterations">
          <TableItem title="名称" prop="title"></TableItem>
          <TableItem title="版本" prop="version"> </TableItem>
          <TableItem title="预计开始">
            <template slot-scope="{ data }">
              <span>{{
                data.prepareStartDate | formatDate("yyyy-MM-dd")
              }}</span>
            </template>
          </TableItem>
          <TableItem title="预计结束">
            <template slot-scope="{ data }">
              <span>{{ data.prepareEndDate | formatDate("yyyy-MM-dd") }}</span>
            </template>
          </TableItem>
          <TableItem title="实际开始">
            <template slot-scope="{ data }">
              <span>{{ data.realStartDate | formatDate("yyyy-MM-dd") }}</span>
            </template>
          </TableItem>
          <TableItem title="实际结束">
            <template slot-scope="{ data }">
              <span>{{ data.realEndDate | formatDate("yyyy-MM-dd") }}</span>
            </template>
          </TableItem>
        </Table>
      </Cell>
      <Cell>
        <Button @click="$emit('close')">关闭</Button>
      </Cell>
    </Row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import {
  getTeamUserRoleList,
  TeamUserRoleList,
  TeamUserRole
} from "../../utils";
@Component({
  name: "ProductionIteration"
})
export default class ProductionIteration extends Vue {
  @Prop()
  private product!: any;
  private iterations: object[] = [];
  async created() {
    let { iterations } = await this.$api.Iteration.ListProductIterations({
      product: this.product.product.id
    });
    this.iterations = iterations;
  }
}
</script>
