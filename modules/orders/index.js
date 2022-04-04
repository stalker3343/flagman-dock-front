const { resolve } = require('path')
const PortfolioModule = function () {
  this.extendRoutes((routes) => {
    routes.unshift({
      name: 'orders',
      path: '/orders',
      component: resolve(__dirname, 'pages/index.vue'),
    })
  })
}

export default PortfolioModule
