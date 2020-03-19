<template>
  <div class="view-team-list-team">
    <Row :space-y="5">
      <Cell width="24">
        <Button class="h-btn" @click="openCreateModal = true">创建团队</Button>
      </Cell>
      <Cell width="24">
        <Table :datas="teams">
          <TableItem title="团队名称">
            <template slot-scope="{ data }">{{ data.team.title }}</template>
          </TableItem>
          <TableItem title="团队描述">
            <template slot-scope="{ data }">{{
              data.team.description
            }}</template>
          </TableItem>
          <TableItem title="创建时间">
            <template slot-scope="{ data }">
              <span>{{ data.team.createdAt | formatDate("yyyy-MM-dd") }}</span>
            </template>
          </TableItem>
          <TableItem title="操作">
            <template slot-scope="{ data }">
              <button
                v-tooltip
                content="添加产品"
                v-if="isEditAble(data)"
                class="h-btn h-btn-s"
                @click="addTeamProduct(data)"
              >
                <i class="h-icon-plus"></i>
              </button>
              <button
                v-tooltip
                content="产品"
                v-if="isEditAble(data)"
                class="h-btn h-btn-s"
                @click="editTeamProduct(data)"
              >
                <i class="h-icon-star"></i>
              </button>
              <button
                v-tooltip
                content="成员"
                v-if="isEditAble(data)"
                class="h-btn h-btn-s"
                @click="editTeamUser(data)"
              >
                <i class="h-icon-user"></i>
              </button>
              <button
                v-tooltip
                content="编辑"
                v-if="isEditAble(data)"
                class="h-btn h-btn-s"
                @click="editTeam(data)"
              >
                <i class="h-icon-edit"></i>
              </button>
              <button
                v-tooltip
                content="删除"
                v-if="isEditAble(data)"
                class="h-btn h-btn-s"
                @click="deleteTeam(data)"
              >
                <i class="h-icon-trash"></i>
              </button>
            </template>
          </TableItem>
        </Table>
      </Cell>
    </Row>
    <Modal v-model="openCreateModal">
      <TeamAddTeam
        @close="openCreateModal = false"
        @success="refresh"
      ></TeamAddTeam>
    </Modal>
    <Modal v-model="openEditModal">
      <TeamAddTeam
        :isEdit="true"
        :item="currentTeam"
        @close="openEditModal = false"
        @success="refresh"
      ></TeamAddTeam>
    </Modal>
    <Modal v-model="openUserModal">
      <TeamUser
        :team="currentUserTeam"
        @close="openUserModal = false"
      ></TeamUser>
    </Modal>
    <Modal v-model="openProductModal">
      <TeamProduct
        :team="currentUserTeam"
        @close="openProductModal = false"
      ></TeamProduct>
    </Modal>
    <Modal v-model="openAddProductModal">
      <TeamAddProduct
        :team="currentTeam"
        @close="openAddProductModal = false"
      ></TeamAddProduct>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TeamAddTeam from "./TeamAddTeam.vue";
import TeamUser from "./TeamUser.vue";
import TeamProduct from "./TeamProduct.vue";
import TeamAddProduct from "./TeamAddProduct.vue";
import { TeamUserRole } from "../../utils";
@Component({
  name: "TeamListTeam",
  components: {
    TeamAddTeam,
    TeamUser,
    TeamProduct,
    TeamAddProduct
  }
})
export default class TeamListTeam extends Vue {
  private teams = [];
  private openCreateModal: boolean = false;
  private openEditModal: boolean = false;
  private openUserModal: boolean = false;
  private openProductModal: boolean = false;
  private openAddProductModal: boolean = false;
  private currentTeam: any = null;
  private currentUserTeam: any = null;
  mounted() {
    this.refresh();
  }
  async refresh() {
    let { teams } = await this.$api.Team.ListTeam();
    this.teams = teams;
    this.currentTeam = null;
  }
  editTeam(team: any) {
    this.currentTeam = JSON.parse(JSON.stringify(team.team));
    this.openEditModal = true;
  }
  editTeamUser(team: any) {
    this.openUserModal = true;
    this.currentUserTeam = team;
  }
  editTeamProduct(team: any) {
    this.openProductModal = true;
    this.currentUserTeam = team;
  }
  addTeamProduct(team: any) {
    this.openAddProductModal = true;
    this.currentTeam = team.team;
  }
  async deleteTeam(team: any) {
    try {
      await this.$Confirm("确定删除？", "删除后不可恢复");
    } catch (err) {
      return;
    }
    await this.$api.Team.DeleteTeam({
      team: team.team.id
    });
    this.teams = this.teams.filter(it => it !== team);
  }
  isEditAble(data: any) {
    return (
      data.role === TeamUserRole.Master || data.role === TeamUserRole.Owner
    );
  }
}
</script>
