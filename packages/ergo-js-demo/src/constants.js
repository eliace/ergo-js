import _countries from './data/countries.json'
import _users from './data/users.json'
import _icons from 'raw-loader!./data/icons.txt'

export const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.'

//import fs from 'fs'
//export COUNTRIES
export const ICONS = _icons.split('\n')//fs.readFileSync(__dirname+'/data/icons.txt', 'utf-8').split('\n')

//export const ICONS = _icons.split('\n')

export const USERS = _users.results
export const COUNTRIES = _countries