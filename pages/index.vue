<template>
  <div>
    <div class="hero">
    </div>
    <div class="container">
      <div class="col gap-16 nowrap col-left">
        <client-only>
          <card v-if="!user.ready">
            <template #title>
              <div class="hero-text">
                开始你的
                <br/>
                Tisea 之旅吧~
              </div>
            </template>
            <template #content>
              <p>Tisea 是我们为 Seati 玩家精心打造的分享、交流与记录平台。</p>
              <p>你可以在此无限制地保留自己在每个周目游戏中的经历与记忆。</p>
            </template>
            <template #actions>
              <btn class="primary" @click="useRouter().push('/auth#register')">现在就注册</btn>
              <btn class="solid" @click="useRouter().push('/auth')">立即登录</btn>
            </template>
          </card>
        </client-only>
        <card>
          <template #title>
            服务器状态

          </template>
          <template #content>
            <div class="subtle text-align-center">服务器状态获取失败</div>
          </template>
        </card>
        <card>
          <template #title>
            当前在线
          </template>
          <template #content>
            <div class="subtle text-align-center">当前没有人在线呢~</div>
          </template>
        </card>
      </div>
      <div class="col gap-16 nowrap col-center">
        <card important-text="劲爆!!" border-color="#00bcd4">
          <template #title>Title</template>
          <template #content>
            <loading-text center/>
          </template>

        </card>
        <card>
          <template #title>Title</template>
          <template #content>
            123
          </template>
        </card>
        <card>
          <template #title>Title</template>
          <template #content>
            123
          </template>

        </card>
        <card>
          <template #title>Title</template>
          <template #content>
            123
          </template>

        </card>

      </div>
      <div class="col gap-16 nowrap col-right">
        <client-only>
          <card raw v-if="user.ready">
            <template #content>
              <div class="content-primary">
                <user-contact/>
                <div class="col nowrap gap-8">
                  <btn size="medium" class="primary" @click="dialogs.newDynamic = true">发布动态</btn>
                  <btn size="medium" class="white">个人主页</btn>
                </div>
              </div>
            </template>
          </card>
          <card raw v-if="user.ready">
            <template #content>
              <div class="col gap-16 nowrap">
                <function-card icon="mdi-book-account-outline" color="blue">
                  <template #title>
                    教程专区
                  </template>
                  <template #subtitle>
                    我们已将 Seati Wiki 上的教程搬迁到这里的新家了~
                  </template>
                </function-card>
                <function-card icon="mdi-message-text-outline" color="amber">
                  <template #title>
                    写点日志
                  </template>
                  <template #subtitle>
                    有些话一个动态说不清楚，可以在想写多长写多长的日志里记录哦~
                  </template>
                </function-card>
              </div>
            </template>
          </card>
          <card>
            <template #title>
              #ST8
            </template>
            <template #content>

            </template>
          </card>
          <card>
            <template #title>
              需要帮助？
            </template>
            <template #content>

            </template>
          </card>
        </client-only>
      </div>
      <dlg disable-click-out-to-close full-width v-model="dialogs.newDynamic">
        <template #title>
          发布动态
        </template>
        <template #content>
          <div class="col nowrap gap-16">
            <client-only>
              <textfield keyup-event maxlength="50" type="text" placeholder="标题（可选）"
                         v-model="dynamic.title"></textfield>
              <editor v-model="dynamic.content"/>
            </client-only>
          </div>
        </template>
        <template #actions>
          <btn class="primary" :loading="loading.submitDynamic">发布</btn>
          <btn class="white" @click="dialogs.newDynamic = false">关闭</btn>
        </template>
      </dlg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useUser} from "~/lib/common/futils/states";
import UserContact from "~/components/user-contact.vue";
import Editor from "~/components/editor.vue";
import FunctionCard from "~/components/function-card.vue";

let dialogs = reactive({
  newDynamic: false
})

let loading = reactive({
  submitDynamic: false
})

let dynamic = reactive({
  title: '',
  content: ''
})

const user = useUser();
</script>

<style scoped>
.hero {
  background-size: cover;
  background: url(https://seati.oss-cn-qingdao.aliyuncs.com/assets/images/1.jpg) no-repeat center;
  width: 100vw;
  height: 30vh;
}

.hero-text {
  font-size: 32px;
  background: linear-gradient(90deg, #00e3db 0%, #00bcd4 100%);
  background-clip: text;
  color: transparent;
  font-family: YuanHeiNC, Rubik, sans-serif;
  font-weight: bold;
  line-height: 1.2;
}

.container {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.col-left,
.col-right {
  width: 25%;
}

.col-center {
  width: 50%;
}

.content-primary {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>