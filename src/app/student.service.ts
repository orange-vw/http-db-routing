import { Injectable } from '@angular/core';
import { Student } from './student';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  STUDENTS: Student[] = [];
  studentURL = "https://studentinfo-10am-d3a93-default-rtdb.firebaseio.com/"
  constructor(private router:Router, private http: HttpClient) {}

  addStudent(newStd: Student) {
    return this.http.post(this.studentURL + "student.json", newStd);
    //this.router.navigate(['/student-list'])//redirects to student-list component
  }

  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.studentURL + "student.json").pipe(map(
      responseData => {
        const studentArray: Student[] = [];
        for(let key in responseData)
          studentArray.push(responseData[key])
        return studentArray;
      }
    ));
  }

  deleteAll() {
    this.http.delete(this.studentURL + "student.json").subscribe()
  }
}
