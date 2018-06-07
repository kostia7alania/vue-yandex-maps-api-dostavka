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

 

<div class="range-slider">
  <input class="range-slider__range" type="range" value="250" min="0" max="500" step="50">
  <span class="range-slider__value">0</span>
</div>


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

</div>`,
//'https://www.google.ru/maps/dir/55.785353,37.7515204/55.7723293,37.7573029"
  el: "#app",
  data: {
    sex: 1,
    pasdata: [
      {
        text: "один",
        value: 1
      },
      {
        text: "два",
        value: 2
      },
      {
        text: "три",
        value: 3
      },
      {
        text: "четыре",
        value: 4
      },
      {
        text: "пять",
        value: 5
      },
      {
        text: "шесть",
        value: 6
      }
    ], 
    price:0,
    passagers: 1,
    selected: 1,
    distance_val: '',
    durationInTraffic_val: '',
    duration_val:'',
    distance_text: '',
    durationInTraffic_text: '',
    duration_text:'',
    x1:'',y1:'',x2:'',y2:'',
    firstGeoObject:'',
    secontGeoObject:''
    },
  methods: {
    passagersHandler(e) {
      this.passagers = e.target.value;
    }
  }
});
 