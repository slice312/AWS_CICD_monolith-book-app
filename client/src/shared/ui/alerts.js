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


/**
 * @param {function} onDelete
 * @returns {Promise<void>}
 */
export const deleteDialog = async (onDelete) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#287F9A",
            cancelButtonColor: "#D30808",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            onDelete();
            await Swal.fire(
                {
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    confirmButtonColor: "#287F9A"
                });
        }
    } catch (err) {
        showError(err);
    }
};