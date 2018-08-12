import axios from 'axios'
import LocalStorage from "localstorage";


function Validator(Path, Method, Data){
    const list=[];

    const foo = new LocalStorage('UserData');
    const abc = foo.get('UserData');
    if(abc[1].tokenData.verification_token) {

            let token = abc[1].tokenData.verification_token
            return axios({
                method: Method,
                url: Path,
                data: Data,
                headers: {"Token": token}
            })
                .then(response => {
                    console.log('global response', response)
                    if (response.data.data.token === false) {
                        this.props.history.push('/');

                    }
                    else {

                        return response.data
                    }


                })
                .catch(error => {
                    console.log('error')
                })

    }
    else{
        this.props.history.push('/');
    }
}

export default Validator

