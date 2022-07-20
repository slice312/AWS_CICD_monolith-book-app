import {Api} from "/src/shared/api";

export const setFavoriteBook = async (bookId, isFavorite) => {
    const response = Api.updateBook(bookId, {isFavorite});
};