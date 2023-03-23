import Swal from 'sweetalert2';


export function showLoading(message) {
  Swal.fire({
    title: 'Loading...',
    html: message,
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
} 

export const successLoading = (title) => {
  Swal.close();
  Swal.fire({
    title: <p>{title}</p>,
    icon: 'success',
  });
}

export const failedLoading = (text) => {
  Swal.fire({
    title: 'Oops...',
    text: text,
    icon: 'error',
  });
}

export const closeLoading = Swal.close()
