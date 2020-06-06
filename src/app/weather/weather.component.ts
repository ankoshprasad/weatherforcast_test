import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from './../utilities/services/commonservice.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  getWeathertData: any;
  city:string;
  temp:number;
  windSpeed:number;
  windDeg:number;
  pressure:number;
  weatherStatus:string;
  weatherStatus1:string;
  weatherStatus2:string;
  weatherStatus3:string;
  weatherStatus4:string;
  tue:number;
  wed:number;
  thu:number;
  fri:number;
  list:any[] = [];
  bMessage:boolean = true;
  country:any;
  clear:boolean = false;
  lMessage:boolean = true;
  wheathermain:string;
  errorMessage:boolean = false;
  day1:number;
  day2:number;
  day3:number;
  day4:number;
  day5:number;

  constructor(private commonserviceService: CommonserviceService) { }

  ngOnInit() {
    let day1 = new Date();
    day1.getDate();
    this.day1 = day1.getDate();
    this.day2 = this.day1+1;
    this.day3 = this.day2+1;
    this.day4 = this.day3+1;
    this.day5 = this.day4+1;
    console.log(this.day1);
  }

  /*To add the list */
  addList(capital){
    if(capital == 'MOSCOW' || capital == 'LONDON' || capital == 'BRASILIA' || capital == 'TOKYO' || capital == 'NEW DELHI' || capital == 'KATHMANDU' || capital == 'PARIS' || capital == 'THIMPHU' || capital == 'JAKARTA'  ){
    this.list.push(capital);
    this.list.reverse();
    this.lMessage = false;
    console.log(this.list.length);
    if(this.list.length > 8){
      this.list.pop();
    }
    }
    else
    {
     this.errorMessage = true; 
     
    }
    console.log(this.list);
    this.country = '';
    if(this.list.length > 1){
    this.clear = true;
    }
    
  }

  listcc(){
    console.log(this.list.length);
    if(this.list.length < 2){
      this.clear = false;
      }
  }

  /* To get city value on click on the list */
  getCity(event){
  console.log(event);
  this.commonserviceService.getData(event).subscribe(getListData => {
    this.bMessage = false;
    this.getWeathertData = getListData.json();
    console.log(this.getWeathertData.list[0].weather[0].description);
    this.city = this.getWeathertData.city.name;
    this.temp = this.getWeathertData.list[0].temp.day;
    this.temp=this.temp/10;
    this.windSpeed = this.getWeathertData.list[0].speed;
    this.windDeg = this.getWeathertData.list[0].deg;
    this.pressure = this.getWeathertData.list[0].pressure;
    this.wheathermain = this.getWeathertData.list[0].weather[0].description;
    this.weatherStatus = this.getWeathertData.list[0].weather[0].main;
    this.weatherStatus1 = this.getWeathertData.list[1].weather[0].main;
    this.weatherStatus2 = this.getWeathertData.list[2].weather[0].main;
    this.weatherStatus3 = this.getWeathertData.list[3].weather[0].main;
    this.weatherStatus4 = this.getWeathertData.list[4].weather[0].main;
    this.tue = this.getWeathertData.list[1].temp.day;
    this.tue = this.tue/10;
    this.wed = this.getWeathertData.list[2].temp.day;
    this.wed = this.wed/10;
    this.thu = this.getWeathertData.list[3].temp.day;
    this.thu = this.thu/10;
    this.fri = this.getWeathertData.list[4].temp.day;
    this.fri = this.fri/10;
  },
    (error) => {
    //  alert('No data');
    }
  );
  }

  /* Clear list */
  clearall(){
    this.list = [];
    this.clear = false;
    this.lMessage = true;
    this.bMessage = true;
  }

  /* Hide modal */
  okHide(){
    this.errorMessage = false;
  }
}
