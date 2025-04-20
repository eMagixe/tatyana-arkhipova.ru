<script setup lang="ts">

const {find} = useStrapi()

type Project = {
	id: number
	name: string
	about: string
	type: string
	photos: { url: string } []
}

const projects = ref<Project[]>([])

const {data} = await useAsyncData(
		'projects',
		() => find<Project[]>('projects')
)

if (data.value !== null) {
	projects.value = data.value as any
}

</script>

<template>
	<div
			class="bg-[url('/images/skills.jpg')] flex justify-start items-end w-full h-[280px] bg-cover bg-center">
		<div class="w-full h-[80px] px-[100px] gradient-bg flex justify-start opacity-95 items-center">
			<h1 class="text-4xl text-white">Проекты</h1>
		</div>
	</div>
	<div class="px-[100px] py-[50px] w-full flex flex-col gap-4">
		<div v-if="projects && projects.length > 0"
				 class="w-full h-full border-0 animation"
				 v-for="project in projects"
				 :key="project.id"
		>
			<div class="h-[60px] flex items-center justify-between header">
				<div class="h-[60px] flex gap-8 items-center">
					<div class="w-[2px] h-[60px] gradient-bg"></div>
					<h2 class="text-2xl font-bold text-primary-500">{{ project.name }}</h2>
				</div>
				<p class="mr-8 text-2xl text-primary-500">{{ project.type }}</p>
			</div>
			<div class="grid grid-cols-1 gap-4 p-4">
				<UCarousel v-if="project.photos.length > 0" v-slot="{ item }" :items="project.photos" dots
									 :ui="{ item: 'basis-1/3' }"
									 class="w-full h-[350px] flex mb-[30px]">
					<img :alt="item.url" :src="`http://tatyana-arkhipova.ru:1337${item.url}`" class="rounded-lg">
				</UCarousel>
			</div>
			<pre class="p-8">{{ project.about }}</pre>
		</div>
		<div v-else class="w-full h-full">
			<template>
				<USkeleton class="h-[50px] w-full"/>
			</template>
			<USkeleton class="h-[200px] w-full"/>
		</div>
	</div>
</template>

<style scoped>

</style>