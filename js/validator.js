const MIN_USER_LENTGH = 3;
const MAX_USER_LENGTH = 9;
const USER_CHARS = /^[a-zA-Z0-9]+$/;

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;
const NAME_CHARS = /^[a-zA-Z]+$/;

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 20;

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Validate{

    static userNameValidation(input){
        if (input === ''){
            toastr.warning('Username is empty!');
            throw('Username is empty!');
        } else if (input.length < MIN_USER_LENTGH || input.length > MAX_USER_LENGTH){
            toastr.warning('Username must be between 3 and 9 charatcetrs length!');
            throw('Username must be between 3 and 9 charatcetrs length!');
        } else if (!input.match(USER_CHARS)){
            toastr.warning("Username must consist of only letter and or numbers!");
            throw("Username must consist of only letter and or numbers!");
        }
    }

    static nameValidation(input){
        if (input === ''){
            toastr.warning('Name is empty!');
            throw('Name is empty!');
        } else if (input.length < MIN_NAME_LENGTH || input.length > MAX_NAME_LENGTH){
            toastr.warning('Name must be between 2 and 20 charatcetrs length!');
            throw('Name must be between 2 and 20 charatcetrs length!');
        } else if (!input.match(NAME_CHARS)){
            toastr.warning("Name must consist of only letters!");
            throw("Name must consist of only letters!");
        }
    }

    static passwordValidation(input){
        if (input === ''){
            toastr.warning('Password is empty!');
            throw('Password is empty!');
        } else if (input.length < MIN_PASSWORD_LENGTH || input.length >MAX_PASSWORD_LENGTH){
            toastr.warning('Password must be between 6 and 20 charatcetrs length!');
            throw('Password must be between 6 and 20 charatcetrs length!');
        }
    }

    static emailValidation(input){
        if (input === ''){
            toastr.warning('Email is required!');
            throw('Email is required!');
        } else if (!input.match(EMAIL_REGEX)){
            toastr.warning('Not a valid email!');
            throw('Not a valid email!');
        }
    }
}