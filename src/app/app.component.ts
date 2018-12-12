import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as d3 from 'd3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  public allData;
  constructor() {
    this.allData = [];
  }


  readfromcsv() {
    var csvPromise = d3.csv("/assets/blub.csv", data => {
      this.allData.push(data);
    });
    csvPromise.then(x => {
      console.log(this.allData);
      this.Highcharts = Highcharts;
      this.chartOptions = {
        "subtitle": { "text": "Highcharts chart" },
        "series": [{
          "type": "line",
          "data": [30,2,3]
        }, {
          "data": [5,6,7]
        }]
      };
    });

  }


  ngOnInit() {
    this.readfromcsv();

  }




}
