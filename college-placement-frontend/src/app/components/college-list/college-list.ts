import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollegeService } from '../../services/college.service';
import { College } from '../../models/college.model';

@Component({
  selector: 'app-college-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './college-list.html',
})
export class CollegeListComponent implements OnInit {
  colleges: College[] = [];
  loading = false;
  error = '';

  constructor(private collegeService: CollegeService) {}

  ngOnInit(): void {
    this.loadColleges();
  }

  loadColleges(): void {
    this.loading = true;
    this.collegeService.getAllColleges().subscribe({
      next: (data) => {
        this.colleges = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching colleges:', error);
        this.error = 'Failed to load colleges. Please try again.';
        this.loading = false;
      },
    });
  }

  deleteCollege(id: number): void {
    if (confirm('Are you sure you want to delete this college?')) {
      this.collegeService.deleteCollege(id).subscribe({
        next: () => {
          this.loadColleges(); // Reload the list
        },
        error: (error) => {
          console.error('Error deleting college:', error);
          this.error = 'Failed to delete college. Please try again.';
        },
      });
    }
  }

  getTotalStudents(): number {
    return this.colleges.reduce(
      (total, college) => total + (college.studentCount || 0),
      0
    );
  }

  getTotalDepartments(): number {
    return this.colleges.reduce(
      (total, college) => total + (college.totalDepartments || 0),
      0
    );
  }

  getCardClass(index: number): string {
    const classes = [
      'card-primary',
      'card-success',
      'card-warning',
      'card-danger',
      'card-info',
      'card-secondary',
    ];
    return classes[index % classes.length];
  }
}
