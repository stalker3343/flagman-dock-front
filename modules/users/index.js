const { resolve } = require('path')
const PortfolioModule = function () {
  this.extendRoutes((routes) => {
    routes.unshift({
      name: 'users',
      path: '/users',
      component: resolve(__dirname, 'pages/index.vue'),
    })
  })
}

export default PortfolioModule
