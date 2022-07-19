import Swal from "sweetalert2";


/**
 * @param {Error} err
 */
export const showError = (err) => {
    void Swal.fire({
        customClass: {
            container: "app-alert"
        },
        icon: "error",
        html:
            `<p class="alert-text">${err.message}</p>`,
        buttonsStyling: false,
        confirmButtonText:
            `<button class = "btn-default alert-btn">OK</button>`
    });
};


/**
 * @param {string} message
 * @param {function|null} onClose - invokes when close
 */
export const showSuccessMsg = (message, onClose = null) => {
    Swal.fire(
        {
            customClass: {
                container: "app-alert"
            },
            icon: "success",
            html:
                `<p class="alert-text">${message}</p>`,
            buttonsStyling: false,
            confirmButtonText:
                `<button class = "btn-default alert-btn">OK</button>`
        }
    ).then(result => onClose?.());
};