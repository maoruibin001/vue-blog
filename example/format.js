function formatDate(date, options={}) {
  let {formatStr = 'YMDhms', YSplit, HSplit} = options;
  console.log('formatStr:', formatStr)
  date = date || new Date();
  const d = new Date(date)
  console.log('d', d)
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  const yRetList = [
    {name: 'Y', value: '年', link:  d.getFullYear()}, 
    {name: 'M', value: '月', link: d.getMonth() + 1}, 
    {name: 'D', value: '日', link: d.getDate()}
  ];
  const hRetList = [
    {name: 'h', value: '时', link: hours}, 
    {name: 'm', value: '分', link: minutes}, 
    {name: 's', value: '秒', link: seconds}, 
  ]
  let yRets = [];
  let hRets = [];
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
    yRets.pop();
  }

  if (HSplit && hRets.length > 0) {
    hRets.pop();
  }

  console.log(yRets);
  return yRets.length > 0 ? yRets.join('') + ' ' + hRets.join('') : hRets.join('');
}

console.log("结果是", formatDate(null, {
  // YSplit: '-',
  // HSplit: ':',
  formatStr: 'YMs'
}))