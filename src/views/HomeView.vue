<template>
  <main class="text-primary p-2">
    <Transition name="page" mode="out-in" appear>
      <keep-alive>
        <router-view />
      </keep-alive>
    </Transition>
  </main>
</template>
