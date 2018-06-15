<template>
 <div>


<h2>Выберите транспорт</h2>

<div>
  <select @change="selectCarHandler" v-model="selected">
    <option v-for="sld in slider" :key="sld.value" :value="sld.value">{{sld.text}}</option>
  </select>

  <h2>Количество пассажиров:</h2>

  <div class="row  justify-content-md-center">
    <div class="col col-lg-6 center">
      <b>сидячих:</b>



      <div>
        <input type="range"
            v-model="passagers"
            :min="1" :max="max_sit" step="1">

    <vue-slider  v-model="passagers"
      :lazy="tr_ue" :piecewise="tr_ue" tooltip="always"
      :min="1" :max="slider[selected].mesta.sitdown" :dotSize="20">
    </vue-slider>

        <span class="range-slider__value">{{passagers}}</span>
      </div>




    </div>
    <div class="col col-lg-6 center" v-if="slider[selected].mesta.standup>0">
      <b class="bold">стоячих:</b>

      <div>
        <input type="range"
          v-model="passagers_stand"
          :min="0" :max="max_stand" step="1">

    <vue-slider  v-model="passagers_stand"
      :lazy="tr_ue" :piecewise="tr_ue" tooltip="always"
      :min="0" :max="slider[selected].mesta.standup" :dotSize="20">
   </vue-slider>


        <span>{{passagers_stand}}</span>
      </div>





    </div>
  </div>

 </div>


   <div class="row">
    <div class="col-6">
      <b class="bold">Телефон</b>
      <input class="form-control" type="tel" placeholder="+79685555555" v-model="tel">
    </div>
  </div>


  <div v-if="distance_val"  class="row">
    <div class="col-12">
      <p ><b>Дистанция: </b> {{distance_text}}  ({{distance_val}}) метров</p>
      <p><b>Время с учетом текущих пробок:</b> {{durationInTraffic_text}} ({{durationInTraffic_val}} сек)</p>
      <p><b>Время в среднем:</b> {{duration_text}} ({{duration_val}} сек)</p>
    </div>
    <div class="col-12">
    <p><b>Куда:</b> {{firstGeoObject}} </p>
    <p><b>Откуда:</b> {{secontGeoObject}}</p>
    <a target="_blank" :href="'https://yandex.ru/maps?mode=routes&rtext='+x1+'%2C'+y1+'~'+x2+'%2C'+y2">Посмотреть на яндексе</a>
    <p><b>Стоимость:</b> {{price}} руб.</p>
    </div>
  </div>


</div>
</template>

<script>
import vueSlider from 'vue-slider-component';

export default {
  components: {
    vueSlider
  },
  name: 'forma',
  data () {
    return {
        tr_ue: true,
        value: 1,
        min: 1,
        max:10,
        slider: [
        {
          value: "0",
          text: "BMW 5 SERIES",
          mesta: {sitdown: 4, standup: 0}
        },
        {
          value: "1",
          text: "Mercedes-Benz Viano",
          mesta: {sitdown: 4, standup: 0}
        },
        {
          value: "2",
          text: "Hyundai County",
          mesta: {sitdown: 15, standup: 20}
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

    price:0,
    distance_val: '',
    durationInTraffic_val: '',
    duration_val:'',
    distance_text: '',
    durationInTraffic_text: '',
    duration_text:'',
    x1:'',y1:'',x2:'',y2:'',
    firstGeoObject:'',
    secontGeoObject:''
    }
  },
  methods: {
      selectCarHandler(e){
        this.max_stand  = this.slider[this.selected].mesta.standup;
        this.max_sit    = this.slider[this.selected].mesta.sitdown
        this.passagers =       this.passagers      >this.slider[this.selected].mesta.sitdown?this.slider[this.selected].mesta.sitdown:this.passagers;
        this.passagers_stand = this.passagers_stand>this.slider[this.selected].mesta.standup?this.slider[this.selected].mesta.standup:this.passagers_stand;
      }
    }
}
</script>

<style>
  select:hover{cursor:pointer} select {border: 1px dashed black;}
  .center{text-align:center}
  input[type=range] {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    height: 25px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
}

/* Mouse-over effects */
input[type=range]:hover {
    opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
}

input[type=range]::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #4CAF50; /* Green background */
    cursor: pointer; /* Cursor on hover */
}
</style>
