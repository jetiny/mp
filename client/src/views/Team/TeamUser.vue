<template>
  <div class="view-team-user">
    <Row :space-y="5">
      <Cell>
        <header class="h-modal-header">
          {{ "团队成员" }}
        </header>
      </Cell>
      <Cell>
        <Form mode="threecolumn">
          <FormItem label="姓名">
            <AutoComplete
              :option="accountOptions"
              v-model="currentAccount"
              type="object"
            ></AutoComplete>
          </FormItem>
          <FormItem label="角色">
            <Select
              v-model="currentAccountRole"
              :datas="TeamUserRoleList"
              :deletable="false"
            ></Select>
          </FormItem>
          <FormItem>
            <Button @click="addUser">添加</Button>
          </FormItem>
        </Form>
      </Cell>
      <Cell>
        <Table :datas="users">
          <TableItem title="名称">
            <template slot-scope="{ data }">{{ data.user.nick }}</template>
          </TableItem>
          <TableItem title="角色">
            <template slot-scope="{ data }">
              <Select
                v-if="isEditable(data)"
                @input="updateTeamUserRole($event, data)"
                :value="data.role"
                :datas="TeamUserRoleList"
                :deletable="false"
              ></Select>
              <span v-else>{{ data.role | mapTeamUserRole }} </span>
            </template>
          </TableItem>
          <TableItem title="加入时间">
            <template slot-scope="{ data }">
              <span>{{ data.team.createdAt | formatDate("yyyy-MM-dd") }}</span>
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
  name: "TeamUser"
})
export default class TeamUser extends Vue {
  @Prop()
  private team!: any;
  private users: object[] = [];
  private TeamUserRoleList: any = TeamUserRoleList;
  private currentAccountRole = null;
  private accountOptions: object = {
    keyName: "id",
    titleName: "nick",
    minWord: 2,
    delay: 100,
    loadData: async (filter: any, callback: any) => {
      let { users } = await this.$api.User.SearchUser({
        name: filter
      });
      return callback(users);
    }
  };
  private currentAccount: any = null;
  async created() {
    this.TeamUserRoleList = getTeamUserRoleList(this.team.role);
    let { users } = await this.$api.Team.ListTeamUsers({
      team: this.team.team.id
    });
    this.users = users;
  }
  isEditable(data: any) {
    if (data.user.id === this.team.user) {
      return false;
    }
    if (
      !(
        this.team.role === TeamUserRole.Owner ||
        this.team.role === TeamUserRole.Master
      )
    ) {
      return false;
    }
    if (data.role === TeamUserRole.Owner) {
      if (this.team.role !== TeamUserRole.Owner) {
        return false;
      }
    }
    return true;
  }
  async updateTeamUserRole(role: any, data: any) {
    if (`${role}` !== `${data.role}`) {
      let res = await this.$api.Team.ChangeTeamUserRole({
        team: this.team.team.id,
        user: data.user.id,
        role
      });
    }
  }
  async addUser() {
    let { currentAccount, currentAccountRole } = this;
    if (!(currentAccount || currentAccountRole)) {
      return;
    }
    if (this.users.some((it: any) => it.user.id === currentAccount.id)) {
      this.$Message.warn("不能重复添加");
      return;
    }
    if (currentAccount.id === this.team.user) {
      this.$Message.warn("不能添加自己");
      return;
    }
    let res = await this.$api.Team.AddTeamUser({
      user: this.currentAccount.id,
      team: this.team.team.id,
      role: currentAccountRole
    });
    this.users.push(
      Object.assign(res.user, {
        user: currentAccount
      })
    );
  }
}
</script>
