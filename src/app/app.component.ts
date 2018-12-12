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
  public Highcharts;
  public chartOptions;
  constructor() {
    this.allData = [];
  }


  readfromcsv() {
    var csvPromise = d3.csv("/assets/blub.csv", data => {
      this.allData.push(data);
    });
    csvPromise.then(() => {
      console.log(this.allData);
      console.log(this.allData[0]["Name"]);
      this.Highcharts = Highcharts;
      this.chartOptions = {
        chart: {
          renderTo: 'container',
          type: 'column'
        },
        title: {
          text:'New York'
        },
        xAxis:{
          categories: ["New York", "Manhatten"],
          title: {
            text: 'New York'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Count'
          }
        },
        series: [{name: 'AvgAge', data : [2,3]}, {name: 'AvgSmoker', data : [5,10]}]
      };
      });
    }




  ngOnInit() {
    this.readfromcsv();

  }




}
