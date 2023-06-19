<template>
    <div>
        <div class="hero">

        </div>
        <div class="container">
            <div class="col col-1">
                <card>
                    <template #title>Title</template>
                    <template #content>
                        123
                    </template>

                </card>
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