import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AddContractDialogComponent } from '../add-contract-dialog/add-contract-dialog.component';

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
  styleUrls: ['./client-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  displayedColumns: string[] = ['id', 'name', 'cpfCnpj', 'phone', 'status', 'actions'];
  contractColumns: string[] = ['contractNumber', 'contractDate', 'value', 'status', 'actions'];
  expandedElement: Client | null = null;
  filteredClients: Client[] = [];
  selectedStatus: string = '';

  constructor(
    private clientService: ClientService,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      data => {
        this.clients = data;
        this.filteredClients = data;
      },
      error => this.notificationService.showError('Failed to load clients')
    );
  }

  applyFilter(): void {
    if (this.selectedStatus) {
      this.filteredClients = this.clients.filter(client => 
        client.contracts.some(contract => contract.status === this.selectedStatus)
      );
    } else {
      this.filteredClients = this.clients;
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

  cancelContract(contractId: number): void {
    this.clientService.cancelContract(contractId).subscribe(
      () => {
        this.notificationService.showSuccess('Contract cancelled successfully');
        this.loadClients();
      },
      error => {
        const message = error?.error?.message || error.statusText
        this.notificationService.showError(`Failed to cancel contract. ${error.message}`)
      }
    );
  }

  openAddContractDialog(clientId: number): void {
    const dialogRef = this.dialog.open(AddContractDialogComponent, {
      width: '400px',
      data: { clientId: clientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.addContract(result).subscribe(
          () => {
            this.notificationService.showSuccess('Contract added successfully');
            this.loadClients();
          },
          error => this.notificationService.showError('Failed to add contract')
        );
      }
    });
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

  toggleExpand(client: Client): void {
    this.expandedElement = this.expandedElement === client ? null : client;
  }
}
