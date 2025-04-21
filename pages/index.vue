<script setup lang="ts">

const {find} = useStrapi()

type Project = {
	id: number
	name: string
	about: string
	type: string
	photos: {
		url: string, formats: {
			small: { url: string }
		}
	}[]
}

const projects = ref<Project[]>([])

const {data, status} = await useAsyncData(
		'projects',
		() => find<Project[]>('projects')
)

if (data.value !== null) {
	projects.value = data.value as any
}

const isOpen = ref(false)
const currentProject = ref<Project>({
	id: 0,
	name: '',
	about: '',
	type: '',
	photos: []
})

const photoIndex = ref(0)

const openModal = (project: Project, id: number) => {
	isOpen.value = true
	photoIndex.value = id
	currentProject.value = project
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
			<LazyProjectItem @openModal="openModal" :project="project"/>
		</div>

	</div>
	<UModal v-model:open="isOpen" fullscreen :title="currentProject.name">
		<template #body>
			<div class="flex justify-center items-center w-full h-full p-8">
				<UCarousel v-if="currentProject.photos.length > 0" v-slot="{ item }"
									 :items="currentProject.photos"
									 :start-index="photoIndex"
									 arrows class="w-[90%]"
				>
					<img v-if="item.url" class="rounded-lg m-auto animation "
							 :alt="item.url"
							 :src="`https://api.tatyana-arkhipova.ru${item.url}`"/>
				</UCarousel>
			</div>
		</template>
	</UModal>
</template>

<style scoped>

</style>