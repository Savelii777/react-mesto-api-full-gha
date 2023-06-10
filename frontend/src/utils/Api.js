class Api {
    constructor({baseUrl})
    {
        this._baseUrl = baseUrl;
    }
    _checkResponseFromServer(res){
        if (res.ok) {
            return res.json();
          }
        console.log("ssshhhhhhhhhh")
          return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    getUserInfoFromServer(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }

        })
        .then(this._checkResponseFromServer);   
    }

    getCardsFromServer(){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(this._checkResponseFromServer);   
    }

    sendUserInfoToServer(userInfo) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(userInfo)
        })
        .then(this._checkResponseFromServer);   
      }


    sendUserAvatarToServer(avatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(avatar)})
            .then(this._checkResponseFromServer
            );
    }
      addNewCardToServer(cardInformation) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(cardInformation)
        })
        .then(this._checkResponseFromServer);   
      }

    deleteCardFromServer(cardID){
        return fetch(`${this._baseUrl}/cards/`+cardID, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(this._checkResponseFromServer);   
    }

    addLikeToServer(cardID){
        return fetch(`${this._baseUrl}/cards/`+cardID+'/likes', {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(this._checkResponseFromServer);   
    }

    deleteLikeFromServer(cardID){
        return fetch(`${this._baseUrl}/cards/`+cardID+'/likes', {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(this._checkResponseFromServer);   
    }

}
export const api = new Api({
    baseUrl: 'https://api.savelii.sporyshev.nomoredomains.rocks'
  });
