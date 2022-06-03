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
  test5Data:any;
  test6Data:any;
  test7Data:any;
  test8Data:any;
  test9Data:any;
  dateReport:any;
  testFlag=1;
  constructor(
    private http: HttpClient
  ) {
    this.http.get('https://batsreport.s3.ap-south-1.amazonaws.com/date.json').subscribe((res) => {
      this.dateReport = res;
      console.log('--- Date :: ',  this.dateReport);
    });
    this.http.get('https://batsreport.s3.ap-south-1.amazonaws.com/filetype1.json').subscribe((res) => {
      this.test1Data = res;
      this.testData = this.test1Data;
      console.log('--- result :: ',  this.test1Data);
    });
    this.http.get('https://batsreport.s3.ap-south-1.amazonaws.com/filetype2.json').subscribe((res) => {
      this.test2Data = res;
      console.log('--- result :: ',  this.test2Data);
    });
    this.http.get('https://batsreport.s3.ap-south-1.amazonaws.com/filetype3.json').subscribe((res) => {
      this.test3Data = res;
      console.log('--- result :: ',  this.test3Data);
    });
    this.http.get('https://batsreport.s3.ap-south-1.amazonaws.com/filetype4.json').subscribe((res) => {
      this.test4Data = res;
      console.log('--- result :: ',  this.test4Data);
    });
    this.http.get('https://batsreport.s3.ap-south-1.amazonaws.com/sudo.json').subscribe((res) => {
      this.test5Data = res;
      console.log('--- result :: ',  this.test5Data);
    });
    this.http.get('https://batsreport.s3.ap-south-1.amazonaws.com/datedfile.json').subscribe((res) => {
      this.test6Data = res;
      console.log('--- result :: ',  this.test6Data);
    });
    this.http.get('https://batsreport.s3.ap-south-1.amazonaws.com/multiple.json').subscribe((res) => {
      this.test7Data = res;
      console.log('--- result :: ',  this.test7Data);
    });
    this.http.get('https://batsreport.s3.ap-south-1.amazonaws.com/destfiletype.json').subscribe((res) => {
      this.test8Data = res;
      console.log('--- result :: ',  this.test8Data);
    });
    this.http.get('https://batsreport.s3.ap-south-1.amazonaws.com/heartbeat.json').subscribe((res) => {
      this.test9Data = res;
      console.log('--- result :: ',  this.test9Data);
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
