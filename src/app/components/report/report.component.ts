import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @ViewChild('testresult', { static: false })divReport: ElementRef<any>;
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

  generateReportPDF(){
    const doc = new jsPDF();
    doc.setDocumentProperties({title:"Automatic Test Report",author:"Arth Panchani"});

    // Summary
    doc.setFontSize(20);
    doc.setFont("Helvetica","","bold");
    doc.text("Automatic Tests Report Summary",30,30);
    doc.setFontSize(12);
    doc.setFont("Helvetica","","normal");
    let totaltests=0;
    let passedtests=0;
    let failedtests=0;
    for (let index = 1; index < 10; index++) {
      let tmpt = 'this.test'+index+'Data.stats.asserts';
      let tmpp = 'this.test'+index+'Data.stats.passes';
      let tmpf = 'this.test'+index+'Data.stats.failures';
      totaltests = totaltests + eval(tmpt);
      passedtests = passedtests + eval(tmpp);
      failedtests = failedtests + eval(tmpf);
    }
    doc.text("Date stamp :  "+this.dateReport.date,30,60);
    doc.text("Branch Reference :  "+this.dateReport.branch,30,70);
    doc.text("Total Tests :  "+totaltests,30,80);
    doc.text("Passed Tests :  "+passedtests,30,90);
    doc.text("Failed Tests :  "+failedtests,30,100);

    // FileType1
    let data=this.test1Data.asserts;
    data.forEach(function(obj){
      obj.number=obj.number.toString();
      obj.ok=obj.ok.toString();
      delete obj.comment;
      delete obj.extra;
    }
    );
    doc.insertPage(2);
    doc.setFontSize(12);
    doc.setFont("Helvetica","","bold");
    doc.text("Test Result :: File Type 1",30,10);
    doc.setFontSize(10);
    doc.setFont("Helvetica","","normal");
    doc.text("Total Tests: "+this.test1Data.stats.asserts,30,15);
    doc.text("Successful Tests: "+this.test1Data.stats.passes,30,20);
    doc.text("Failed Tests: "+this.test1Data.stats.failures,30,25);
    doc.table(30,40,data,[{name:"number",width:20,align:"left",padding:2,prompt:""},{name:"name",width:150,align:"left",padding:2,prompt:""},{name:"ok",width:20,align:"left",padding:2,prompt:""}],{printHeaders:true,fontSize:10});

    // Filetype2
    data=this.test2Data.asserts;
    data.forEach(function(obj){
      obj.number=obj.number.toString();
      obj.ok=obj.ok.toString();
      delete obj.comment;
      delete obj.extra;
    }
    );
    doc.insertPage(4);
    doc.setFontSize(12);
    doc.setFont("Helvetica","","bold");
    doc.text("Test Result :: File Type 2",30,10);
    doc.setFontSize(10);
    doc.setFont("Helvetica","","normal");
    doc.text("Total Tests: "+this.test2Data.stats.asserts,30,15);
    doc.text("Successful Tests: "+this.test2Data.stats.passes,30,20);
    doc.text("Failed Tests: "+this.test2Data.stats.failures,30,25);
    doc.table(30,40,data,[{name:"number",width:20,align:"left",padding:2,prompt:""},{name:"name",width:150,align:"left",padding:2,prompt:""},{name:"ok",width:20,align:"left",padding:2,prompt:""}],{printHeaders:true,fontSize:10});

    // Filetype3
    data=this.test3Data.asserts;
    data.forEach(function(obj){
      obj.number=obj.number.toString();
      obj.ok=obj.ok.toString();
      delete obj.comment;
      delete obj.extra;
    }
    );
    doc.insertPage(6);
    doc.setFontSize(12);
    doc.setFont("Helvetica","","bold");
    doc.text("Test Result :: File Type 3",30,10);
    doc.setFontSize(10);
    doc.setFont("Helvetica","","normal");
    doc.text("Total Tests: "+this.test3Data.stats.asserts,30,15);
    doc.text("Successful Tests: "+this.test3Data.stats.passes,30,20);
    doc.text("Failed Tests: "+this.test3Data.stats.failures,30,25);
    doc.table(30,40,data,[{name:"number",width:20,align:"left",padding:2,prompt:""},{name:"name",width:150,align:"left",padding:2,prompt:""},{name:"ok",width:20,align:"left",padding:2,prompt:""}],{printHeaders:true,fontSize:10});

    // Filetype4
    data=this.test4Data.asserts;
    data.forEach(function(obj){
      obj.number=obj.number.toString();
      obj.ok=obj.ok.toString();
      delete obj.comment;
      delete obj.extra;
    }
    );
    doc.insertPage(8);
    doc.setFontSize(12);
    doc.setFont("Helvetica","","bold");
    doc.text("Test Result :: File Type 4",30,10);
    doc.setFontSize(10);
    doc.setFont("Helvetica","","normal");
    doc.text("Total Tests: "+this.test4Data.stats.asserts,30,15);
    doc.text("Successful Tests: "+this.test4Data.stats.passes,30,20);
    doc.text("Failed Tests: "+this.test4Data.stats.failures,30,25);
    doc.table(30,40,data,[{name:"number",width:20,align:"left",padding:2,prompt:""},{name:"name",width:150,align:"left",padding:2,prompt:""},{name:"ok",width:20,align:"left",padding:2,prompt:""}],{printHeaders:true,fontSize:10});

    // Sudo
    data=this.test5Data.asserts;
    data.forEach(function(obj){
      obj.number=obj.number.toString();
      obj.ok=obj.ok.toString();
      delete obj.comment;
      delete obj.extra;
    }
    );
    doc.insertPage(10);
    doc.setFontSize(12);
    doc.setFont("Helvetica","","bold");
    doc.text("Test Result :: Sudo",30,10);
    doc.setFontSize(10);
    doc.setFont("Helvetica","","normal");
    doc.text("Total Tests: "+this.test5Data.stats.asserts,30,15);
    doc.text("Successful Tests: "+this.test5Data.stats.passes,30,20);
    doc.text("Failed Tests: "+this.test5Data.stats.failures,30,25);
    doc.table(30,40,data,[{name:"number",width:20,align:"left",padding:2,prompt:""},{name:"name",width:150,align:"left",padding:2,prompt:""},{name:"ok",width:20,align:"left",padding:2,prompt:""}],{printHeaders:true,fontSize:10});

    // Dated File
    data=this.test6Data.asserts;
    data.forEach(function(obj){
      obj.number=obj.number.toString();
      obj.ok=obj.ok.toString();
      delete obj.comment;
      delete obj.extra;
    }
    );
    doc.insertPage(11);
    doc.setFontSize(12);
    doc.setFont("Helvetica","","bold");
    doc.text("Test Result :: Dated File",30,10);
    doc.setFontSize(10);
    doc.setFont("Helvetica","","normal");
    doc.text("Total Tests: "+this.test6Data.stats.asserts,30,15);
    doc.text("Successful Tests: "+this.test6Data.stats.passes,30,20);
    doc.text("Failed Tests: "+this.test6Data.stats.failures,30,25);
    doc.table(30,40,data,[{name:"number",width:20,align:"left",padding:2,prompt:""},{name:"name",width:150,align:"left",padding:2,prompt:""},{name:"ok",width:20,align:"left",padding:2,prompt:""}],{printHeaders:true,fontSize:10});

    // Multiple Files
    data=this.test7Data.asserts;
    data.forEach(function(obj){
      obj.number=obj.number.toString();
      obj.ok=obj.ok.toString();
      delete obj.comment;
      delete obj.extra;
    }
    );
    doc.insertPage(12);
    doc.setFontSize(12);
    doc.setFont("Helvetica","","bold");
    doc.text("Test Result :: Multiple Files",30,10);
    doc.setFontSize(10);
    doc.setFont("Helvetica","","normal");
    doc.text("Total Tests: "+this.test7Data.stats.asserts,30,15);
    doc.text("Successful Tests: "+this.test7Data.stats.passes,30,20);
    doc.text("Failed Tests: "+this.test7Data.stats.failures,30,25);
    doc.table(30,40,data,[{name:"number",width:20,align:"left",padding:2,prompt:""},{name:"name",width:150,align:"left",padding:2,prompt:""},{name:"ok",width:20,align:"left",padding:2,prompt:""}],{printHeaders:true,fontSize:10});

    // Destination File Type
    data=this.test8Data.asserts;
    data.forEach(function(obj){
      obj.number=obj.number.toString();
      obj.ok=obj.ok.toString();
      delete obj.comment;
      delete obj.extra;
    }
    );
    doc.insertPage(13);
    doc.setFontSize(12);
    doc.setFont("Helvetica","","bold");
    doc.text("Test Result :: Destination File Types",30,10);
    doc.setFontSize(10);
    doc.setFont("Helvetica","","normal");
    doc.text("Total Tests: "+this.test8Data.stats.asserts,30,15);
    doc.text("Successful Tests: "+this.test8Data.stats.passes,30,20);
    doc.text("Failed Tests: "+this.test8Data.stats.failures,30,25);
    doc.table(30,40,data,[{name:"number",width:20,align:"left",padding:2,prompt:""},{name:"name",width:150,align:"left",padding:2,prompt:""},{name:"ok",width:20,align:"left",padding:2,prompt:""}],{printHeaders:true,fontSize:10});

    // Heartbeat
    data=this.test9Data.asserts;
    data.forEach(function(obj){
      obj.number=obj.number.toString();
      obj.ok=obj.ok.toString();
      delete obj.comment;
      delete obj.extra;
    }
    );
    doc.insertPage(14);
    doc.setFontSize(12);
    doc.setFont("Helvetica","","bold");
    doc.text("Test Result :: Heartbeat",30,10);
    doc.setFontSize(10);
    doc.setFont("Helvetica","","normal");
    doc.text("Total Tests: "+this.test9Data.stats.asserts,30,15);
    doc.text("Successful Tests: "+this.test9Data.stats.passes,30,20);
    doc.text("Failed Tests: "+this.test9Data.stats.failures,30,25);
    doc.table(30,40,data,[{name:"number",width:20,align:"left",padding:2,prompt:""},{name:"name",width:150,align:"left",padding:2,prompt:""},{name:"ok",width:20,align:"left",padding:2,prompt:""}],{printHeaders:true,fontSize:10});

    // Downloading PDF
    doc.save("test.pdf");
  }

}
