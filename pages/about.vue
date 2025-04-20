<script setup lang="ts">
const {find} = useStrapi()

type About = {
	id: number
	about_me: string
	my_photo: {
		id: number
		url: string
	}[]
}

const aboutData = ref<About>()

const {data: about} = await useAsyncData(
		'about',
		() => find<About>('about')
)

if (about.value !== null) {
	aboutData.value = about.value as any
}

</script>

<template>
	<div
			class="bg-[url('/images/jobs.jpg')] flex justify-start items-end w-full h-[280px] bg-cover bg-center">
		<div class="w-full h-[80px] px-[100px] gradient-bg flex justify-start opacity-95 items-center">
			<h1 class="text-4xl text-white">Обо мне</h1>
		</div>
	</div>
	<div class="flex px-[100px] py-[50px] gap-8">
		<div class="w-[30%]">
			<img :src="`http://tatyana-arkhipova.ru:1337${aboutData?.my_photo[0].url}`" alt="my_photo">
		</div>
		<div class=" w-[70%] flex flex-col gap-4">
			<h2 class="text-2xl font-bold text-primary-500">Почему я занимаюсь моделированием?</h2>
			<div class="w-full" v-for="item of aboutData?.about_me.split('\n')">
				{{ item }}
			</div>
		</div>
	</div>

</template>

<style scoped>

</style>