<template>
  <div class="user-info">
    <div class="user-info__avatar">
      <el-image>
        <div slot="error" class="img-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
    <el-dropdown @command="handleCommand">
      <div class="user-info__profile">
        <div class="profile-section">
          <span>用户昵称</span>
          <span>管理员</span>
        </div>
        <div class="profile-arrow">
          <svg-icon iconClass="arrow-down" class="el-icon--right"></svg-icon>
        </div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="profile">用户信息</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      switch (command) {
        case "profile":
          this.$open("Profile");
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss">
$imgSize: 38px;
$imgBorderWidth: 2px;
.user-info {
  display: flex;
  align-items: center;

  .user-info__avatar {
    .el-image {
      width: $imgSize;
      height: $imgSize;
      border: $imgBorderWidth solid #fff;
      border-radius: 50%;
      background: rgb(175, 189, 198);
      vertical-align: middle;
      box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.2);
      .img-slot {
        line-height: $imgSize - $imgBorderWidth * 2;
        text-align: center;
      }
    }
  }

  .user-info__profile {
    color: #fff;
    margin-left: 15px;
    display: flex;
    align-items: center;
    width: 120px;
    overflow: hidden;
    cursor: pointer;

    .profile-section {
      width: 80px;
      span {
        display: block;
        text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        white-space: nowrap;

        &:first-child {
          font-weight: 500;
          font-size: 110%;
          padding-bottom: 5px;
          height: 20px;
          line-height: 20px;
        }

        &:last-child {
          height: 16px;
          line-height: 16px;
        }
      }
    }

    .profile-arrow {
      width: 40px;
      text-align: right;

      .el-icon--right {
        font-size: 14px !important;
      }
    }
  }
}
</style>