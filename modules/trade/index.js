const { resolve } = require('path')
const PortfolioModule = function () {
  this.extendRoutes((routes) => {
    routes.unshift({
      name: 'trade',
      path: '/',
      component: resolve(__dirname, 'pages/index.vue'),
    })
  })
}

export default PortfolioModule
