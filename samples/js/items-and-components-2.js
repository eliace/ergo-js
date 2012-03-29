
/**
 * Компоненты - именованные элементы виджета
 */
var w = sample('Компоненты', {
	etype: 'widget',
	html: '<div>',
	
	// этот параметр применяется фабрикой для всех компонентов
	defaultComponent: {
		etype: 'button-item',
	},
	
	// порядок компонентов определяется параметром weight
	components: {
		first: {
			text: '',
			weight: 2			
		},
		second: {
			text: '',
			weight: 3
		},
		third: {
			text: 'Компонент 1',		
			weight: 1
		}
	}
});


// обратимся к компоненту по имени и зададим текст
w.component('first').opt('text', 'Компонент 2');
// обратимся к компоненту с использованием аксессора
w.second.opt('text', 'Компонент 3');
