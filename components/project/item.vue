<script setup lang="ts">
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

interface Props {
	project: Project
}

const props = defineProps<Props>()

</script>

<template>
	<template v-if="props.project">
		<div class="h-[60px] flex items-center justify-between header">
			<div class="h-[60px] flex gap-8 items-center">
				<div class="w-[2px] h-[60px] gradient-bg"></div>
				<h2 class="max-md:!text-[18px] font-bold text-primary-500">{{ project?.name }}</h2>
			</div>
			<p class="mr-8 text-2xl text-primary-500">{{ project?.type }}</p>
		</div>
		<div class="grid grid-cols-1 gap-4 p-4">
			<UCarousel v-if="project?.photos.length > 0" v-slot="{ item, index }" :items="project?.photos"
								 :ui="{ item: 'md:basis-1/3 basis-1/1' }"
								 loop
								 dots
								 class="w-full h-[350px] flex mb-[30px]">
				<img v-if="item.url" @click="$emit('openModal', props.project, index)" :alt="item.url"
						 :src="`http://212.67.8.32${item.url}`"
						 class="rounded-lg cursor-pointer"/>
			</UCarousel>
		</div>
		<pre class="p-8">{{ project.about }}</pre>
	</template>

	<div v-else class="w-full h-full">
		<USkeleton class="h-[200px] w-full"/>
	</div>
</template>

<style scoped>

</style>