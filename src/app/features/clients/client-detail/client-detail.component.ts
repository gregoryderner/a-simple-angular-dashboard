import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  clientForm: FormGroup;
  clientId: number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.clientId !== 0) {
      this.loadClient();
    }
  }

  loadClient(): void {
    this.clientService.getClientById(this.clientId).subscribe(
      data => this.clientForm.patchValue(data),
      error => this.notificationService.showError('Failed to load client')
    );
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      if (this.clientId === 0) {
        this.clientService.addClient(this.clientForm.value).subscribe(
          () => {
            this.notificationService.showSuccess('Client added successfully');
            this.router.navigate(['/clients']);
          },
          error => this.notificationService.showError('Failed to add client')
        );
      } else {
        this.clientService.updateClient(this.clientId, this.clientForm.value).subscribe(
          () => {
            this.notificationService.showSuccess('Client updated successfully');
            this.router.navigate(['/clients']);
          },
          error => this.notificationService.showError('Failed to update client')
        );
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/clients']);
  }
}
