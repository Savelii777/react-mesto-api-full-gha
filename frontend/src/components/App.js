import React, {useEffect, useState} from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRouteElement from "./ProtectedRoute";
import { register, login} from "../utils/Auth";
import * as auth from '../utils/Auth';

function App() {
    //хуки для попапов
    const [isPopupProfileOpened, doPopupProfileOpened] = useState(false);
    const [isPopupAvatarOpened, doPopupAvatarOpened] = useState(false);
    const [isPopupImageOpened, doPopupImageOpened] = useState(false);
    const [isPopupCardOpened, doPopupCardOpened] = useState(false);
    const [isOpenConfimPopup, doAddConfimPopupOpen] = useState(false)
    const [cardElement, doUpdateCardElement] = useState({});
    const [selectedCard, doSetSelectedCard] = useState({});
    const [cards, doSetCards] = useState([]);
    const [currentUser, doSetCurrentUser] = useState({})
    const [isLoading, doSetLoading] = useState(false);
    const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [loggedIn, isloggedIn] = useState(false)
    const [registerResponse, isregisterResponse]  = useState({
        status: false,
        text: "",
    });
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("")
    const [isActiveAdidasButton, setIsActiveAdidasButton] = useState(false)
    const [pageLoading, setPageloading] = useState(true);

    function openPopupBurger(e) {
        e.preventDefault();
        setIsActiveAdidasButton(!isActiveAdidasButton)
    }

    function handelRegisterClick(password, email) {
        register(password, email)
            .then((res) => {
                if(res) {
                    isregisterResponse({
                        status: true,
                        text: "Вы успешно зарегистрировались!",
                    });
                    navigate('/sign-in', {replace: true})
                }
            })
            .catch(() => {
                isregisterResponse({
                    status: false,
                    text: "Что-то пошло не так! Попробуйте ещё раз.",
                });
            })
            .finally(()=>setOpenInfoTooltip(true))
    }

    function handelLoginClick(password, email) {
        login(password, email)
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                isloggedIn(true);
                navigate('/',{replace: true});
                setUserEmail(email)
            })
            .catch((res) => {
                if(res === 'Ошибка 401') {
                    setOpenInfoTooltip(true);
                    isregisterResponse({
                        status: false,
                        text: "Вы не зарегестрированны",
                    });
                } else if(!res) {
                    isregisterResponse({
                        status: false,
                        text: res,
                    });
                }
            })
    }

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            const checkToken = async () => {
                try {
                    const res = await auth.checkToken(jwt);
                    if (res) {
                        isloggedIn(true);
                        setUserEmail(res.data.email);
                        navigate("/", { replace: true });
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            checkToken();
        }
    }, []);


    useEffect(() => {
        if(loggedIn) {
            setPageloading(true);
            Promise.all([api.getUserInfoFromServer(), api.getCardsFromServer()])
                .then(([user, cards]) => {
                    doSetCurrentUser(user);
                    doSetCards(cards);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => setPageloading(false))
        }
    }, [isloggedIn]);

    //получаем данные с сервера

    useEffect(() => {
        Promise.all([api.getUserInfoFromServer(), api.getCardsFromServer()])
            .then(([user, cards]) => {
                // setUserName(user.name);
                // setUserJob(user.about);
                // setUserAvatar(user.avatar);
                // setCards(
                //   cards.map((card) => ({
                //     cardId: card._id,
                //     cardName: card.name,
                //     cardImgLink: card.link,
                //     cardLikes: card.likes,
                //   }))
                // );
                doSetCurrentUser(user);
                doSetCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);




    function handleUserUpdate(value) {
        doSetLoading(true)
        api.sendUserInfoToServer(value)
            .then((user) => {
                doSetCurrentUser(user);
            })
            .then(() => { closeAllPopups(); })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                doSetLoading(false);
            });
    }

    function handleAvatarUpdate(value) {
        doSetLoading(true)
        api.sendUserAvatarToServer(value)
            .then((user) => {
                doSetCurrentUser(user);
            })
            .then(() => { closeAllPopups(); })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                doSetLoading(false);
            });
    }

    function handleCardAdd(value) {
        doSetLoading(true)
        api.addNewCardToServer(value)
            .then((newCard) => {
                doSetCards([newCard, ...cards]);
            })
            .then(() => { closeAllPopups(); })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                doSetLoading(false);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            api.addLikeToServer(card._id, !isLiked)
                .then((newCard) => {
                    doSetCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            api.deleteLikeFromServer(card._id, !isLiked)
                .then((newCard) => {
                    doSetCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }


    function handleConfimCardDelete(card) {
        doAddConfimPopupOpen(true);
        //сохраняем в стейте карту для удаления
        doSetSelectedCard(card);
    }

    function handleCardDelete(card) {
        api.deleteCardFromServer(card._id)
            .then((newCard) => {
                const newCards = cards.filter((c) =>
                    c._id === card._id ? "" : newCard
                )
                doSetCards(newCards);
            })
            .then(() => { closeAllPopups(); })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        const handleEscapeClose = (evt) => {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        };

        const handlePopupsClose = (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closeAllPopups();
            }
        };

        const addEventListeners = () => {
            document.addEventListener('mousedown', handlePopupsClose);
            document.addEventListener('keydown', handleEscapeClose);
        };

        const removeEventListeners = () => {
            document.removeEventListener('mousedown', handlePopupsClose);
            document.removeEventListener('keydown', handleEscapeClose);
        };

        addEventListeners();
        return removeEventListeners;
    }, [closeAllPopups]);

    function closeAllPopups() {
        doPopupProfileOpened(false);
        doPopupAvatarOpened(false);
        doPopupImageOpened(false);
        doPopupCardOpened(false);
        doAddConfimPopupOpen(false);
        setOpenInfoTooltip(false);
    }

    function handleCardClick(card) {
        doUpdateCardElement(card);
        doPopupCardOpened(true);
    }

    function handleEditAvatarClick() {
        doPopupAvatarOpened(true);
    }

    function handleEditProfileClick() {
        doPopupProfileOpened(true);
    }

    function handleAddPlaceClick() {
        doPopupImageOpened(true);
    }

    function signOut() {
        localStorage.removeItem('jwt');
        navigate('/sign-in')
        setIsActiveAdidasButton(false);
        isloggedIn(false);
        setUserEmail('');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    userEmail={userEmail}
                    signOut={signOut}
                    openPopupBurger={openPopupBurger}
                    isActiveAdidasButton={isActiveAdidasButton}/>
                <Routes>
                    {/*<Route path="/" element={loggedIn ? <Navigate to="/react-mesto-auth" replace /> : <Navigate to="/sign-in" replace />} />*/}

                    <Route path="/sign-up" element={
                        <Register register={handelRegisterClick} />}>
                    </Route>
                    <Route path="/sign-in" element={
                        <Login login={handelLoginClick}/>}>
                    </Route>

                    <Route path="/" element={
                        <>
                            <ProtectedRouteElement
                                component={Main}
                                loggedIn={loggedIn}
                                onEditProfileAvatar={handleEditAvatarClick}
                                onEditProfileInfo={handleEditProfileClick}
                                onAddNewPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onClickCardDelete={handleConfimCardDelete}
                                onCardLike={handleCardLike}
                            />
                        </>
                       }
                    />
                </Routes>
                <Footer/>
                <EditProfilePopup isOpen={isPopupProfileOpened} onClose={closeAllPopups} isLoading={isLoading}
                                  onUserUpdate={handleUserUpdate}/>
                <EditAvatarPopup isOpen={isPopupAvatarOpened} onClose={closeAllPopups} isLoading={isLoading}
                                 onAvatarUpdate={handleAvatarUpdate}/>
                <AddPlacePopup isOpen={isPopupImageOpened} onClose={closeAllPopups} isLoading={isLoading}
                               onCardAdd={handleCardAdd}/>
                <ImagePopup
                    isOpen={isPopupCardOpened}
                    card={cardElement}
                    onClose={() => {
                        doPopupCardOpened(false);
                    }}
                />
                <ConfirmPopup isOpen={isOpenConfimPopup} onClose={closeAllPopups}
                              onConfirmDeleteClick={handleCardDelete} card={selectedCard}/>
                <InfoTooltip
                    isOpen={isOpenInfoTooltip}
                    onClose={closeAllPopups}
                    registerResponse={registerResponse}
                />
            </div>
        </CurrentUserContext.Provider>

    );
}

export default App;