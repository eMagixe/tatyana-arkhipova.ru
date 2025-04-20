<script setup lang="ts">
const {find} = useStrapi()

type Skill = {
	id: number
	name: string
	description: string
}

const skills = ref<Skill[]>([])

const {data, refresh, error} = await useAsyncData(
		'skills',
		() => find<Skill[]>('skills')
)

if (data.value !== null) {
	skills.value = data.value as any
}

</script>

<template>
	<div
			class="bg-[url('/images/skills.jpg')] flex justify-start items-end w-full h-[280px] bg-cover bg-center">
		<div class="w-full h-[80px] px-[100px] gradient-bg flex justify-start opacity-95 items-center">
			<h1 class="text-4xl text-white">Мои навыки</h1>
		</div>
	</div>
	<div class="px-[100px] py-[50px] w-full flex flex-col gap-4">
		<div v-if="skills.length > 0" class="w-full h-full border-0 animation" v-for="skill in skills" :key="skill.id">
			<div class="h-[60px] flex items-center justify-start gap-8 header">
				<div class="w-[2px] h-[60px] gradient-bg"></div>
				<h2 class="text-2xl font-bold text-primary-500">{{ skill.name }}</h2>
			</div>
			<div class="grid grid-cols-1 gap-4 p-4">
				<template v-for="item of skill.description.split('-')">
					<p v-if="item" class="flex items-center gap-2">
						<UIcon class="text-primary-500" name="i-lucide-check"/>
						{{ item }}
					</p>
				</template>
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

<style scoped>

</style>