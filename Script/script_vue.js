Vue.component('v-select', VueSelect.VueSelect)
Vue.use(VueMask.VueMaskPlugin);

var v = new Vue({
  template: `
 <div style="text-align:center">


<div>

  <div class="row  justify-content-md-center">

    <div class="form-group col-md-6">
      <label for="exampleFormControlSelect1">Выберите транспорт</label>
      <select @change="selectCarHandler" v-model="selected" class="form-control" id="exampleFormControlSelect1">
          <option v-for="sld in slider" :key="sld.value" :value="sld.value">{{sld.text}}</option>
      </select>
    </div>

    <div class="form-group col-md-6">
      <label for="exampleFormControlInput1">Введите телефон</label>
      <input type="tel" class="form-control" id="exampleFormControlInput1" v-mask="'+7(###)-###-####'" placeholder="+7(___)-___-____" v-model="tel">
    </div>
  </div>

  <h3>Количество пассажиров:</h3>

  <div class="row  justify-content-md-center">
    <div class="col col-lg-6 center">
      <b>сидячих:</b>

      <div>
        <input type="range"
            v-model="passagers"
            :min="1" :max="max_sit" step="1">


        <span class="range-slider__value">{{passagers}}</span>
      </div>




    </div>
    <div class="col col-lg-6 center" v-if="slider[selected].mesta.standup>0">
      <b class="bold">стоячих:</b>

      <div>
        <input type="range"
          v-model="passagers_stand"
          :min="0" :max="max_stand" step="1">


        <span>{{passagers_stand}}</span>
      </div>





    </div>
  </div>

 </div>





  <div v-if="distance_val"  class="row">
    <div class="col-12">
      <p ><b>Дистанция: </b> {{distance_text}}  ({{distance_val}} м.)</p>
      <p><b>Время с учетом текущих пробок:</b> {{durationInTraffic_text}} ({{durationInTraffic_val}} с.)</p>
      <p><b>Время в среднем:</b> {{duration_text}} ({{duration_val}} с.)</p>
    </div>
    <div class="col-12">
    <p><b>Откуда:</b> {{firstGeoObject}} </p>
    <p><b>Куда:</b> {{secontGeoObject}}</p>
    <a target="_blank" :href="'https://yandex.ru/maps?mode=routes&rtext='+x1+'%2C'+y1+'~'+x2+'%2C'+y2">Посмотреть на яндексе</a>
    <p style="font-size:33px" ><b>Стоимость:</b> {{price}} руб.</p>
    <button class="btn btn-danger">Заказать этот маршрут</button>
    </div>



  </div>

  <h3>Выберите адреса на карте</h3>

</div>`,
//'https://www.google.ru/maps/dir/55.785353,37.7515204/55.7723293,37.7573029"
  el: "#app",
  data: {
      mask: '##:##',
      placeholder: '23:45',
      inputVal: '',
           tr_ue: true,
        value: 1,
        min: 1,
        max:10,
        slider: [
        {
          value: "0",
          text: "BMW 5 SERIES",
          mesta: {sitdown: 4, standup: 0},
          min_cost: 600,
          deliv_tarif:30

        },
        {
          value: "1",
          text: "Mercedes-Benz Viano",
          mesta: {sitdown: 4, standup: 0},
          min_cost: 500,
          deliv_tarif:31
        },
        {
          value: "2",
          text: "Hyundai County",
          mesta: {sitdown: 15, standup: 20},
          min_cost: 700,
          deliv_tarif:25
        }
      ],
      kuda: '',
      otkuda: '',
      tel: '',
      selected: 0,
      passagers: 1,
      passagers_stand: 0,
      max_stand: 0,
      max_sit: 4,

    price: 0,
    min_cost: 500,
    deliv_tarif: 20,
    distance_val: '',
    durationInTraffic_val: '',
    duration_val:'',
    distance_text: '',
    durationInTraffic_text: '',
    duration_text:'',
    x1:'',y1:'',x2:'',y2:'',
    firstGeoObject:'',
    secontGeoObject:'',
    tel_val:"+7 (___) ___ ____"
    },
  methods: {
    passagersHandler(e) {
      this.passagers = e.target.value;
    },
    selectCarHandler(e){
        this.calculate_cost();
        this.max_stand  = this.slider[this.selected].mesta.standup;
        this.max_sit    = this.slider[this.selected].mesta.sitdown
        this.passagers =       this.passagers      >this.slider[this.selected].mesta.sitdown?this.slider[this.selected].mesta.sitdown:this.passagers;
        this.passagers_stand = this.passagers_stand>this.slider[this.selected].mesta.standup?this.slider[this.selected].mesta.standup:this.passagers_stand;
    },
    calculate_cost(){
          this.min_cost    =  this.slider[this.selected].min_cost
          this.deliv_tarif =  this.slider[this.selected].deliv_tarif
          var a = Math.round(Math.max( (this.distance_val / 1000) * this.deliv_tarif, this.min_cost));
          this.price = a>this.min_cost?a:this.min_cost;
    }

  }
});




