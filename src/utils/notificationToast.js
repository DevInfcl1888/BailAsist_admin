import Swal from "sweetalert2";

export const confirmDialog = async (title, text,icon, confirmText, cancelText) => {
  return await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
};

//   title, // = "Are you sure?",
//   confirmText, //= "Yes",
//   text, // = "You won't be able to revert this!",
//   cancelText, // = "Cancel",
