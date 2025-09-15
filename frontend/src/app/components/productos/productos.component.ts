import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: true, // Indica que es un componente independiente sin AppModule
  imports: [       
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  dataSource!: MatTableDataSource<Producto>;  // Fuente de datos para la tabla de Angular Material
  displayedColumns: string[] = ['id', 'nombre', 'cantidad', 'acciones'];
  form!: FormGroup;   // Formulario reactivo para agregar/editar productos
  searchTerm: string = '';    // Campo de búsqueda para filtrar la tabla

  // Referencias a paginador y ordenamiento de Angular Material
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductosService, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario con validaciones
    this.form = this.fb.group({
      id: [''],                                  // ID del producto (vacío para nuevos)
      nombre: ['', Validators.required],        // Nombre obligatorio
      cantidad: [0, [Validators.required, Validators.min(0)]] // Cantidad obligatoria, mínimo 0
    });

    // Cargar productos desde el backend al iniciar
    this.loadProductos();
  }

  /**
   * Carga los productos desde el backend y configura la tabla de Angular Material
   */
  loadProductos() {
    this.productService.getInventario().subscribe(data => {
      this.productos = data;
      this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * Filtra los productos en la tabla según el searchTerm
   */
  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  /**
   * Guarda un producto nuevo o actualiza uno existente
   */
  guardarProducto() {
    if (this.form.invalid) return; 

    const prod: Producto = this.form.value;

    if (prod.id) {
      // Actualizar producto existente
      this.productService.updateProducto(prod.id, prod).subscribe(() => {
        Swal.fire(
          '¡Actualizado!',
          'El producto ha sido actualizado.',
          'success'
        );
        this.loadProductos(); // Refrescar la tabla
      });
    } else {
      // Agregar producto nuevo
      const prodAdd: Partial<Producto> = { nombre: prod.nombre, cantidad: prod.cantidad };
      this.productService.addProducto(prodAdd).subscribe(() => {
        Swal.fire(
          '¡Agregado!',
          'El producto ha sido agregado.',
          'success'
        );
        this.loadProductos(); // Refrescar la tabla
      });
    }

    // Resetear formulario, dejando cantidad en 0 por defecto
    this.form.reset({ cantidad: 0 });
  }

  /**
   * Llena el formulario con los datos del producto seleccionado para editar
   * @param p Producto a editar
   */
  editarProducto(p: Producto) {
    this.form.setValue({ id: p.id, nombre: p.nombre, cantidad: p.cantidad });
  }

  /**
   * Elimina un producto después de confirmar con SweetAlert
   * @param id ID del producto a eliminar
   */
  eliminarProducto(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProducto(id).subscribe(() => {
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          );
          this.loadProductos(); // Refrescar la tabla
        });
      }
    });
  }

}
