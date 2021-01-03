import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import { UserService } from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { min } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
  title = 'BookFriends';
  public user: User;
  public user_register: User;
  showModalLogin: boolean;
  showModalRegister : boolean;
  public identity;
  public token;
  public url;
  


  constructor(
    private _userService: UserService,
    private _router: Router,
  ){
    this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    //console.log(this.identity);
    //console.log(this.token);
  }
  onSubmit() {
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;
        //console.log(this.identity)
        if(!this.identity._id){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario no se identificado correctamente!',
          })
        }else{
          //Crear elemento en el localstorage para tener al usuario en sesion
          localStorage.setItem('identity', JSON.stringify(identity));
          //Conseguir el token para enviarselo a cada peticion http
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;
              if(this.token.length <= 0){
                alert("El token no se ha generado correctamente");
              }else{
                //Crear elemento en el localstorage para tener el token
                localStorage.setItem('token', token);
                Swal.fire({
                  position: 'top',
                  title: 'Bienvenido! '+ this.identity.name + ' ' + this.identity.surname,
                  showConfirmButton: false,
                  timer: 1000
                });
                this.user = new User('','','','','','ROLE_USER','');
              }
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario no ha podido logearse!',
              })
            });
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verifique sus datos e intente de nuevo!'
        })
      }
    );
  }
  
  onSubmitRegister(){
    //console.log(this.user_register);
  
    if(this.user_register.name === '' || this.user_register.surname === '' || this.user_register.email === '' || this.user_register.password === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops... Algo salio mal',
        text: 'Complete todos sus datos!',
      })
    }else{
    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;
  
        if(!user._id){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario no ha podido registrarse!',
          })
        }else{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El registro se ha realizado correctamente',
              text: 'Logeate con: ' + this.user_register.email,
              showConfirmButton: true,
              timer: 6000
            })
            this.user_register = new User('','','','','','ROLE_USER','');
          }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops... Algo salio mal',
          text: 'Verifique sus datos!',
        })
      }
    );
  }
  }
  
  logout(){
    console.log('Funcion logout')
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }
  showLogin()
  {
    this.showModalLogin = true; //Mostrar modal
    
  }
  hideLogin()
  {
    this.showModalLogin = false; //Ocultar modal
  }
  showRegister(){
    this.showModalRegister = true;
  }
  hideRegister(){
    this.showModalRegister = false;
  }

}
