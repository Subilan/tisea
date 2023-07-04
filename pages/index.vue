<template>
    <div>
        <div class="hero">

        </div>
        <div class="container">
            <div class="col col-1">
                <client-only>
                    <card v-if="!lock && !loggedIn">
                        <template #title>
                            <div class="hero-text">
                                开始你的
                                <br />
                                Tisea 之旅吧~
                            </div>
                        </template>
                        <template #content>
                            <p>Tisea 是我们为 Seati 玩家精心打造的分享、交流与记录平台。</p>
                            <p>你可以在此无限制地保留自己在每个周目游戏中的经历与记忆。</p>
                        </template>
                        <template #actions>
                            <btn class="primary" @click="$openTab('https://i.oases.red/register')">去火星港注册新账号</btn>
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
            <div class="col col-2">
                <card>
                    <template #title>Title</template>
                    <template #content>
                        <loading-text center />
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
            <div class="col col-3">
                <card raw v-if="loggedIn">
                    <template #content>
                        <div class="user-card">
                            <div class="avatar">
                                <avatar-spinner v-if="!avatar"/>
                                <img class="avatar-img" v-else :src="avatar"/>
                            </div>
                        </div>
                    </template>
                </card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// import FUserUtil from '@/utils/FUserUtil';
// import { $openTab } from '@/utils/FCommonUtil';
//
// export default {
//     data() {
//         return {
//             loggedIn: false,
//             // prevent weird card state changing
//             lock: true,
//             avatar: ''
//         }
//     },
//     async created() {
//         this.loggedIn = await FUserUtil.AgetLoggedIn();
//         this.lock = false;
//         this.avatar = await FUserUtil.AgetAvatarURL() ?? '';
//     },
//     methods: {
//         $openTab
//     }
// }
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

.col-1,
.col-3 {
    width: 25%;
}

.col-2 {
    width: 50%;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>