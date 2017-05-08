(function () {
    "use strict";
    //TODO: Add the validation in usersController
    const MIN_USER_LENTGH = 3;
    const MAX_USER_LENGTH = 9;
    const USER_CHARS = /^[a-zA-Z0-9]+$/;

    const MIN_NAME_LENGTH = 2;
    const MAX_NAME_LENGTH = 20;
    const NAME_CHARS = /^[a-zA-Z]+$/;

    const MIN_PASSWORD_LENGTH = 6;
    const MAX_PASSWORD_LENGTH = 20;

    class Validate{

        static userNameValidation(input){
            if (input !== string){
                throw ('Username must be a string!');
            } else if (input.length < MIN_USER_LENTGH || input.length > MAX_USER_LENGTH){
                throw ('Username must be between 3 and 9 charatcetrs length!');
            } else if (!input.match(USER_CHARS)){
                throw ("Username must consist of only letter and or numbers!");
            } else return true;
        }

        static nameValidation(input){
            if (input !== string){
                throw ('Name must be a string!');
            } else if (input.length < MIN_NAME_LENGTH || input.length > MAX_NAME_LENGTH){
                throw ('Name must be between 2 and 20 charatcetrs length!');
            } else if (!input.match(NAME_CHARS)){
                throw ("Username must consist of only letters!");
            } else return true;
        }

        static passwordValidation(input){
            if (input !== string){
                throw ('Password must be a string!');
            } else if (input.length < MIN_PASSWORD_LENGTH || input.length >MAX_PASSWORD_LENGTH){
                throw ('Password must be between 6 and 20 charatcetrs length!');
            } else return true;
        }
    }

    return Validate;
}());