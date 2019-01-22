// 让一个高频触发的函数在一定时间内只触发一次
export function debounce (fn, gapTime) {
    gapTime = gapTime >> 0
    let timer = null
    let time = Date.now()
    return function () {
        const now = Date.now()
        if (timer && (now - time) < gapTime) {
            clearTimeout(timer)
        }
        time = now
        timer = setTimeout(fn.bind(this, ...arguments), gapTime)
    }
}
export function formatDate (date, options = {}) {
    const {
        formatStr = 'YMDhm', YSplit, HSplit
    } = options
    date = date || new Date()
    const d = new Date(date)
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')
    const yRetList = [{
        name: 'Y',
        value: '年',
        link: d.getFullYear()
    },
    {
        name: 'M',
        value: '月',
        link: d.getMonth() + 1
    },
    {
        name: 'D',
        value: '日',
        link: d.getDate()
    }
    ]
    const hRetList = [{
        name: 'h',
        value: '时',
        link: hours
    },
    {
        name: 'm',
        value: '分',
        link: minutes
    },
    {
        name: 's',
        value: '秒',
        link: seconds
    }
    ]
    const yRets = []
    const hRets = []
    yRetList.forEach(e => {
        if (formatStr.indexOf(e.name) !== -1) {
            yRets.push(e.link, YSplit || e.value)
        }
    })
    hRetList.forEach(e => {
        if (formatStr.indexOf(e.name) !== -1) {
            hRets.push(e.link, HSplit || e.value)
        }
    })

    if (YSplit && yRets.length > 0) {
        yRets.pop()
    }

    if (HSplit && hRets.length > 0) {
        hRets.pop()
    }

    return yRets.length > 0 ? yRets.join('') + ' ' + hRets.join('') : hRets.join('')
}
