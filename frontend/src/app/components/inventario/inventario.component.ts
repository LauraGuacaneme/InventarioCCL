import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductosService } from '../../services/producto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ]
})
export class InventarioComponent implements OnInit {
  productos: Producto[] = [];   // Lista de productos obtenidos del backend
  dataSource!: MatTableDataSource<Producto>;    // Fuente de datos para la tabla de Angular Material
  displayedColumns: string[] = ['id', 'nombre', 'cantidad'];
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductosService) {}

  ngOnInit(): void {
    this.productService.getInventario().subscribe(data => {
      this.productos = data;
      this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
}
