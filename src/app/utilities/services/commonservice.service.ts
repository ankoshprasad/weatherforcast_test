import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
	providedIn: 'root'
})
export class CommonserviceService {

	constructor(private http: Http) { }

	getData(event) {
		let url = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+event+"&cnt=5&appid=c51223c219d6aec8cb8c5210449bd859";
		return this.http.get(url)
			.map(
				(res) => {
					let resData = res;
					return resData;

				}
			);
	}
}
