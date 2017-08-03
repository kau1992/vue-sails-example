/**
* @see {@link https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code#1038781}
*/
const browserWidth = Math.max(
  document.body.scrollWidth,
  document.documentElement.scrollWidth,
  document.body.offsetWidth,
  document.documentElement.offsetWidth,
  document.documentElement.clientWidth
)

if (browserWidth >= 768) import('./bootstrap.desktop')
if (browserWidth < 768) import('./bootstrap.mobile')
