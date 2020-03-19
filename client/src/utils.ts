export const formatDate = (fmt: string, date: Date | string) => {
  if (!fmt) {
    fmt = "yyyy-MM-dd";
  }
  if (date === null) {
    return "-";
  }
  if (!date) {
    date = new Date();
  } else {
    date = new Date(date);
  }
  const o: any = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

export enum IterationStatus {
  Backlog,
  Todo,
  Doing,
  Done
}

export enum TeamUserRole {
  Member,
  Master,
  Owner,
  Leaved
}

const TeamUserRoleMap: any = {
  [TeamUserRole.Member]: "Member",
  [TeamUserRole.Master]: "Master",
  [TeamUserRole.Owner]: "Owner",
  [TeamUserRole.Leaved]: "Leaved"
};

export const TeamUserRoleList: any = Object.keys(TeamUserRoleMap).map(key => {
  return {
    title: TeamUserRoleMap[key],
    key
  };
});

export const getProductUserRoleList = (role: ProductUserRole | string) => {
  role = parseInt(role as string);
  if (role === ProductUserRole.Master) {
    return ProductUserRoleList.filter((it: any) => {
      if (it.key === ProductUserRole.Owner.toString()) {
        return false;
      }
      return true;
    });
  }
  if (role === ProductUserRole.Owner) {
    return ProductUserRoleList;
  }
  return [];
};

export const mapTeamUserRole = (role: TeamUserRole) => {
  return TeamUserRoleMap[role];
};

export enum ProductUserRole {
  Reader,
  Writer,
  Master,
  Owner,
  Leaved
}

const ProductUserRoleMap: any = {
  [ProductUserRole.Reader]: "Reader",
  [ProductUserRole.Writer]: "Writer",
  [ProductUserRole.Master]: "Master",
  [ProductUserRole.Owner]: "Owner",
  [ProductUserRole.Leaved]: "Leaved"
};

export const ProductUserRoleList: any = Object.keys(ProductUserRoleMap).map(
  key => {
    return {
      title: ProductUserRoleMap[key],
      key
    };
  }
);

export const mapProductUserRole = (role: ProductUserRole) => {
  return ProductUserRoleMap[role];
};

export const getTeamUserRoleList = (role: TeamUserRole | string) => {
  role = parseInt(role as string);
  if (role === TeamUserRole.Master) {
    return TeamUserRoleList.filter((it: any) => {
      if (it.key === TeamUserRole.Owner.toString()) {
        return false;
      }
      return true;
    });
  }
  if (role === TeamUserRole.Owner) {
    return TeamUserRoleList;
  }
  return [];
};

export enum TaskStatus {
  None,
  Backlog,
  Todo,
  Doing,
  Done
}

const TaskStatusMap: any = {
  [TaskStatus.None]: "未设置",
  [TaskStatus.Backlog]: "规划中",
  [TaskStatus.Todo]: "待处理",
  [TaskStatus.Doing]: "进行中",
  [TaskStatus.Done]: "已完成"
};

export const TaskStatusList: any = Object.keys(TaskStatusMap).map(key => {
  return {
    title: TaskStatusMap[key],
    key
  };
});

export const mapTaskStatus = (status: TaskStatus) => {
  return TaskStatusMap[status] || '-';
};
