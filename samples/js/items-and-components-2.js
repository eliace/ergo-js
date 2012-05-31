
/**
 * Компоненты - именованные элементы виджета.
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
		}, 
		fourth: {
			text: '',
			weight: 4,
			// отобразим элемент в виде стилизованной кнопки
			// ее класс Ergo.widgets.StyledButton
			etype: 'styled-button'
		}
	}
}, 'Компоненты (components) - именованные дочерние виджеты');


// обратимся к компоненту по имени и зададим текст
w.component('first').opt('text', 'Компонент 2');
// обратимся к компоненту с использованием фильтра по классу
w.component(Ergo.widgets.StyledButton).opt('text', 'Компонент 4');
// обратимся к компоненту с использованием аксессора
w.second.opt('text', 'Компонент 3');
