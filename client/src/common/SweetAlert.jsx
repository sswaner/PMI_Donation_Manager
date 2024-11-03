import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent( Swal )

export function regularAlert ( alertype, message )
{
    MySwal.fire( {
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: alertype,
        title: message,
        didOpen: ( toast ) =>
        {
            toast.addEventListener( 'mouseenter', MySwal.stopTimer )
            toast.addEventListener( 'mouseleave', MySwal.resumeTimer )
        }
    } )

}

export function confirmDialog ( title, text, icon = 'warning', cancelText = "" )
{

    if ( title == '' )
    {
        title = 'Are you sure?';
    }
    if ( text == '' )
    {
        text = "You won't be able to revert this!";
    }
    let promiseData = MySwal.fire( {
        title: title,
        text: text,
        icon: icon,
        showCancelButton: cancelText != '',
        confirmButtonText: 'Yes',
        cancelButtonText: cancelText
    } ).then( ( result ) =>
    {
        if ( result.value )
        {
            return true;
        }
        else 
        {
            return false;
        }
    } );

    return promiseData;

}