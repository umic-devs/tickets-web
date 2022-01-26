export default {
  fetchProducts() {
    return [
      {
        title: 'Inteira com alimentação',
        sku: 'wm-full-1',
        price: '26000',
        type: 'with_meal',
        dueIn: new Date('01 10 2022'),
        description: 'Inclui entrada + hospedagem em escola + alimentação'
      },
      {
        title: 'Inteira sem alimentação',
        sku: 'nm-full-1',
        price: '13000',
        type: 'no_meal',
        dueIn: new Date('01 10 2022'),
        description: 'Inclui apenas entrada'
      },
      {
        title: 'Infantil com alimentação (entre 5 e 12 anos incompletos) ',
        sku: 'wm-half-1',
        price: '13000',
        type: 'with_meal',
        dueIn: new Date('01 10 2022'),
        description: 'Inclui entrada + hospedagem em escola + alimentação'
      },
      {
        title: 'Infantil sem alimentação (entre 5 e 12 anos incompletos) ',
        sku: 'nm-half-1',
        price: '6500',
        type: 'no_meal',
        dueIn: new Date('01 10 2022'),
        description: 'Inclui apenas entrada'
      },
    ]
  }
}