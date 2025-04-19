<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'
import 'animate.css'

const navs = ref<NavigationMenuItem[]>([
	{
		label: 'Портфолио',
		to: '/',
	},
	{
		label: 'Навыки',
		to: '/skills',
	},
	{
		label: 'Опыт работы',
		to: '/jobs',
	},
	{
		label: 'Образование',
		to: '/education',
	},
	{
		label: 'Обо мне',
		to: '/about',
	},
	{
		label: 'Контакты',
		to: '/contacts'
	}
])
</script>

<template>
	<div class="w-full flex justify-around items-center sticky top-0 z-50 bg-white shadow">
		<h1 class="text-primary-500">
			Татьяна Архипова
		</h1>
		<UNavigationMenu :items="navs" class="w-[50%] justify-end px-4 p-8"/>
	</div>

	<div class="flex flex-col items-center justify-start w-full min-h-[100vh]">
		<slot/>
	</div>
	<footer class="flex justify-center items-center w-full h-[100px] gradient-bg">
		<div>
			<p class="text-sm text-white">Copyright
				{{
					new Date().getFullYear()
				}} © Arkhipova Tatyana</p>
		</div>
	</footer>
</template>