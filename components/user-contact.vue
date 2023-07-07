<template>
  <div class="user-contact">
    <div class="upper">
      <div class="left">
        <avatar width="48px" :src="user.target.avatar" :ready="user.ready"/>
      </div>
      <div class="right">
        <div class="username">{{ user.target.username }}</div>
        <div class="sub">
          <div>Lv{{ user.target.level }}</div>
          <div v-if="isOasis">火星</div>
          <div v-if="user.target.perm === -1">禁言</div>
          <div v-else-if="user.target.perm === 1">管理员</div>
          <div v-else-if="user.target.perm === 2">admin</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUser} from "~/utils/states";
import Avatar from "~/components/avatar.vue";

const user = useUser();

let isOasis = user.value.target.regType === 'oasis' || (user.value.target.regType === 'common' && !!user.value.target.oasisUsername);
</script>

<style scoped lang="less">
.user-contact {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
}

.upper {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 16px;

  .left {
    .avatar {
      border-radius: 100%;
    }
  }

  .left, .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
  }
}

.divider {
  margin: 4px 0;
  border-bottom: 1px dotted rgba(0, 0, 0, .3);
}

.username {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

.sub {
  font-size: 14px;
  color: rgba(0, 0, 0, .5);
  line-height: 1;
  display: flex;
  flex-direction: row;

  > *::after {
    content: '·';
    margin: 0 4px;
  }

  *:last-child::after {
    content: none;
  }

}
</style>