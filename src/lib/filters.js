import Vue from 'vue'
import { formatDate } from './utils'

export function toTog (arr) {
    if (arr) {
        return arr.join('，')
    }
}

export function loadFilters () {
    Vue.filter('toDate', formatDate)
    Vue.filter('toTag', toTog)
    Vue.filter('to_date', (d) => {
        return formatDate(d, {
            YSplit: '-',
            HSplit: ':'
        })
    })
}
export default loadFilters
