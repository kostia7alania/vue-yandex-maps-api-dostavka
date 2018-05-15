Vue.component('v-select', VueSelect.VueSelect)

var v = new Vue({
    template: `<div>
<p class="bold"> Выберите транспорт !{{sex}}</p>  
<select v-model="selected">
  <option selected value="1">BMW 5 SERIES</option>
  <option value="2">Mercedes-Benz Viano</option>
  <option value="3">Hyundai County</option>
</select>
  
  <br>
  <div v-if='selected==1'>
    
  <p class="bold">Количество пассажиров:</p>
  <div @click="passagersHandler" class="btn-group btn-group-md">
       <button v-if="pas.value<5"  v-for="pas in pasdata" type="button" 
          :class="{'btn-primary': pas.value==passagers}" 
          class="btn btn-default" 
          :value="pas.value">{{pas.text}}
      </button>  
  </div> 
    <br>  
   <div class="row">
     <div class="col-6"> 
      <b class="bold">Телефон</b>
    <input class="form-control" type="tel" value="+79685555555"> 
      </div>  
    </div>
    
  </div>

 <div v-if='selected==2'>
  
      
  <p class="bold">Количество пассажиров:</p>
  <div @click="passagersHandler" class="btn-group btn-group-md">
       <button v-for="pas in pasdata" type="button" 
          :class="{'btn-primary': pas.value==passagers}" 
          class="btn btn-default" 
          :value="pas.value">{{pas.text}}
      </button>  
  </div>  
   <div class="row">
     <div class="col-6"> 
      <b class="bold">Телефон</b>
    <input class="form-control" type="tel" value="+79685555555"> 
      </div>  
    </div> 
   
  </div>


 <div v-if='selected==3'> 
     
     <div class="row">
     <div class="col-12"> 
      <b class="bold">Коллиечство мест - сидячих</b>
      <input class="form-control" type="text" value="1"> 
      </div>  
    </div>   
  <div class="row">
     <div class="col-12"> 
      <b class="bold">Коллиечство мест - стоячих</b>
      <input class="form-control" type="text" value="1"> 
      </div>  
    </div>  
   <div class="row">
     <div class="col-6"> 
      <b class="bold">Телефон</b>
    <input class="form-control" type="tel" value="+79685555555"> 
      </div>  
    </div>  
   
  </div> 
   
  
<div class="row">
  <div class="col-6">
    <b>Откуда</b>
    <input type="text" class="form-control" placeholder="Откуда"> 
  </div>
  <div class="col-6">  
    <b >Куда</b>
    <input type="text" class="form-control" placeholder="Куда"> 
  </div> 
</div>
</div>`,
    el: '#app',
    data: {
        sex: 1,
        pasdata: [{
                text: 'один',
                value: 1
            },
            {
                text: 'два',
                value: 2
            },
            {
                text: 'три',
                value: 3
            },
            {
                text: 'четыре',
                value: 4
            },
            {
                text: 'пять',
                value: 5
            },
            {
                text: 'шесть',
                value: 6
            }
        ],
        passagers: 1,
        selected: 1
    },
    methods: {
        passagersHandler(e) {
            this.passagers = e.target.value;
        }
    }
})





ymaps.ready(init);

function init() {
    // Стоимость за километр.
    var DELIVERY_TARIFF = 20,
        // Минимальная стоимость.
        MINIMUM_COST = 500,
        myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 12,
            controls: []
        }),
        // Создадим панель маршрутизации.
        routePanelControl = new ymaps.control.RoutePanel({
            options: {
                // Добавим заголовок панели.
                showHeader: true,
                title: 'Расчёт доставки'
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({
            options: {
                size: 'small',
                float: 'none',
                position: {
                    bottom: 145,
                    right: 10
                }
            }
        });
    // Пользователь сможет построить только автомобильный маршрут.
    routePanelControl.routePanel.options.set({
        types: {
            auto: true
        }
    });

    // Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
    /*routePanelControl.routePanel.state.set({
        fromEnabled: false,
        from: 'Москва, Льва Толстого 16'
     });*/

    myMap.controls.add(routePanelControl).add(zoomControl);

    // Получим ссылку на маршрут.
    routePanelControl.routePanel.getRouteAsync().then(function (route) {

        // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
        route.model.setParams({
            results: 1
        }, true);

        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', function () {

            var activeRoute = route.getActiveRoute();
            if (activeRoute) {
                // Получим протяженность маршрута.
                v.sex = length.text;
                var length = route.getActiveRoute().properties.get("distance"),
                    // Вычислим стоимость доставки.
                    price = calculate(Math.round(length.value / 1000)),
                    // Создадим макет содержимого балуна маршрута.
                    balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<span>Расстояние: ' + length.text + '.</span><br/>' +
                        '<span style="font-weight: bold; font-style: italic">Стоимость доставки: ' + price + ' р.</span>');
                // Зададим этот макет для содержимого балуна.
                route.options.set('routeBalloonContentLayout', balloonContentLayout);
                // Откроем балун.
                activeRoute.balloon.open();
            }
        });

    });
    // Функция, вычисляющая стоимость доставки.
    function calculate(routeLength) {
        return Math.max(routeLength * DELIVERY_TARIFF, MINIMUM_COST);
    }
}