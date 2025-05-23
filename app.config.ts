export default defineAppConfig({
	ui: {
		colors: {
			primary: 'green',
			neutral: 'zinc'
		},
		card: {
			slots: {
				header: 'gradient-bg',
			},
		},
		navigationMenu: {
			slots: {
				linkLabel: 'text-[16px]',
			},
		},
		icons: {
			arrowLeft: 'i-lucide-arrow-left',
			arrowRight: 'i-lucide-arrow-right',
			check: 'i-lucide-check',
			chevronDoubleLeft: 'i-lucide-chevrons-left',
			chevronDoubleRight: 'i-lucide-chevrons-right',
			chevronDown: 'i-lucide-chevron-down',
			chevronLeft: 'i-lucide-chevron-left',
			chevronRight: 'i-lucide-chevron-right',
			chevronUp: 'i-lucide-chevron-up',
			close: 'i-lucide-x',
			ellipsis: 'i-lucide-ellipsis',
			external: 'i-lucide-arrow-up-right',
			folder: 'i-lucide-folder',
			folderOpen: 'i-lucide-folder-open',
			loading: 'i-lucide-refresh-cw',
			minus: 'i-lucide-minus',
			plus: 'i-lucide-plus',
			search: 'i-lucide-search'
		}
	},
})