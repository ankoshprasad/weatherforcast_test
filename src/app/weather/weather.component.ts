import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from './../utilities/services/commonservice.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  getWeathertData: any;
  city: any;
  temp: number;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  weatherStatus: string;
  weatherStatus1: string;
  weatherStatus2: string;
  weatherStatus3: string;
  weatherStatus4: string;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  list: any[] = [];
  bMessage: boolean = true;
  country: any;
  clear: boolean = false;
  lMessage: boolean = true;
  wheathermain: string;
  errorMessage: boolean = false;
  date1: number;
  date2: number;
  date3: number;
  date4: number;
  date5: number;
  days1: any;
  days2: any;
  days3: any;
  days4: any;
  days5: any;
  selectedIndex: string;
  event:string;

  constructor(private commonserviceService: CommonserviceService) { }

  ngOnInit() {
    let date1 = new Date();
    date1.getDate();
    this.date1 = date1.getDate();
    this.date2 = this.date1 + 1;
    this.date3 = this.date2 + 1;
    this.date4 = this.date3 + 1;
    this.date5 = this.date4 + 1;
  }

  /*To add the list */
  addList(capital) {
    this.selectedIndex = null;
    if (capital == 'MOSCOW' || capital == 'LONDON' || capital == 'BRASILIA' || capital == 'TOKYO' || capital == 'NEW DELHI' || capital == 'KATHMANDU' || capital == 'PARIS' || capital == 'THIMPHU' || capital == 'JAKARTA') {
      if (this.list.indexOf(capital) === -1) {
        this.list.unshift(capital);
      }
      this.lMessage = false;
      console.log(this.list.length);
      if (this.list.length > 8) {
        this.list.pop();
      }
    }
    else {
      this.errorMessage = true;

    }
    console.log(this.list);
    this.country = '';
    if (this.list.length > 1) {
      this.clear = true;
    }

  }

  addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
 }
 
  /* Delete the individual list */
  listcc(city) {
    if(city == this.event){
      this.bMessage = true;
    }
    if (this.list.length < 1) {
      this.lMessage = true;
    }
    if (this.list.length < 2) {
      this.clear = false;
    }
  }

  /* To get city value on click on the list */
  getCity(event) {
    this.event =  event;
    let options = { weekday: 'short' };
    this.days1 = new Date().toLocaleString('en-US',options);
    this.days2 = this.addDays(new Date(), 1).toLocaleString('en-US',options);
    this.days3 = this.addDays(new Date(), 2).toLocaleString('en-US',options);
    this.days4 = this.addDays(new Date(), 3).toLocaleString('en-US',options);
    this.days5 = this.addDays(new Date(), 4).toLocaleString('en-US',options);
    this.commonserviceService.getData(event).subscribe(getListData => {
      this.bMessage = false;
      this.getWeathertData = getListData.json();
      
      this.city = this.getWeathertData.city.name;
      this.temp = this.getWeathertData.list[0].temp.day;
      this.temp = this.temp / 10;
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
      this.tue = this.tue / 10;
      this.wed = this.getWeathertData.list[2].temp.day;
      this.wed = this.wed / 10;
      this.thu = this.getWeathertData.list[3].temp.day;
      this.thu = this.thu / 10;
      this.fri = this.getWeathertData.list[4].temp.day;
      this.fri = this.fri / 10;
    },
      (error) => {
        //  alert('No data');
      }
    );
  }

  /* Clear list */
  clearall() {
    this.list = [];
    this.clear = false;
    this.lMessage = true;
    this.bMessage = true;
  }

  /* Hide modal */
  okHide() {
    this.errorMessage = false;
  }

  /* Adding active class on list */

  setIndex(city) {
    this.selectedIndex = city;
  }
}
