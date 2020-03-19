<template>
  <div class="view-team-user">
    <Row :space-y="5">
      <Cell>
        <header class="h-modal-header">
          {{ "产品列表" }}
        </header>
      </Cell>
      <Cell>
        <Table :datas="products">
          <TableItem title="名称">
            <template slot-scope="{ data }">{{ data.title }}</template>
          </TableItem>
          <TableItem title="创建时间">
            <template slot-scope="{ data }">
              <span>{{ data.createdAt | formatDate("yyyy-MM-dd") }}</span>
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
  name: "TeamProduct"
})
export default class TeamProduct extends Vue {
  @Prop()
  private team!: any;
  private products: object[] = [];
  async created() {
    let { products } = await this.$api.Team.ListTeamProducts({
      team: this.team.team.id
    });
    this.products = products;
  }
}
</script>
