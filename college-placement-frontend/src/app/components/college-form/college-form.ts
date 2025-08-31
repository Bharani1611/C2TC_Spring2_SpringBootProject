import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CollegeService } from '../../services/college.service';
import { College } from '../../models/college.model';

@Component({
  selector: 'app-college-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './college-form.html',
})
export class CollegeFormComponent implements OnInit {
  college: College = {
    name: '',
    location: '',
    dean: '',
    totalDepartments: 0,
    studentCount: 0,
    website: '',
  };

  isEditMode = false;
  loading = false;
  error = '';

  constructor(
    private collegeService: CollegeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadCollege(+id);
    }
  }

  loadCollege(id: number): void {
    this.loading = true;
    this.collegeService.getCollegeById(id).subscribe({
      next: (data) => {
        this.college = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching college:', error);
        this.error = 'Failed to load college data.';
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.loading = true;
      const operation = this.isEditMode
        ? this.collegeService.updateCollege(this.college.id!, this.college)
        : this.collegeService.createCollege(this.college);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/colleges']);
        },
        error: (error) => {
          console.error('Error saving college:', error);
          this.error = 'Failed to save college. Please try again.';
          this.loading = false;
        },
      });
    }
  }

  validateForm(): boolean {
    if (!this.college.name || !this.college.location || !this.college.dean) {
      this.error = 'Please fill in all required fields.';
      return false;
    }
    this.error = '';
    return true;
  }

  onCancel(): void {
    this.router.navigate(['/colleges']);
  }
}
