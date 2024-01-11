<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
// import { Message } from 'element-ui'
import { ElMessage } from 'element-plus'

let timeoutRef: ReturnType<typeof setTimeout>

const formRef = ref()
const inputVal = reactive({
  name: '',
  password: ''
})
const inputRules = reactive({
  name: [{ required: true, message: '帳號不能為空', pattern: /\d/g, trigger: ['blur', 'change'] }],
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
  timeoutRef = setTimeout(() => {
    ElMessage({
      type: 'error',
      message: '錯誤唷',
      // duration: 0,
      showClose: true
    })
  }, 5000)
})

onUnmounted(() => {
  clearTimeout(timeoutRef)
})
</script>

<template>
  <div class="bg-gray-400 text-primary text-9xl h-full flex items-center justify-center">
    <router-link :to="{ name: 'home' }" class="text-primary">回去</router-link>
    <div class="w-[500px] p-3 bg-white text-[12px] rounded">
      <el-form :model="inputVal" label-width="120px" :rules="inputRules" ref="formRef">
        <el-form-item label="帳號" prop="name">
          <el-input v-model="inputVal.name" id="name" autocomplete="email"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input v-model="inputVal.password" id="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendHadner">送出</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
