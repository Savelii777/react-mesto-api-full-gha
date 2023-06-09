class Api {
    constructor(options)
    {
        this._baseUrl = options.baseUrl;
        this._authorization = options.headers.authorization;

    }
    _checkResponseFromServer(res){
        if (res.ok) {
            return res.json();
          }
        console.log("sss")
          return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    getUserInfoFromServer(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers:{
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }

        })
        .then(this._checkResponseFromServer);   
    }

    getCardsFromServer(){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers:{
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponseFromServer);   
    }

    sendUserInfoToServer(userInfo) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers:{
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(this._checkResponseFromServer);   
      }


    sendUserAvatarToServer(avatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers:{
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avatar)})
            .then(this._checkResponseFromServer
            );
    }
      addNewCardToServer(cardInformation) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers:{
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardInformation)
        })
        .then(this._checkResponseFromServer);   
      }

    deleteCardFromServer(cardID){
        return fetch(`${this._baseUrl}/cards/`+cardID, {
            method: 'DELETE',
            headers:{
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponseFromServer);   
    }

    addLikeToServer(cardID){
        return fetch(`${this._baseUrl}/cards/`+cardID+'/likes', {
            method: 'PUT',
            headers:{
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponseFromServer);   
    }

    deleteLikeFromServer(cardID){
        return fetch(`${this._baseUrl}/cards/`+cardID+'/likes', {
            method: 'DELETE',
            headers:{
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponseFromServer);   
    }

}
export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-54',
    headers: {
      authorization: '3870d2ad-f528-4c2b-9e76-5a8a9ac5c376',
      'Content-Type': 'application/json'
    }
  });
