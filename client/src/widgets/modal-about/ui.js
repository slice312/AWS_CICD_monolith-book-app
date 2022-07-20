import dedent from "dedent-js";


/**
 * @param {BookInfo} bookInfo
 * @returns {string} - html template
 */
export const layout = (bookInfo) => {
    return dedent`
        <div class="modal-about" id="modal-about">
            <div class="modal-about__wrapper">
                <div class="modal-about__container animate animate__zoomIn" id="modal-about-container">
                    <div class="modal-about__content">
                        <button class="btn-default modal-about__btn-close" id="modal-order-close-btn" type="button">
                            <img src="assets/icons/x-mark.svg" alt="x-mark">
                        </button>
                        <h2 class="modal-about__title">Book Information</h2>
                        <h3 class="modal-about__book-title">${bookInfo.name}</h3>
                        <h4 class="modal-about__author">${bookInfo.author}</h4>
                        <div class="modal-about__props">
                            <div class="modal-about__props-col">
                                <p>Publish house: ${bookInfo.publishHouse}</p>
                                <p>Lang: ${bookInfo.originalLanguage}</p>
                                <p>Publish year: ${bookInfo.publishYear}</p>
                            </div>
                            <div class="modal-about__props-col">
                                <p>Pages number: ${bookInfo.pagesNumber}</p>
                                <p>Genres: ${bookInfo.genres.join(",")}</p>
                            </div>
                        </div>
                        <div class="modal-about__buttons">
                            <button class="btn-default modal-about__btn-edit" id="modal-about-btn-edit" type="button">
                                Edit
                            </button>
                            
                            <button class="modal-about__btn-square" id="btn-favorite" type="button">
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        id="modal-about-btn-favorite-icon"
                                        fill=${bookInfo.isFavorite ? "red" : "gray"}
                                        d="M19.3762 2.5401C18.5386 0.825205 16.1258 -0.577889 13.3191 
                                        0.239024C11.9779 0.625491 10.8078 1.45428 9.99986 2.58999C9.19192 1.45428 8.02178 0.625491
                                        6.68062 0.239024C3.86771 -0.565417 1.46111 0.825205 0.623483 2.5401C-0.55169 4.94095 
                                        -0.0641182 7.64113 2.0737 10.5658C3.74894 12.8544 6.14304 15.1742 9.61856 17.8681C9.72839
                                        17.9536 9.86369 18 10.003 18C10.1423 18 10.2776 17.9536 10.3874 17.8681C13.8567 15.1804 16.257 
                                        12.8793 17.9323 10.5658C20.0638 7.64113 20.5514 4.94095 19.3762 2.5401Z"
                                    />
                                </svg>
                            </button>
                            
                            <button class="modal-about__btn-square" id="btn-trash" type="button">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path   
                                        fill="#B1B1B1" 
                                        d="M19.1667 3.6H15.8333V1.6C15.8333 0.7175 15.0859 0 14.1667 0H5.83333C4.91406 0 4.16667 0.7175
                                        4.16667 1.6V3.6H0.833333C0.372396 3.6 0 3.9575 0 4.4V5.2C0 5.31 0.09375 5.4 0.208333 5.4H1.78125L2.42448
                                        18.475C2.46615 19.3275 3.20052 20 4.08854 20H15.9115C16.8021 20 17.5339 19.33 17.5755 18.475L18.2187
                                        5.4H19.7917C19.9062 5.4 20 5.31 20 5.2V4.4C20 3.9575 19.6276 3.6 19.1667 3.6ZM13.9583
                                        3.6H6.04167V1.8H13.9583V3.6Z"
                                     
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};