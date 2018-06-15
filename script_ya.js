ymaps.ready(init);

function init() {
    // Стоимость за километр.
    var DELIVERY_TARIFF = 20,
        // Минимальная стоимость.
        MINIMUM_COST = 500;
       window.myMap =  myMap = new ymaps.Map('map', {
            center: [60.906882, 30.067233],
            zoom: 9,
            controls: []
        });
        // Создадим панель маршрутизации.
        var routePanelControl = new ymaps.control.RoutePanel({ options: { // Добавим заголовок панели.
                showHeader: true,title: 'Расчёт доставки'}
            }),
        zoomControl = new ymaps.control.ZoomControl({ options: {size: 'small',float: 'none',position: { bottom: 145, right: 10 } } });
    // Пользователь сможет построить только автомобильный маршрут.
    routePanelControl.routePanel.options.set({ types: {auto: true} });

    // Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
    /*routePanelControl.routePanel.state.set({
        fromEnabled: false,
        from: 'Москва, Льва Толстого 16'
     });*/

    myMap.controls.add(routePanelControl).add(zoomControl);

    // Получим ссылку на маршрут.
    routePanelControl.routePanel.getRouteAsync().then(function (route) {

        // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
        route.model.setParams({results: 1}, true);

        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', function () {

            var activeRoute = route.getActiveRoute();
            if (activeRoute) {
                // Получим протяженность маршрута.
                var rte = route.getActiveRoute();
                console.log('rte->', rte);
                console.log('rte.properties->', rte.properties);
               var rtedata = rte.properties._data;
                v._data.x1 = x1 = rtedata.boundedBy["0"]["0"]
                v._data.y1 = y1 = rtedata.boundedBy["0"][1]
                v._data.x2 = x2 = rtedata.boundedBy[1]["0"]
                v._data.y2 = y2 = rtedata.boundedBy[1]["1"]
                v.distance_text = rtedata.distance.text;
                v.distance_val = rtedata.distance.value;

                v.duration_text = rtedata.duration.text;
                v.duration_val = rtedata.duration.value;

                v.durationInTraffic_text = rtedata.durationInTraffic.text;
                v.durationInTraffic_val = rtedata.durationInTraffic.value;

                //getAddress([55.753994, 37.622093])

                var length = route.getActiveRoute().properties.get("distance");
                    // Вычислим стоимость доставки.
                var price = calculate(Math.round(length.value / 1000));
                v._data.price = price;
                    // Создадим макет содержимого балуна маршрута.
                var balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<span>Расстояние: ' + length.text + '.</span><br/>' +
                        '<span style="font-weight: bold; font-style: italic">Стоимость доставки: ' + price + ' р.</span>');
                // Зададим этот макет для содержимого балуна.
                route.options.set('routeBalloonContentLayout', balloonContentLayout);
                // Откроем балун.
                activeRoute.balloon.open();


                getAddress([x1, y1]);
                getAddress([x2, y2]);
            }
        });

    });
    // Функция, вычисляющая стоимость доставки.
    function calculate(routeLength) {
        console.log(routeLength);
        return Math.max(routeLength * DELIVERY_TARIFF, MINIMUM_COST);

    }
}



    function getAddress(coords) {

            ymaps.geocode(coords).then(function (res) {
                firstGeoObject = v._data.firstGeoObject = res.geoObjects.get(0).properties._data.text;
                secontGeoObject = v._data.secontGeoObject = res.geoObjects.get(1).properties._data.text;
                console.col('firstGeoObject=>', firstGeoObject, 'secontGeoObject=>', secontGeoObject);
            });

    }
