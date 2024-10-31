import i18n from "../i18n";

export function getMessage ( fieldName, msgType, limit = 0 )
{
    var getMessges = messageSet( fieldName, limit );
    var msg = getMessges[ msgType ];
    if ( msg != '' && msg != null )
    {
        return msg;
    }
    else
    {
        return null;
    }
}

function messageSet ( fieldName, limit )
{
    var message = {
        'warning': 'Are you sure, You want to continue?',
        'missingFileds': 'One or more fileds are missing',
        'required': 'This field is required',
        'requiredWithFieldName': fieldName + ' is required',
        'wrongFormat': fieldName + ' doesnt seem right',
        'passwordMismatch': 'Password & confirm password must match',
        'numberValue': fieldName + ' doesnt seem right, Number only',
        'maxLimitValue': fieldName + ' reached max limit' + ( limit != 0 ? ' (' + limit + ')' : '' ),
        'minLimitValue': fieldName + ' not reached min limit ' + ( limit != 0 ? ' (' + limit + ')' : '' ),
        'blankValue': fieldName + ' doesnt seem right',
        'atleast': 'Please add at least one ' + fieldName,
        'imageValue': 'File doesnt seem right, Image files only ',
        'imageValid': 'Invalid file type. Please upload a PDF file',
        'documentValid': 'Invalid file type. Please upload a PDF file',
        'imageSize': 'File doesnt seem right, under ' + ( limit != 0 ? limit : '2' ) + 'MB only ',
        'amount': 'Amount doesnt seem right ',
        'profileUpdate': 'Profile updated successfully',
    }
    let messagein = {
        "warning": "Apakah Anda yakin ingin melanjutkan?",
        "missingFileds": "Satu atau lebih file hilang",
        "required": "Bidang ini wajib diisi",
        "requiredWithFieldName": fieldName + " diperlukan",
        "wrongFormat": fieldName + " sepertinya tidak benar",
        "passwordMismatch": "Kata sandi & konfirmasi kata sandi harus sesuai",
        "numberValue": fieldName + " sepertinya tidak benar, hanya Angka saja",
        "maxLimitValue": fieldName + " mencapai batas maksimal " + ( limit != 0 ? ' (' + limit + ')' : '' ),
        "minLimitValue": fieldName + " tidak mencapai batas minimum " + ( limit != 0 ? ' (' + limit + ')' : '' ),
        "blankValue": fieldName + " sepertinya tidak benar",
        "atleast": "Harap tambahkan setidaknya satu ",
        "imageValue": "File sepertinya tidak benar, hanya file gambar ",
        "imageValid": "Jenis berkas tidak valid. ",
        "documentValid": "Jenis berkas tidak valid. ",
        "imageSize": "File sepertinya tidak benar, di bawah " + ( limit != 0 ? limit : '2' ) + " MB saja ",
        "amount": "Jumlahnya sepertinya tidak tepat ",
        "profileUpdate": "Profil berhasil diperbarui"
    }
    if ( i18n.language == 'en' )
    {
        return message;
    }
    else
    {
        return messagein;
    }
}

export function getPattern ( ptrnType )
{
    var pattern = {
        'email': /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        'otp': /^\d{4}$/i,
        'alphanumeric': /^[A-Za-z0-9]*$/i,
        'numeric': /^[0-9]*$/i,
        'number': /^\d*\.?\d+$/i,
    }
    var ptrn = pattern[ ptrnType ];
    if ( ptrn != '' && ptrn != null )
    {
        return ptrn;
    }
    else
    {
        return null;
    }
}