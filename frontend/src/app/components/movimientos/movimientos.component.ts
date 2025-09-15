import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovimientosService } from '../../services/movimientos.service';
import { Producto } from '../../models/producto.model';
import { ProductosService } from '../../services/producto.service';
import { Movimiento } from '../../models/movimiento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class MovimientosComponent implements OnInit {
  form: FormGroup;
  productos: Producto[] = [];
  mensaje = '';

  constructor(
    private fb: FormBuilder,
    private movimientosService: MovimientosService,
    private productosService: ProductosService
  ) {
    // Inicializamos el formulario
    this.form = this.fb.group({
      productoId: [null, Validators.required],
      cantidad: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargar productos para el select
    this.cargarProductos();
  }

  
  cargarProductos(): void {
  this.productosService.getProductos().subscribe({
    next: (data) => this.productos = data,
    error: (err) => console.error(err)
  });
  }

  /**
   * Envía el movimiento al backend
   */
  enviarMovimiento(): void {
    if (this.form.invalid) return;

    const movimiento: Movimiento = {
      productoId: this.form.value.productoId,
      cantidad: this.form.value.cantidad
    };

    this.movimientosService.registrarMovimiento(movimiento).subscribe({
      next: (res) => {
        this.mensaje = `Movimiento registrado: ${res.producto.nombre}, cantidad actual: ${res.producto.cantidad}`;
        this.form.reset({ cantidad: 0 });
        this.cargarProductos();
      },
      error: (err) => {
        console.log(err.error);
        this.mensaje = `Error: ${err.error?.mensaje || 'No se pudo registrar el movimiento'}`;
      }
    });
  }

  // Botones para aumentar o disminuir cantidad
  aumentarCantidad() {
    const control = this.form.get('cantidad');
    if (control) control.setValue(control.value + 1);
  }

  disminuirCantidad() {
    const control = this.form.get('cantidad');
    if (control) control.setValue(control.value - 1);
  }
}
