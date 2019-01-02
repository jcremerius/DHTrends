import {Component, NgModule, OnChanges, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as d3 from 'd3';
import {filter} from 'rxjs/operators';

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
    var csvPromise = d3.csv("/assets/AllData.csv", data => {
      this.allData.push(data);
    });
    csvPromise.then(() => {
      console.log(this.allData[0]);
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

  changedSuburbs() {
    console.log("Changed");
    console.log(this.allData[0].checked)
    var selectedSuburbs = this.allData.filter(element => element.checked == true);
    console.log(selectedSuburbs);
  }
  ngOnInit() {
    this.readfromcsv();

  }


}
