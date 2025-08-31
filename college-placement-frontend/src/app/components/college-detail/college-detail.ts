import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CollegeService } from '../../services/college.service';
import { College } from '../../models/college.model';

@Component({
  selector: 'app-college-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './college-detail.html',
})
export class CollegeDetailComponent implements OnInit {
  college: College | null = null;
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
        this.error = 'Failed to load college details.';
        this.loading = false;
      },
    });
  }

  deleteCollege(): void {
    if (
      this.college &&
      confirm('Are you sure you want to delete this college?')
    ) {
      this.collegeService.deleteCollege(this.college.id!).subscribe({
        next: () => {
          this.router.navigate(['/colleges']);
        },
        error: (error) => {
          console.error('Error deleting college:', error);
          this.error = 'Failed to delete college. Please try again.';
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/colleges']);
  }
}
