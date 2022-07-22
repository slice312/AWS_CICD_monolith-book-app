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
                        <h2 class="modal-edit__title">Add Book</h2>
                        
                        <form class="default-form modal-edit-form" id="modal-edit-form" autocomplete="off">
                            <div class="default-form__field">
                                <label>
                                    <span>Title:</span>
                                    <input
                                        class="default-form__input"
                                        id="modal-create-field-name-input"
                                        type="text"
                                        name="name"
                                        placeholder="Title"
                                    >
                                </label>
                                <span class="default-form__err-label" id="modal-create-field-name-err"></span>
                            </div>
                            <div class="default-form__field">
                                <label>
                                    <span>Author:</span>
                                    <input
                                        class="default-form__input"
                                        id="modal-create-field-author-input"
                                        type="text"
                                        name="author"
                                        placeholder="Author"
                                    >
                                </label>
                                <span class="default-form__err-label" id="modal-create-field-author-err"></span>
                            </div>
                            <div class="default-form__field">
                                <label>
                                    <span>Publish year:</span>
                                    <input
                                        class="default-form__input"
                                        type="number"
                                        pattern="\d{4}"
                                        name="publishYear"
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
                                        placeholder="Pages"
                                    >
                                </label>
                            </div>
                            <div class="default-form__field">
                                <label>
                                    <span>Genres:</span>
                                    <input
                                        class="default-form__input"
                                        type="text"
                                        name="genres"
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
                                        placeholder="Original language"
                                    >
                                </label>
                            </div>
                            <div class="modal-edit-form__buttons">
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