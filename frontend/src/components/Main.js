import React from "react";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <React.Fragment>
            <main className="content">
                <section className="profile">
                    <div
                        className="profile__avatar"
                        style={{backgroundImage: `url(${currentUser.avatar})`}}
                    >
                        <button
                            className="profile__edit-avatar"
                            type="button"
                            onClick={props.onEditProfileAvatar}
                        ></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__job">{currentUser.about}</p>
                        <button
                            type="button"
                            className="profile__edit-button"
                            onClick={props.onEditProfileInfo}
                        ></button>
                    </div>
                    <button
                        type="button"
                        className="profile__add-button"
                        onClick={props.onAddNewPlace}
                    ></button>
                </section>
                <section className="elements">
                    {props.cards.map((card) => (<Card key={card._id} card={card} onCardClick={props.onCardClick}
                                                      onClickCardDelete={props.onClickCardDelete}
                                                      onConfirmClick={props.onConfirmClick}
                                                      onCardLike={props.onCardLike}/>))}
                </section>
            </main>
        </React.Fragment>
    );
}

export default Main;
