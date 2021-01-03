import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {GLOBAL} from 'src/app/services/global';
import {User} from 'src/app/models/user';
import Swal from 'sweetalert2';
@Component({
selector: 'app-user-data',
templateUrl: './user-data.component.html',
styleUrls: ['./user-data.component.css'],
providers: [UserService]
})
export class UserDataComponent implements OnInit {
title = 'Mis datos'
public identity;
public token;
public url;
public user: User;
constructor(
    private _userService: UserService
) {
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.url = GLOBAL.url;
    this.user = this.identity;
}

ngOnInit(): void {
    console.log(this.user);
}
onSubmit(){
    console.log(this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                if(!response.user){
                    //this.alertMessage = 'El usuario no se ha actualizado'
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops... Algo salio mal',
                        text: 'Intentalo de nuevo!',
                    })
                }else{
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    document.getElementById("identity_name").innerHTML = this.user.name; //Modificar el nombre mostrado en el navbar al actualizar
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Datos actualizados correctamente!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    if(!this.filesToUpload){
                        //Redireccion
                    }else{
                        this.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload).then(
                            (result: any) => {
                                this.user.image = result.image;
                                localStorage.setItem('identity', JSON.stringify(this.user));
                                
                                let image_path = this.url + 'get-user-image/'+ this.user.image;
                                document.querySelector('#image-logged').setAttribute('src',image_path);
                            }
                        );
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Datos actualizados correctamente!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            },
            error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... Algo salio mal',
                    text: 'Intentalo de nuevo!',
                })
                }
        )
}
public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    makeFileRequest(url: string, params: Array<string>, files: Array<File>){
        var token = this.token;

        return new Promise(function(resolve, reject){
            var formData: any = new FormData;
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++){
                formData.append('image', files[i], files[i].name);
            }
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }

}
