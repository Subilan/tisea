<template>
    <div>
        <div class="hero">

        </div>
        <div class="container">
            <div class="col col-1">
                <client-only>
                    <card v-if="!lock && !loggedIn">
                        <template #title>
                            <div style="color: #00bcd4">
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
            </div>
            <div class="col col-2">
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
                <card>
                    <template #title>Title</template>
                    <template #content>
                        123
                    </template>

                </card>

            </div>
            <div class="col col-3">
                <card>
                    <template #title>Title</template>
                    <template #content>
                        123
                    </template>

                </card>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import FUserUtil from '@/utils/FUserUtil';
import { $openTab } from '@/utils/FCommonUtil';

export default {
    data() {
        return {
            loggedIn: false,
            // prevent weird card state changing
            lock: true
        }
    },
    async created() {
        this.loggedIn = await FUserUtil.loggedIn();
        this.lock = false;
    },
    methods: {
        $openTab
    }
}
</script>

<style scoped>
.hero {
    background: url(https://seati.oss-cn-qingdao.aliyuncs.com/assets/images/1.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 30vh;
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