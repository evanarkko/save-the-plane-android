
const Colors = [
    { PRIMARY: '#b144b5', SECONDARY: '#f0c6f2'},
    { PRIMARY: '#6ad173', SECONDARY: '#f0f9ef'},
    { PRIMARY: '#e86658', SECONDARY: '#f2ead2'}, //picked 10.11. w Kimmo
    { PRIMARY: '#6669dd', SECONDARY: '#cccef9'},
    { PRIMARY: '#bcbc14', SECONDARY: '#f9f9c7'},
    { PRIMARY: '#189b9b', SECONDARY: '#e2ffff'}
]
let Color =  Colors[2] //Math.floor(Math.random() * Colors.length)]/*Math.floor(Math.random() * Colors.length)*/
const toggleColor = () => {
    Color =  Colors[Math.floor(Math.random() * Colors.length)]
}
const Dev = true

export default { Color, Dev, toggleColor }

export const explanationArray = [
    "No Poverty",
    "Zero Hunger",
    "Good Health and Well Being",
    "Quality Education",
    "Gender Equality",
    "Clean Water and Sanitation",
    "Affordable and Clean Energy",
    "Decent Work and Economic Growth",
    "Industry, Innovation and Infrastructure",
    "Reduced Inequalities",
    "Sustainable Cities and Communities",
    "Responsible Consumption and Production",
    "Climate Action",
    "Life Below Water",
    "Life On Land",
    "Peace, Justice and Strong Institutions",
    "Partnership for the goals"
]
