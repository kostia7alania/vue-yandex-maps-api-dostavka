Vue.component('v-select', VueSelect.VueSelect)
    
var v = new Vue({
    template: `
<div> 
        

<p class="bold"> Выберите транспорт</p>  

<div>
  <select @change="selectCarHandler" v-model="selected">
    <option v-for="sld in slider" :value="sld.value">{{sld.name}}</option>
  </select>

  <h2>Количество пассажиров:</h2>

  <div class="row  justify-content-md-center">
    <div class="col col-lg-2 center">
      <b class="bold">сидячих:</b>
      <div class="range-slider">
        <input class="range-slider__range" type="range" 
            v-model="passagers" 
            :min="1" :max="max_sit" step="1">
        <span class="range-slider__value">{{passagers}}</span>
      </div>
    </div>
    <div class="col col-lg-2x center" v-if="slider[selected].mesta.standup>0">
      <b class="bold">стоячих:</b>
      <div class="range-slider">
        <input class="range-slider__range" type="range" 
          v-model="passagers_stand" 
          :min="0" :max="max_stand" step="1">
        <span class="range-slider__value">{{passagers_stand}}</span>
      </div>
    </div>
  </div>

 </div>


   <div class="row">
    <div class="col-4">
      <b class="bold">Телефон</b>
      <input class="form-control" type="tel" placeholder="+79685555555" v-model="tel"> 
    </div>
    <div class="col-4">
      <b>Откуда</b>
      <input type="text" class="form-control" v-model="otkuda" placeholder="Откуда"> 
    </div>
    <div class="col-4">  
      <b>Куда</b>
      <input type="text" class="form-control" v-model="kuda" placeholder="Куда"> 
    </div> 
  </div>
</div>`,
    el: '#app',
    data: {
      slider: [
        {
          value: "0",
          name: "BMW 5 SERIES",
          mesta: {sitdown: 4, standup: 0} 
        },
        {
          value: "1",
          name: "Mercedes-Benz Viano",
          mesta: {sitdown: 4, standup: 0} 
        },
        { 
          value: "2",
          name: "Hyundai County",
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
      max_sit: 4
    },
    methods: {
      selectCarHandler(e){
        this.max_stand  = this.slider[this.selected].mesta.standup;
        this.max_sit    = this.slider[this.selected].mesta.sitdown
        this.passagers = this.passagers>this.slider[this.selected].mesta.sitdown? this.slider[this.selected].mesta.sitdown:this.passagers;
        this.passagers_stand = this.passagers>this.slider[this.selected].mesta.standup? this.slider[this.selected].mesta.standup:this.passagers_standup;
      }
    }
  })
 
  var mySlider = new Slider("input.slider", {
    
  });
