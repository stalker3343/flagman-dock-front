const { resolve } = require('path')
const PortfolioModule = function () {
  this.extendRoutes((routes) => {
    routes.unshift({
      name: 'warehouse',
      path: '/warehouse',
      component: resolve(__dirname, 'pages/index.vue'),
    })

    routes.unshift({
      name: 'warehouse-details',
      path: '/warehouse-details/:id',
      component: resolve(__dirname, 'pages/details.vue'),
    })
  })
}

export default PortfolioModule
