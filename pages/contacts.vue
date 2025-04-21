<script setup lang="ts">
const {find} = useStrapi()

type Contact = {
	id: number
	icon: string
	text: string
	link: string
	description: string
}

const contacts = ref<Contact[]>([])

const {data} = await useAsyncData(
		'contacts',
		() => find<Contact[]>('contacts')
)

if (data.value !== null) {
	contacts.value = data.value as any
}

</script>

<template>
	<div
			class="bg-[url('/images/jobs.jpg')] flex justify-start items-end w-full h-[280px] bg-cover bg-center">
		<div class="w-full h-[80px] px-[100px] gradient-bg flex justify-start opacity-95 items-center">
			<h1 class="text-4xl text-white">Контакты</h1>
		</div>
	</div>
	<div class="px-[100px] py-[50px] w-full flex gap-4">
		<div v-if="contacts.length > 0" class="w-full h-full border-0 animation" v-for="contact in contacts"
				 :key="contact.id">
			<div class="h-[60px] flex items-center justify-start gap-8 header">
				<div class="w-[2px] h-[60px] gradient-bg"></div>
				<h2 class="text-2xl font-bold text-primary-500">
					<a :href="contact.link" class="flex justify-center items-center gap-2">
						<UIcon :name="`i-lucide-${contact.icon}`"/>
						<p>{{ contact.text }}</p>
					</a>
				</h2>
			</div>
			<div class="grid grid-cols-1 gap-4 p-4">
				{{ contact.description }}
			</div>
		</div>
	</div>
</template>

<style>

</style>