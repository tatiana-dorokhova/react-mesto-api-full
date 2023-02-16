import React from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';

import { api } from '../utils/Api';
import * as auth from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import logoImage from '../images/header/header-logo.svg';
import authOkImage from '../images/auth/InfoTooltip-Ok.svg';
import authFailImage from '../images/auth/InfoTooltip-Fail.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [isAuthSuccess, setIsAuthSuccess] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [email, setEmail] = React.useState('');

  const history = useHistory();

  // проверяем по куке, авторизован ли уже пользователь
  React.useEffect(() => {
    api
      .getUserProfile()
      .then((userProfile) => {
        setIsLoggedIn(true);
        setCurrentUser(userProfile);
        setEmail(userProfile.email);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // авторизованному пользователю показываем карточки
  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevState) => prevState.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(setCards((prevState) => prevState.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleUpdateUser({ newUserName, newUserAbout }) {
    api
      .editUserProfile({ newUserName, newUserAbout })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(newAvatarLink) {
    api
      .updateUserAvatar(newAvatarLink)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ newCardName, newCardLink }) {
    api
      .addNewCard({ newCardName, newCardLink })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function onLogin({ email, password }) {
    auth
      .login({ email, password })
      .then((res) => {
        if (res.message === 'Authorization successful') {
          setEmail(email);
          setIsLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsAuthSuccess(false);
        console.log(err);
      });
  }

  function onRegister({ email, password }) {
    auth
      .register({ email, password })
      .then((res) => {
        // если пришел корректный ответ,
        // то нужно открыть попап с подтверждающей картинкой, запомнить email
        // перейти на страницу логина
        if (res) {
          setIsInfoTooltipOpen(true);
          setIsAuthSuccess(true);
          history.push('/sign-in');
        }
      })
      // если в ответе ошибка,
      // то открыть попап с предупреждающей картинкой
      // остаться на странице регистрации
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsAuthSuccess(false);
      });
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setEmail('');
    history.push('/sign-in');
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="content">
          <Header src={logoImage} alt="Места России" onSignOut={onSignOut} email={email} />

          <Switch>
            <Route path="/sign-up">
              <Register onAuth={onRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onAuth={onLogin} />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              isLoggedIn={isLoggedIn}
              email={email}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onDeleteCardButtonClick={handleDeleteCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            {/* любой другой путь будет перенаправлен на логин или на страницу с данными */}
            <Route path="/">{isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
          </Switch>

          <Footer />
        </div>
        {/* попап редактирования профиля (отрисовываем только тогда, когда isEditProfilePopupOpen=true)*/}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>
        {/* попап обновления аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>
        {/* попап добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>
        {/* попап раскрытия картинки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* попап удаления карточки */}
        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          submitButtonName="Да"
        />

        {/* попап-уведомление об успешной авторизации */}
        <InfoTooltip
          name="info-tooltip"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isAuthSuccess={isAuthSuccess}
          authOkImage={authOkImage}
          authFailImage={authFailImage}
        ></InfoTooltip>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
