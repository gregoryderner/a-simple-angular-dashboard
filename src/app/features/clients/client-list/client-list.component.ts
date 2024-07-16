import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      data => this.clients = data,
      error => this.notificationService.showError('Failed to load clients')
    );
  }

  addClient(): void {
    this.router.navigate(['/clients/detail', 0]);
  }

  editClient(id: number): void {
    this.router.navigate(['/clients/detail', id]);
  }

  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(
      () => {
        this.notificationService.showSuccess('Client deleted successfully');
        this.loadClients();
      },
      error => this.notificationService.showError('Failed to delete client')
    );
  }
}
