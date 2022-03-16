import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  testData:any;
  test1Data:any;
  test2Data:any;
  test3Data:any;
  test4Data:any;
  testFlag=1;
  constructor(
    private http: HttpClient
  ) {
    this.http.get('assets/test_tap/filetype1.json').subscribe((res) => {
      this.test1Data = res;
      this.testData = this.test1Data;
      console.log('--- result :: ',  this.test1Data);
    });
    this.http.get('assets/test_tap/filetype2.json').subscribe((res) => {
      this.test2Data = res;
      console.log('--- result :: ',  this.test2Data);
    });
    this.http.get('assets/test_tap/filetype3.json').subscribe((res) => {
      this.test3Data = res;
      console.log('--- result :: ',  this.test3Data);
    });
    this.http.get('assets/test_tap/filetype4.json').subscribe((res) => {
      this.test4Data = res;
      console.log('--- result :: ',  this.test4Data);
    });
  }

  ngOnInit(): void {

  }

  switchReport(flag:any){
    this.testFlag = flag;
    let temp='this.test'+flag+'Data'
    this.testData = eval(temp);
  }

}
