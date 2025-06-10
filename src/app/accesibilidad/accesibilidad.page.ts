import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-accesibilidad',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './accesibilidad.page.html',
  styleUrls: ['./accesibilidad.page.scss'],
})
export class AccesibilidadPage implements OnInit {
  nombre = '';
  correo = '';
  mensaje = '';
  cedula = '';
  guardadoMensaje = ''; 

  constructor(private alertCtrl: AlertController) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'cedulaUsuario' });
    if (value) {
      this.cedula = value;
    }
  }

  async enviarFormulario() {
    if (this.nombre && this.correo && this.mensaje && this.cedula) {
    
      await Preferences.set({
        key: 'cedulaUsuario',
        value: this.cedula
      });

      this.guardadoMensaje = 'Tu mensaje ha sido enviado correctamente.';  
      const alert = await this.alertCtrl.create({
        header: 'Enviado',
        message: this.guardadoMensaje,
        buttons: ['OK']
      });

      await alert.present();

     
      this.nombre = '';
      this.correo = '';
      this.mensaje = '';

      
      setTimeout(() => {
        this.guardadoMensaje = '';
      }, 5000);

    } else {
      this.guardadoMensaje = 'Todos los campos son obligatorios.';  

      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: this.guardadoMensaje,
        buttons: ['OK']
      });

      await alert.present();

      
      setTimeout(() => {
        this.guardadoMensaje = '';
      }, 5000);
    }
  }
}
