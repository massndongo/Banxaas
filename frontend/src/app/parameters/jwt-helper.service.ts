import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import  jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

  constructor(localStorage: LocalStorageService) { }


  helper = new JwtHelperService();
  decodedToken!: { [key: string]: string; };
  // tslint:disable-next-line: typedef
  setToken(key: string, token: string){
    localStorage.setItem('token', token);
    localStorage.removeItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  decodeToken(jwtToken: string){
    if (jwtToken) {
      return jwt_decode(jwtToken);
    }
  }

  getUserRole(token: string){
    this.decodeToken = jwt_decode(token);
    return this.decodedToken ;
  }

  getExpiryTime(jwtToken: string): boolean{
    const expiryTime: any = this.helper.getTokenExpirationDate(jwtToken);
    if (expiryTime) {
      // return true si inférieur à 5 secondes
      return (expiryTime.getTime() - (new Date()).getTime()) < 50000;
    }
    return false;
  }

  isTokenExpired(jwtToken: string): boolean{
    if (jwtToken) {
      return this.helper.isTokenExpired(jwtToken);
    }
    return false;
  }
}