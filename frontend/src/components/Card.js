import {CurrentUserContext} from '../contexts/CurrentUserContext'
import React from 'react';

function Card({card, onCardClick, onClickCardDelete, onCardLike}) {

    const currentUser = React.useContext(CurrentUserContext);

    function handleCardClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onClickCardDelete(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }
    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );

    return (
        <div className="element"
        >
            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                onClick={handleCardClick}
            />
            {isOwn && <button className="element__delete-button" type="button" onClick={handleDeleteClick}/>}
            <div className="element__botom-section">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-section">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
