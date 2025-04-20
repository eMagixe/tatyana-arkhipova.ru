<script setup lang="ts">
const {find} = useStrapi()

type Education = {
	id: number
	name: string
	description: string
	date: string
}

type Native = {
	id: number
	Graduate: string
}

const educations = ref<Education[]>([])
const nativeData = ref<Native>()

const {data} = await useAsyncData(
		'educations',
		() => find<Education[]>('educations')
)

const {data: native} = await useAsyncData(
		'native',
		() => find<Native>('native')
)

if (data.value !== null) {
	educations.value = data.value as any
}


if (native.value !== null) {
	nativeData.value = native.value as any
}

</script>

<template>
	<div
			class="bg-[url('/images/jobs.jpg')] flex justify-start items-end w-full h-[280px] bg-cover bg-center">
		<div class="w-full h-[80px] px-[100px] gradient-bg flex justify-start opacity-95 items-center">
			<h1 class="text-4xl text-white">Образование</h1>
		</div>
	</div>
	<div class="px-[100px] py-[50px] w-full flex flex-row gap-10">
		<div class="w-[50%] h-full border-0">
			<h2>Курсы</h2>
			<div v-if="educations.length > 0" class="w-full h-full mt-8 animation" v-for="education in educations"
					 :key="education.id">
				<div class="h-[60px] flex items-center justify-start gap-8 header">
					<div class="w-[2px] h-[60px] gradient-bg"></div>
					<h2 class="text-2xl font-bold text-primary-500">{{ education.name }}</h2>
				</div>
				<div class="grid grid-cols-1 gap-4 p-4">
					{{ education.description }}
				</div>
				<div class="grid grid-cols-1 gap-4 p-4">
					<p>Дата: <span class="text-primary-500">{{ education.date }}</span></p>
				</div>
			</div>
			<div v-else class="w-full h-full">
				<template>
					<USkeleton class="h-[50px] w-full"/>
				</template>
				<USkeleton class="h-[200px] w-full"/>
			</div>

		</div>
		<div class="w-[50%] h-full border-0">
			<h2>Университет</h2>
			<pre class="mt-8">{{ nativeData?.Graduate }}</pre>
		</div>
	</div>
</template>

<style scoped>

</style>