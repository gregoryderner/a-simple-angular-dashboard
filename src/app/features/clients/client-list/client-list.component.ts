import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { NotificationService } from '../../../core/services/notification.service';

interface Client {
  id: number;
  name: string;
  cpfCnpj: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  contracts: Contract[];
}

interface Contract {
  id: number;
  clientId: number;
  contractNumber: string;
  contractDate: string;
  value: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  displayedColumns: string[] = ['id', 'name', 'cpfCnpj', 'phone', 'status', 'actions'];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      data => this.clients = data,
      error => this.notificationService.showError('Failed to load clients')
    );
  }

  getStatusCounts(contracts: Contract[]): { [key: string]: number } {
    return contracts.reduce((acc, contract) => {
      acc[contract.status] = (acc[contract.status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  getBadgeColor(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'pending';
      case 'PAID':
        return 'paid';
      case 'CANCELLED':
        return 'cancelled';
      case 'LATE':
        return 'late';
      default:
        return 'pending';
    }
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
