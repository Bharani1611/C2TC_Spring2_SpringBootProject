import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { College } from '../models/college.model';

@Injectable({
  providedIn: 'root',
})
export class CollegeService {
  private apiUrl = 'http://localhost:8081/colleges';

  constructor(private http: HttpClient) {}

  getAllColleges(): Observable<College[]> {
    return this.http.get<College[]>(this.apiUrl);
  }

  getCollegeById(id: number): Observable<College> {
    return this.http.get<College>(`${this.apiUrl}/${id}`);
  }

  createCollege(college: College): Observable<College> {
    return this.http.post<College>(this.apiUrl, college);
  }

  updateCollege(id: number, college: College): Observable<College> {
    return this.http.put<College>(`${this.apiUrl}/${id}`, college);
  }

  deleteCollege(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
