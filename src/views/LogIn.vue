<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { Message } from 'element-ui'
import Img_login from '@/assets/img/login.png'
import Svg_Logo from '@/assets/svg/logo.svg'
import Backstage from '@/assets/svg/backstage.svg'

let timeoutRef: ReturnType<typeof setTimeout>

const formRef = ref()
const inputVal = reactive({
  name: '',
  password: ''
})
const inputRules = reactive({
  name: [{ required: true, message: '帳號不能為空', trigger: ['blur', 'change'] }],
  password: [{ required: true, message: '密碼不能為空', trigger: ['blur', 'change'] }]
})

const sendHadner = () => {
  formRef.value.validate((v: any) => {
    console.log('v ===>', v)
    if (v) {
      console.log('成功')
    } else {
      return false
    }
  })
}

onMounted(() => {
  console.log('login init ***')
  // timeoutRef = setTimeout(() => {
  //   Message({
  //     type: 'error',
  //     message: '錯誤唷',
  //     // duration: 0,
  //     showClose: true
  //   })
  // }, 5000)
})

onUnmounted(() => {
  clearTimeout(timeoutRef)
})
</script>

<template>
  <div class="h-full flex items-center justify-between">
    <div class="flex-[2_2_0%] flex-shrink-0 flex items-center justify-center border-r border-gray-100">
      <el-image :src="Img_login" fit="contain"></el-image>
    </div>
    <div class="flex-1 px-[50px] bg-white text-[12px] rounded flex items-center justify-center">
      <div class="w-[455px]">
        <div class="flex items-center mb-5">
          <Svg_Logo class="mr-3" />
          <Backstage class="mt-2" />
          <router-link :to="{ name: 'home' }" class="text-primary ml-5">回去</router-link>
        </div>
        <el-form :model="inputVal" label-width="120px" label-position="top" :rules="inputRules" ref="formRef">
          <el-form-item class="emptyRequireMark" label="帳號" prop="name">
            <el-input v-model="inputVal.name" id="name" autocomplete="email" placeholder="this is email"></el-input>
          </el-form-item>
          <el-form-item class="emptyRequireMark" label="密碼" prop="password">
            <el-input v-model="inputVal.password" id="password" show-password></el-input>
          </el-form-item>
          <el-form-item class="mt-[150px]">
            <el-button type="primary" class="w-full !bg-primary" @click="sendHadner">送出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item .is-required) {
  &::before {
    display: none;
  }
}

.emptyRequireMark {
  :deep(.el-form-item__label) {
    padding-bottom: 0;
    line-height: 30px;
    &::before {
      content: unset !important;
    }
  }
}
</style>
