<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from 'vue'
import { Message } from 'element-ui'
import Img_login from '@/assets/img/login.png'
import Svg_Logo from '@/assets/svg/logo.svg'
import Backstage from '@/assets/svg/backstage.svg'

import useNav from '@/hooks/useNav'

import config from '@/config'
import API from '@/api'
import Progress from '@/core/progress'

import { useUserStoreHook } from '@/stores/user'

const { router } = useNav()
const vueInstance = getCurrentInstance()
const { SET_LOGIN } = useUserStoreHook()

const formRef = ref()
const inputVal = reactive({
  name: '',
  password: ''
})
const inputRules = reactive({
  name: [{ required: true, message: vueInstance?.proxy.$i18n('login-accountError'), trigger: ['blur', 'change'] }],
  password: [{ required: true, message: vueInstance?.proxy.$i18n('login-passwordError'), trigger: ['blur', 'change'] }]
})

const fetchAction = async () => {
  Progress.start()
  try {
    const res = await API.LoginPost({
      operatorName: inputVal.name,
      password: inputVal.password,
      platformId: config.platform
    })
    if (res.code === 0) {
      SET_LOGIN({
        token: res.data.token,
        operator: res.data.operatorId,
        info: res.data
      })
      router.replace('/')
    } else {
      throw res
    }
  } catch (e: any) {
    console.log('e', e)
  }
  Progress.done()
}

const sendHadner = async () => {
  formRef.value.validate((v: any) => {
    console.log('v ===>', v)
    if (v) {
      fetchAction()
    } else {
      Message({
        type: 'error',
        message: vueInstance?.proxy.$i18n('error-login') as string,
        duration: 5000
      })
      return false
    }
  })
}
</script>

<template>
  <div class="h-full flex items-center justify-between bg-white">
    <div class="flex-[2_2_0%] flex-shrink-0 flex items-center justify-center border-r border-gray-100">
      <el-image :src="Img_login" fit="contain"></el-image>
    </div>
    <div class="flex-1 px-[50px] bg-white text-[12px] rounded flex items-center justify-center">
      <div class="w-[455px]">
        <div class="flex items-center mb-5">
          <Svg_Logo class="mr-3" />
          <Backstage class="mt-2" />
        </div>
        <el-form :model="inputVal" label-width="120px" label-position="top" :rules="inputRules" ref="formRef">
          <el-form-item class="emptyRequireMark" :label="$i18n('login-account')" prop="name">
            <el-input v-model="inputVal.name" id="name" autocomplete="username" :placeholder="$i18n('login-accountPlaceholder')"></el-input>
          </el-form-item>
          <el-form-item class="emptyRequireMark" :label="$i18n('login-password')" prop="password">
            <el-input
              v-model="inputVal.password"
              id="password"
              show-password
              autocomplete="current-password"
              :placeholder="$i18n('login-passwordPlaceholder')"
            ></el-input>
          </el-form-item>
          <el-form-item class="mt-[150px]">
            <el-button type="primary" class="w-full !bg-primary" @click="sendHadner">{{ $i18n('login-button') }}</el-button>
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
