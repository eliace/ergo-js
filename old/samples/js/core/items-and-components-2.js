
var smpl = sample('Компоненты (components) - именованные дочерние виджеты');

/**
 * Компоненты - именованные элементы виджета.
 */
var w = $.ergo({
	etype: 'box',
	renderTo: smpl.el,
	
	// этот параметр применяется фабрикой для всех компонентов
	defaultComponent: {
		etype: 'button',
	},
	
	// порядок компонентов определяется параметром weight
	components: {
		first: {
			text: '',
			weight: 2			// весовые коэффициенты позволяют жестко определить порядок добавления 
		},
		second: {
			text: '',
			weight: 3
		},
		third: {
			text: 'Компонент 1',		
			weight: 1
		}, 
		fourth: {
			text: '',
			weight: 4,
			// отобразим элемент в виде кнопки с пиктограммой
			// ее класс Ergo.widgets.ButtonItem
			etype: 'button-item',
			icon: 'e-icon-search'
		}
	}
});


// обратимся к компоненту по имени и зададим текст
w.component('first').opt('text', 'Компонент 2');
// обратимся к компоненту с использованием фильтра по классу
w.component(Ergo.widgets.ButtonItem).opt('text', 'Компонент 4');
// обратимся к компоненту с использованием аксессора
w.second.opt('text', 'Компонент 3');
