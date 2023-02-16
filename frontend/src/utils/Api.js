import { BASE_URL } from './constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // каждый метод возвращает promise, который будем обрабатывать уже при вызове
  // методов в index.js

  // общий метод для всех методов, который проверяет результат на корректность,
  // и возвращает ответ в виде json (или прокидывает ошибку)
  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // загрузка информации о пользователе с сервера
  // свойство _id в ответе — это идентификатор пользователя
  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  // загрузка карточек с сервера
  // свойство _id в ответе — это идентификатор карточки
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  // редактирование профиля
  // свойство _id в ответе — это идентификатор пользователя
  editUserProfile({ newUserName, newUserAbout }) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newUserName,
        about: newUserAbout,
      }),
    }).then((res) => this._handlePromise(res));
  }

  // добавление новой карточки
  // свойство _id в ответе — это идентификатор карточки
  addNewCard({ newCardName, newCardLink }) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink,
      }),
    }).then((res) => this._handlePromise(res));
  }

  // удаление карточки по ее id
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  // изменить статус лайка у карточки
  // в ответе обновлённый JSON с карточкой с измененным количеством в likes
  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: method,
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  // сменить аватар у пользователя в профиле
  updateUserAvatar({ newAvatarLink }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    }).then((res) => this._handlePromise(res));
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
