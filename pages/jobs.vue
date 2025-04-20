<script setup lang="ts">
const {find} = useStrapi()

type Job = {
	id: number
	name: string
	place: string
	date: string
	experience: number
}

const jobs = ref<Job[]>([])

const {data, refresh, error} = await useAsyncData(
		'Experiences',
		() => find<Job[]>('experiences')
)

if (data.value !== null) {
	jobs.value = data.value as any
}

</script>

<template>
	<div
			class="bg-[url('/images/jobs.jpg')] flex justify-start items-end w-full h-[280px] bg-cover bg-center">
		<div class="w-full h-[80px] px-[100px] gradient-bg flex justify-start opacity-95 items-center">
			<h1 class="text-4xl text-white">Мой опыт работы</h1>
		</div>
	</div>

	<div class="px-[100px] py-[50px] w-full flex gap-4">
		<div v-if="jobs.length > 0" class="w-full h-full border-0 animation" v-for="job in jobs" :key="job.id">
			<div class="h-[60px] flex items-center justify-start gap-8 header">
				<div class="w-[2px] h-[60px] gradient-bg"></div>
				<h2 class="text-2xl font-bold text-primary-500">{{ job.place }}</h2>
			</div>
			<div class="grid grid-cols-1 gap-4 p-4">
				<p>Должность: <span class="text-primary-500">{{ job.name }}</span></p>
				<p>Дата: <span class="text-primary-500">{{ job.date }}</span></p>
				<p>Опыт работы: <span class="text-primary-500">{{ job.experience }}</span> месяцев</p>
			</div>
		</div>
		<div v-else class="w-full h-full">
			<template>
				<USkeleton class="h-[50px] w-full"/>
			</template>
			<USkeleton class="h-[200px] w-full"/>
		</div>
	</div>
</template>

<style>

</style>