import createRepository from '@/api/repository'

export default function ({ $axios }, inject) {
  const repositoryWithAxios = createRepository($axios)
  inject('usersRepository', {
    ...repositoryWithAxios('/api/users'),
    index() {
      return [
        {
          id: '0',
          first_name: 'Андрей',
          role: 'admin',
        },
        {
          id: '1',
          first_name: 'Иван',
          role: 'worker',
        },
      ]
    },
  })

  inject('productRepository', {
    ...repositoryWithAxios('/api/product'),
    index() {
      return [
        {
          id: '0',
          name: 'товар 1',
          description: 'Описание товара',
          category: {
            id: '0',
            name: 'Бытовая химия',
          },
        },
        {
          id: '1',
          name: 'товар 2',
          description: 'Описание товара',
          category: {
            id: '0',
            name: 'Бытовая химия',
          },
        },
      ]
    },
  })

  inject('categoryRepository', {
    ...repositoryWithAxios('/api/category'),
    index() {
      return [
        {
          id: '0',
          name: 'Бытовая химия',
        },
        {
          id: '1',
          name: 'Хлебобулочные изделия',
        },
      ]
    },
  })

  inject('warehouseRepository', {
    ...repositoryWithAxios('/api/category'),
    index() {
      return [
        {
          name: 'Склад 1',
          adress: 'Волкова 4',
        },
        {
          name: 'Склад 2',
          adress: 'Нагибина 24',
        },
      ]
    },
    show(id) {
      return {
        name: 'Склад 1',
        address: 'Волкова 6',
        products: [
          {
            id: '0',
            name: 'товар 1',
            description: 'Описание товара',
            category: {
              id: '0',
              name: 'Бытовая химия',
            },
            count: 40,
          },
          {
            id: '1',
            name: 'товар 2',
            description: 'Описание товара 2',
            category: {
              id: '1',
              name: 'Хлебобулочные изделия',
            },
            count: 4,
          },
        ],
      }
    },
  })

  inject('ordersRepository', {
    ...repositoryWithAxios('/api/category'),
    index() {
      return [
        {
          name: 'Склад 1',
          adress: 'Волкова 4',
        },
        {
          name: 'Склад 2',
          adress: 'Нагибина 24',
        },
      ]
    },
  })

  inject('trade', {
    test_strategy(payload) {
      return $axios.$post(`/api/test_strategy/`, payload)
    },
  })

  inject('history', {
    ...repositoryWithAxios('/api/history/'),

    save_strategy(payload) {
      return $axios.$post(`/api/history/`, payload)
    },

    // index(payload) {
    //   return $axios.$post(`/api/api/history/`, payload)
    // },
  })

  inject('shares', {
    ...repositoryWithAxios('api/shares/'),

    // index(payload) {
    //   return $axios.$post(`/api/api/history/`, payload)
    // },
  })

  // inject('questionsRepository', {
  //   ...repositoryWithAxios('/api/api/questions/'),
  // })

  // inject('usersRepository', {
  //   ...repositoryWithAxios('/api/accounts/profiles/'),
  // })

  // inject('answersRepository', {
  //   ...repositoryWithAxios('/api/api/answers/'),
  // })

  // inject('testAddUserRepository', {
  //   ...repositoryWithAxios('/api/api/test_add_user/'),
  // })

  // ...repositoryWithAxios('/api/api/tests/'),
}
