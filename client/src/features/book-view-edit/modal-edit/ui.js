import dedent from "dedent-js";


/**
 * @param {BookInfo} bookInfo
 * @returns {string} - html template
 */
export const layout = (bookInfo) => {
    return dedent`
        <div class="modal-edit" id="modal-edit">
            <div class="modal-edit__wrapper">
                <div class="modal-edit__container animate animate__zoomIn" id="modal-edit-container">
                    <div class="modal-edit__content">
                        <button class="btn-default modal-edit__btn-close" id="modal-edit-btn-close" type="button">
                            <img src="assets/icons/x-mark.svg" alt="x-mark">
                        </button>
                        <h2 class="modal-edit__title">Edit Book</h2>
                        
                        <form class="default-form modal-edit-form" id="modal-edit-form" autocomplete="off">
                            <label class="btn-square modal-edit-form__btn-favorite">
                                <input type="checkbox" name="isFavorite">
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
                                </input>
                            </label>
                            <div class="default-form__field">
                                <label>
                                    <span>Title:</span>
                                    <input
                                        class="default-form__input"
                                        type="text"
                                        name="name"
                                        required
                                        value="${bookInfo.name}"
                                        placeholder="Title"
                                    >
                                </label>
                            </div>
                            <div class="default-form__field">
                                <label>
                                    <span>Author:</span>
                                    <input
                                        class="default-form__input"
                                        type="text"
                                        name="author"
                                        required
                                        value="${bookInfo.author}"
                                        placeholder="Author"
                                    >
                                </label>
                            </div>
                            <div class="default-form__field">
                                <label>
                                    <span>Publish year:</span>
                                    <input
                                        class="default-form__input"
                                        type="number"
                                        pattern="\d{4}"
                                        name="publishYear"
                                        value="${bookInfo.publishYear}"
                                        placeholder="Publish year"
                                    >
                                </label>
                            </div>
                            <div class="default-form__field">
                                <label>
                                    <span>Publish house:</span>
                                    <input 
                                        class="default-form__input"
                                        type="text"
                                        name="publishHouse"
                                        value="${bookInfo.publishHouse}"
                                        placeholder="Publish house"
                                    >
                                </label>
                            </div>
                            <div class="default-form__field">
                                <label>
                                    <span>Pages:</span>
                                    <input
                                        class="default-form__input"
                                        type="number"
                                        name="pagesNumber"
                                        value="${bookInfo.pagesNumber}"
                                        placeholder="Pages"
                                    >
                                </label>
                            </div>
                            <div class="default-form__field">
                                <label>
                                    <span>Genres:</span>
                                    <!-- TODO: сделать через badges как на гитхабе -->
                                    <input
                                        class="default-form__input"
                                        type="text"
                                        name="genres"
                                        value="${bookInfo.genres.join(", ")}"
                                        placeholder="Genres"
                                    >
                                </label>
                            </div>
                            <div class="default-form__field">
                                <label>
                                    <span>Language:</span>
                                    <input
                                        class="default-form__input"
                                        type="text"
                                        name="originalLanguage"
                                        value="${bookInfo.originalLanguage}"
                                        placeholder="Original language"
                                    >
                                </label>
                            </div>
                            <div class="modal-edit-form__buttons">
                                <button 
                                    class="btn-default default-form__btn-submit modal-edit-form__btn-remove"
                                    id="modal-edit-btn-remove" 
                                    type="button"
                                >
                                    Remove
                                </button>
                                <button class="btn-default default-form__btn-submit" type="submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
};