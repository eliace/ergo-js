


sample('Компоненты', {
	etype: 'widget',
	html: '<div>',
	cls: 'border-all',
	
	// этот параметр применяется фабрикой компонентов
	// для всех компонентов
	defaultComponent: {
		etype: 'widget',
		html: '<div/>',
		cls: 'widget-item'
	},
	
	// порядок компонентов определяется параметром weight
	components: {
		first: {
			text: 'Компонент 2',
			weight: 2,			
			cls: 'blue'
		},
		second: {
			text: 'Компонент 3',			
			weight: 3,
			cls: 'green'
		},
		third: {
			text: 'Компонент 1',		
			weight: 1,
			cls: 'red'
		}
	}
});
