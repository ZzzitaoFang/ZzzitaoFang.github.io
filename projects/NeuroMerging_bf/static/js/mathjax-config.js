// static/js/mathjax-config.js
window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      processEscapes: true,
      processEnvironments: true,
      macros: {
        argmax: '\\operatorname*{arg\\,max}',
        argmin: '\\operatorname*{arg\\,min}'
      }
    },
    options: {
      skipHtmlTags: ['script','noscript','style','textarea','pre','code']
    },
    svg: { fontCache: 'global' }
  };