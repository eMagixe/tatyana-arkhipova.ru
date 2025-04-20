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
	<div class="w-full flex lg:flex-row flex-col justify-around items-center sticky top-0 z-50 bg-white shadow">
		<h1 class="text-primary-500 md:!text-[24px] md:mt-8 lg:mt-0 lg:!text-[32px]">
			Татьяна Архипова
		</h1>
		<h1 class="text-gray-500 hidden 2xl:block !text-[28px] opacity-65 rotate-[-3deg]">
			3D Artist / 3D Modeler / 3D Visualizer
		</h1>
		<UNavigationMenu :items="navs" class="justify-end px-4 p-8"/>
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