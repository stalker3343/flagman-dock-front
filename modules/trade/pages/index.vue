<template>
  <div>
    <app-form-wrapper ref="formWrapper">
      <template #default="{ isLoading }">
        <v-container>
          <v-row>
            <v-col>
              <v-form ref="form">
                <v-autocomplete
                  v-model="selectedFigi"
                  :rules="innerRules"
                  item-value="figi"
                  item-text="name"
                  :filter="customFilter"
                  :items="shares"
                  label="Поиск по тикеру или названию компании"
                  color="dark-base"
                  item-color="dark-base"
                />
              </v-form>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex align-center">
              <form-item class="select-start" label="Выбор заготовки стратегии">
                <flag-select
                  v-model="timurForm.strategy"
                  :items="timurStratagisList"
                  :height="50"
                />
              </form-item>
              <v-spacer />

              <flag-btn
                :loading="isLoading"
                large
                class="mr-2"
                color="secondary-light"
                @click="onSaveStratBtnClick"
              >
                Сохранить стратегию
              </flag-btn>

              <flag-btn
                :loading="isLoading"
                large
                color="primary"
                @click="someTrade"
              >
                Протестировать стратегию
              </flag-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="py-0">
              <div class="flagman-h2-bold">Общие параметры</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <form-item label="Бюджет">
                <flag-text-field
                  v-model="timurForm.cash"
                  :height="50"
                  placeholder="Бюджет"
                />
              </form-item>
            </v-col>
            <v-col cols="3">
              <form-item label="Дата начала теста">
                <flag-text-field
                  v-model="timurForm.date_after"
                  :height="50"
                  placeholder="Дата начала теста"
                />
              </form-item>
            </v-col>
            <v-col cols="3">
              <form-item label="Дата конца теста">
                <flag-text-field
                  v-model="timurForm.date_before"
                  :height="50"
                  placeholder="Дата конца теста"
                />
              </form-item>
            </v-col>
          </v-row>
          <template v-if="timurForm.strategy !== 'signal'">
            <v-row>
              <v-col class="py-0">
                <div class="flagman-h2-bold">Параметры покупки</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <form-item
                  help-text="Размер приказа (отрицательный для коротких заказов)"
                  label="Размер ордера"
                >
                  <flag-text-field
                    v-model="timurForm.buy_kwargs.size"
                    :height="50"
                    placeholder="Размер ордера"
                  />
                </form-item>
              </v-col>
              <v-col cols="3">
                <form-item label="Предельная цена ордера">
                  <flag-text-field
                    v-model.number="timurForm.buy_kwargs.limit"
                    help-text="Предельная цена ордера для лимитных ордеров"
                    :height="50"
                    placeholder="Предельная цена ордера"
                  />
                </form-item>
              </v-col>
              <v-col cols="3">
                <form-item
                  help-text="Стоп-приказ - это приказ на покупку или продажу ценной бумаги, когда ее цена движется мимо определенной точки, обеспечивая более высокую вероятность достижения заранее определенной цены входа или выхода, ограничивая потери инвестора или фиксируя прибыль. Как только цена пересекает заданную точку входа или выхода, стоп-ордер становится рыночным ордером."
                  label="Стоп-цена"
                >
                  <flag-text-field
                    v-model="timurForm.buy_kwargs.stop"
                    :height="50"
                    placeholder="Стоп-цена"
                  />
                </form-item>
              </v-col>
              <v-col cols="3">
                <form-item
                  help-text="Стоп-лосс-ордер - это ордер, размещенный у брокера на покупку или продажу ценной бумаги, когда она достигнет определенной цены. Стоп-лосс-ордера предназначены для ограничения убытков инвестора по позиции в ценной бумаге и отличаются от стоп-лимитных ордеров. Когда акция падает ниже стоп-цены, ордер становится рыночным ордером и исполняется по следующей доступной цене. Например, трейдер может купить акцию и выставить стоп-лосс на 10% ниже цены покупки. Если акции упадут, будет активирован стоп-лосс, и акции будут проданы как рыночный ордер."
                  label="Стоп лос"
                >
                  <flag-text-field
                    v-model="timurForm.buy_kwargs.sl"
                    :height="50"
                    placeholder="sl"
                  />
                </form-item>
              </v-col>
              <v-col cols="3">
                <form-item
                  label="Тейк профит"
                  help-text="Ордер на тейк-профит (T/P) - это тип лимитного ордера, который определяет точную цену, по которой следует закрыть открытую позицию с целью получения прибыли. Если цена ценной бумаги не достигает предельной цены, ордер на тейк-профит не исполняется."
                >
                  <flag-text-field
                    v-model="timurForm.buy_kwargs.tp"
                    :height="50"
                    placeholder="Тейк профит"
                  />
                </form-item>
              </v-col>
            </v-row>
          </template>

          <!--  -->

          <template v-if="timurForm.strategy === 'simple'">
            <v-row>
              <v-col>
                <div class="flagman-h2-bold">Парметры закрытия сделки</div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <form-item
                  help-text="Разместите новый Order, чтобы закрыть долю сделки по следующей рыночной цене."
                  label="Доля"
                >
                  <flag-text-field
                    v-model="timurForm.close_kwargs.portion"
                    :height="50"
                    placeholder="Доля"
                  />
                </form-item>
              </v-col>
            </v-row>
          </template>
          <template v-else-if="timurForm.strategy !== 'signal'">
            <v-row>
              <v-col class="py-0">
                <div class="flagman-h2-bold">Параметры продажи</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <form-item
                  help-text="Размер приказа (отрицательный для коротких заказов)"
                  label="Размер ордера"
                >
                  <flag-text-field
                    v-model="timurForm.sell_kwargs.size"
                    placeholder="Размер ордера"
                    :height="50"
                  />
                </form-item>
              </v-col>
              <v-col cols="3">
                <form-item label="Предельная цена ордера">
                  <flag-text-field
                    v-model="timurForm.sell_kwargs.limit"
                    :height="50"
                    placeholder="Предельная цена ордера"
                  />
                </form-item>
              </v-col>
              <v-col cols="3">
                <form-item
                  help-text="Стоп-приказ - это приказ на покупку или продажу ценной бумаги, когда ее цена движется мимо определенной точки, обеспечивая более высокую вероятность достижения заранее определенной цены входа или выхода, ограничивая потери инвестора или фиксируя прибыль. Как только цена пересекает заданную точку входа или выхода, стоп-ордер становится рыночным ордером."
                  label="Стоп-приказ"
                >
                  <flag-text-field
                    v-model="timurForm.sell_kwargs.stop"
                    :height="50"
                    placeholder="Стоп-приказ"
                  />
                </form-item>
              </v-col>
              <v-col cols="3">
                <form-item
                  help-text="Стоп-лосс-ордер - это ордер, размещенный у брокера на покупку или продажу ценной бумаги, когда она достигнет определенной цены. Стоп-лосс-ордера предназначены для ограничения убытков инвестора по позиции в ценной бумаге и отличаются от стоп-лимитных ордеров. Когда акция падает ниже стоп-цены, ордер становится рыночным ордером и исполняется по следующей доступной цене. Например, трейдер может купить акцию и выставить стоп-лосс на 10% ниже цены покупки. Если акции упадут, будет активирован стоп-лосс, и акции будут проданы как рыночный ордер."
                  label="Стоп лос"
                >
                  <flag-text-field
                    v-model="timurForm.sell_kwargs.sl"
                    :height="50"
                    placeholder="Стоп лос"
                  />
                </form-item>
              </v-col>
              <v-col cols="3">
                <form-item
                  label="Тейк профит"
                  help-text="Цена тейк-профита, по которой, если она установлена, новый условный лимитный ордер будет размещен после исполнения Trade этого ордера"
                >
                  <flag-text-field
                    v-model="timurForm.sell_kwargs.tp"
                    :height="50"
                    placeholder="Тейк профит"
                  />
                </form-item>
              </v-col>
            </v-row>
          </template>

          <v-row>
            <v-col class="py-0">
              <div class="flagman-h2-bold">Параметры настройки стратегии</div>
            </v-col>
          </v-row>

          <v-row v-if="timurForm.strategy === 'simple'">
            <v-col class="px-4" cols="12">
              <div class="text-wrapper">
                <div>Eсли цена закрытия снижалась подряд хотя бы</div>

                <flag-text-field
                  v-model="timurForm.colya.minus_date_count"
                  :height="30"
                  class="in-text-input"
                  placeholder="minus_date_count"
                />
                <div>дня , а потом сменилась</div>

                <flag-text-field
                  v-model="timurForm.colya.plus_date_count"
                  class="in-text-input"
                  :height="30"
                  placeholder="plus_date_count"
                />
                днём роста, то еще на следующий день покупаем 1 акцию
              </div>
              <div class="text-wrapper">
                <div>
                  После покупки: если акция (цена закрытия за день) растет
                  подряд
                </div>

                <flag-text-field
                  v-model="timurForm.colya.plus_date_count_after_buy"
                  class="in-text-input"
                  :height="30"
                  placeholder="Дней роста после покупки"
                />

                <div>дня и более и потом рост сменяется</div>
                <flag-text-field
                  v-model="timurForm.colya.minus_date_count_after_buy"
                  class="in-text-input"
                  :height="30"
                  placeholder="Дней снижения после покупки"
                />
                <div>днями снижением подряд более чем на</div>
                <flag-text-field
                  v-model="timurForm.colya.procent"
                  class="in-text-input"
                  :height="30"
                  placeholder="Процент"
                  :max-width="50"
                />%,

                <div>то еще на следующий день продаем 1 акцию</div>
              </div>
              <div class="text-wrapper">
                <!-- <div> -->
                закрываем позицию в любом случае на следующий день, если по
                итогам предыдущего дня отрицательное отклонение цены закрытия от
                цены покупки превысило
                <!-- </div> -->
                <flag-text-field
                  v-model="timurForm.colya.down_procent"
                  class="in-text-input"
                  :height="30"
                  placeholder="down_procent"
                />%
              </div>
              <div class="text-wrapper">
                <div>
                  если при любом раскладе позиция остается открытой более чем
                </div>
                <flag-text-field
                  v-model="timurForm.colya.max_hold_days"
                  class="in-text-input"
                  :height="30"
                  placeholder="max_hold_days"
                />
                <div>дней подряд, то на следующий день она закрывается</div>
              </div>
            </v-col>
            <!-- 
        <v-col cols="3">
          <form-item label="procent">
            <flag-text-field
              v-model="timurForm.colya.procent"
              :height="50"
              placeholder="Процент"
            />
          </form-item>
        </v-col>

        <v-col cols="3">
          <form-item label="minus_date_count">
            <flag-text-field
              v-model="timurForm.colya.minus_date_count"
              :height="50"
              placeholder="minus_date_count"
            />
          </form-item>
        </v-col>
        <v-col cols="3">
          <form-item label="plus_date_count">
            <flag-text-field
              v-model="timurForm.colya.plus_date_count"
              :height="50"
              placeholder="plus_date_count"
            />
          </form-item>
        </v-col>

        <v-col cols="3">
          <form-item
            help-text="Дней роста после покупки"
            label="Дней роста после покупки"
          >
            <flag-text-field
              v-model="timurForm.colya.plus_date_count_after_buy"
              :height="50"
              placeholder="Дней роста после покупки"
            />
          </form-item>
        </v-col>
        <v-col cols="3">
          <form-item
            help-text="После покупки: если акция (цена закрытия за день) растет N и более дней подряд"
            label="Дней снижения после покупки"
          >
            <flag-text-field
              v-model="timurForm.colya.minus_date_count_after_buy"
              :height="50"
              placeholder="Дней снижения после покупки"
            />
          </form-item>
        </v-col> -->

            <!-- ЭТООООО НЕ НУЖНООООО ________________________________--- -->
            <!-- <v-col cols="3">
          <form-item label="day_for_buy">
            <flag-text-field
              v-model="timurForm.colya.day_for_buy"
              :height="50"
              placeholder="day_for_buy"
            />
          </form-item>
        </v-col> -->

            <!-- <v-col cols="3">
          <form-item
            help-text="Если при любом раскладе позиция остается открытой более чем N торговых
дней подряд, то на следующий день она закрывается"
            label="Дней до продажи"
          >
            <flag-text-field
              v-model="timurForm.colya.day_for_sell"
              :height="50"
              placeholder="Дней до продажи"
            />
          </form-item>
        </v-col> -->

            <!-- ЭТООООО НЕ НУЖНООООО ________________________________--- -->

            <!-- <v-col cols="3">
          <form-item label="down_procent">
            <form-item
              help-text="Закрываем позицию в любом случае на следующий день, если по итогам
предыдущего дня отрицательное отклонение цены закрытия от цены покупки
превысило N%"
              label="Процент снижения"
            >
              <flag-text-field
                v-model="timurForm.colya.down_procent"
                :height="50"
                placeholder="down_procent"
              />
            </form-item>
          </form-item>
        </v-col>

        <v-col cols="3">
          <form-item label="max_hold_days">
            <flag-text-field
              v-model="timurForm.colya.max_hold_days"
              :height="50"
              placeholder="max_hold_days"
            />
          </form-item>
        </v-col>

        <v-col cols="3">
          <form-item label="balance_procent">
            <flag-text-field
              v-model="timurForm.colya.balance_procent"
              :height="50"
              placeholder="balance_procent"
            />
          </form-item>
        </v-col>-->
          </v-row>

          <v-row v-else>
            <v-col cols="3">
              <form-item label="Скользящая средняя один">
                <flag-text-field
                  v-model="timurForm.n1"
                  :height="50"
                  placeholder="Скользящая средняя один"
                />
              </form-item>
            </v-col>
            <v-col cols="3">
              <form-item label="Скользящая средняя два">
                <flag-text-field
                  v-model="timurForm.n2"
                  :height="50"
                  placeholder="Скользящая средняя два"
                />
              </form-item>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </app-form-wrapper>

    <flag-dialog v-model="isSaveStratOpen" :width="300">
      <div class="pa-7">
        <app-form-wrapper ref="formWrapperModal">
          <template #default="{ isLoading }">
            <form-item label="Название стратегии">
              <flag-text-field
                v-model="saveStratName"
                class="mb-4"
                :height="50"
                placeholder="Название стратегии"
              />
            </form-item>
            <flag-btn
              color="primary"
              :loading="isLoading"
              block
              @click="saveStrat"
            >
              Сохранить
            </flag-btn>
          </template>
        </app-form-wrapper>
      </div>
    </flag-dialog>

    <flag-dialog v-model="isResultsTestingShow" :width="500">
      <div v-if="resultsTesting" class="pa-7">
        <div
          v-for="(item, value) in resultsTesting"
          :key="value"
          class="d-flex"
        >
          <div class="info-items">{{ value }} :</div>

          <div class="info-items">
            {{ item }}
          </div>
        </div>
        <!-- <pre>
          {{ resultsTesting }}
        </pre> -->
      </div>
    </flag-dialog>
  </div>
</template>

<script>
import shares from '../shares.json'
import FormItem from '@/modules/CRUD/components/FormItem.vue'
export default {
  components: {
    FormItem,
  },
  async asyncData({ $shares }) {
    // const shares = await $shares.index()
    // return {
    //   shares,
    // }
  },
  data() {
    return {
      shares,
      timurStratagisList: [
        {
          text: 'Скользящая средняя (Покупка если series1 только что пересекла (выше) series2)',
          value: 'cross',
          // меньшая пересекает сверху вниз большу покупаем
          // иначе продаем
        },
        {
          text: 'Скользящая средняя (покупаем всегда если series1 выше series2, на пересечении продаем)',
          value: 'signal',
          // меньшая пересекает снизу вверх большую покупаем
          // иначе продаем
        },
        {
          text: 'Flexible Custom strategy',
          value: 'simple',
        },
      ],
      saveStratName: '',
      isSaveStratOpen: false,
      isResultsTestingShow: false,
      resultsTesting: null,
      selectedFigi: null,
      timurForm: {
        strategy: 'cross',
        cash: 10000,
        date_after: '2022-01-01',
        date_before: '2022-04-01',
        colya: {
          procent: 0.02,
          minus_date_count: 2,
          plus_date_count: 1,
          plus_date_count_after_buy: 3,
          minus_date_count_after_buy: 1,
          day_for_buy: 1,
          day_for_sell: 1,
          down_procent: 0.1,
          max_hold_days: 12,
          balance_procent: 0.1,
        },

        close_kwargs: {
          portion: null,
        },

        buy_kwargs: {
          size: null,
          limit: null,
          stop: null,
          sl: null,
          tp: null,
        },
        sell_kwargs: {
          size: null,
          limit: null,
          stop: null,
          sl: null,
          tp: null,
        },
        n1: 10,
        n2: 20,
      },
    }
  },
  computed: {
    innerRules() {
      const rules = []

      const validateFn = (value) => {
        if (!value) return 'Заполните поле'

        return true
      }
      rules.push(validateFn)

      return rules
    },
  },
  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.ticker.toLowerCase()
      const textTwo = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.includes(searchText) || textTwo.includes(searchText)
    },

    async someTrade(event, needData = false) {
      const isValid = this.$refs.form.validate()
      if (!isValid) return
      let copy = JSON.parse(JSON.stringify(this.timurForm))
      //   copy.buy_kwargs = {}
      //   copy.sell_kwargs = {}

      if (this.timurForm.strategy !== 'simple') {
        delete copy.colya
      } else {
        const clearCopyCola = {}
        for (const [key, value] of Object.entries(copy.colya)) {
          clearCopyCola[key] = Number.parseFloat(value)
        }

        copy = {
          ...copy,
          ...clearCopyCola,
        }
        delete copy.colya
      }
      const clearBuy = {}
      const clearSell = {}
      const clearCloseTrade = {}

      for (const [key, value] of Object.entries(copy.buy_kwargs)) {
        if (value === 0 || value) {
          clearBuy[key] = Number.parseFloat(value)
        }
      }

      for (const [key, value] of Object.entries(copy.sell_kwargs)) {
        if (value === 0 || value) {
          clearSell[key] = Number.parseFloat(value)
        }
      }

      for (const [key, value] of Object.entries(copy.close_kwargs)) {
        if (value === 0 || value) {
          clearCloseTrade[key] = Number.parseFloat(value)
        }
      }

      if (!copy.close_kwargs.portion) {
        delete copy.close_kwargs
      }

      if (needData) {
        return {
          ...copy,
          buy_kwargs: clearBuy,
          sell_kwargs: clearSell,
          close_kwargs: clearCloseTrade,
          figi: this.selectedFigi,
        }
      }

      const res = await this.$refs.formWrapper.makeRequest(
        async () =>
          await this.$trade.test_strategy({
            ...copy,
            buy_kwargs: clearBuy,
            sell_kwargs: clearSell,
            close_kwargs: clearCloseTrade,
            figi: this.selectedFigi,
          })
      )
      if (res) {
        this.isResultsTestingShow = true

        this.resultsTesting = res

        window.open(
          res.link.replace(
            'http://localhost:3000',
            'https://backtesting-backend.herokuapp.com/api/test_strategy/'
          ),
          '_blank'
        )
      }
    },
    onSaveStratBtnClick() {
      this.isSaveStratOpen = true
    },
    async saveStrat() {
      const isValid = this.$refs.form.validate()
      if (!isValid) return
      const stratMetaData = await this.someTrade(null, true)

      const res = await this.$refs.formWrapperModal.makeRequest(
        async () =>
          await this.$history.save_strategy({
            name: this.saveStratName,
            input_values: {
              ...stratMetaData,
            },
          })
      )
      if (res) {
        this.isSaveStratOpen = false
      }

      // this.saveStratName =
    },
  },
}

/*

{
	"Start": "2022-01-03T04:00:00Z",
	"End": "2022-04-01T04:00:00Z",
	"Duration": "7603200.0",
	"Exposure Time [%]": 28.8135593220339,
	"Equity Final [$]": 9395.2,
	"Equity Peak [$]": 10151.2,
	"Return [%]": -6.047999999999993,
	"Buy & Hold Return [%]": 13.513513513513514,
	"Return (Ann.) [%]": -23.391563160194885,
	"Volatility (Ann.) [%]": 15.224519863680557,
	"Sharpe Ratio": 0,
	"Sortino Ratio": 0,
	"Calmar Ratio": 0,
	"Max. Drawdown [%]": -9.929860509102372,
	"Avg. Drawdown [%]": -6.7289302545511855,
	"Max. Drawdown Duration": "1555200.0",
	"Avg. Drawdown Duration": "864000.0",
	"# Trades": null,
	"Win Rate [%]": 0,
	"Best Trade [%]": -6.060606060606055,
	"Worst Trade [%]": -6.060606060606055,
	"Avg. Trade [%]": -6.060606060606055,
	"Max. Trade Duration": "1900800.0",
	"Avg. Trade Duration": "1900800.0",
	"Profit Factor": 0,
	"Expectancy [%]": -6.060606060606055,
	"link": "http://localhost:3000/media/htmls/1648953635.951942.html"
}

*/
</script>

<style lang="scss" scoped>
.in-text-input {
  display: inline;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 100px;
}

// .cancel-word-wrpap {
//   white-space: initial !important;
// }
.text-wrapper {
  display: flex;
  font-size: 16px;
  line-height: 30px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;

  //   white-space: nowrap;
}
.info-items {
  width: 50%;
}
.select-start {
  max-width: 400px;
}
</style>
