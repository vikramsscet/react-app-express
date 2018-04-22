import React, {Component} from 'react';
import '../../css/form.css';
class AddContent extends Component{
    constructor(){
        super();
        this.state = {
            validFormFields : [
                {
                    el : { id : 'fName', name : "", class : "", type : "text"},
                    regEx : '',
                    nullFlag : false,
                    matchEl : false 
                },
                {
                    el : { id : 'lName', name : "", class : "", type : "text"},
                    regEx : '/[a-zA-Z]/',
                    nullFlag : false,
                    matchEl : false 
                },
                {
                    el : { id : '', name : "gender", class : "", type : "radio"},
                    regEx : '',
                    nullFlag : false,
                    matchEl : false 
                },
                {
                    el : { id : 'email', name : "", class : "", type : "text"},
                    regEx : '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/',
                    nullFlag : false,
                    matchEl : false 
                },
                {
                    el : { id : 'password', name : "", class : "", type : "password"},
                    regEx : '',
                    nullFlag : false,
                    matchEl : false 
                },
                {
                    el : { id : 'cpassword', name : "", class : "", type : "password"},
                    regEx : '',
                    nullFlag : false,
                    matchEl : false 
                }
            ]
        };
    }
    resetMessage(){
        var msgEls = document.getElementsByClassName('elMessage');
        for(var i=0; i<msgEls.length; i++){
            msgEls[i].innerText=''
        }
    }
    reset(){
        this.resetMessage();
        var form = document.getElementById('form').querySelectorAll('input');
        form.forEach(el=>{
            if(el.type=='radio'){
                el.checked=false;
            }else{
                el.value='';
            }
        });
    }
    submit(){
        this.resetMessage();
        let formData = {};
        var data = new FormData();
        var form = document.getElementById('form').querySelectorAll('input');
        let genderChecked=false;
        form.forEach(el=>{
            if(el.type==='radio' && el.checked){
                formData[`${el.name}`]=el.value;
                data.append(`${el.name}`, el.value);
                genderChecked = true;
            }else if(el.type==='text'){
                if(el.value){
                    formData[`${el.id}`]=el.value;
                    data.append(`${el.id}`, el.value)
                }else{
                    el.parentElement.nextElementSibling.innerText=`Enter ${el.id} value`
                }
            }else if(el.type==='password'){
                if(el.id==='password'){
                    if(el.value){
                        formData[`${el.id}`]=el.value;
                        data.append(`${el.id}`, el.value)
                    }else{
                        el.parentElement.nextElementSibling.innerText="Please enter Password"    
                    }
                }else if(el.id==='cpassword' && el.value !== formData['password']){
                    el.parentElement.nextElementSibling.innerText="Password did not matched"
                }
            }
        });
        if(!genderChecked){
            document.getElementsByName('gender')[0].parentElement.nextElementSibling.innerText="Please select Gender"; 
        }
        console.log(formData);
        console.log(data);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/user/add', true);
        xhr.onload = function () {
            // do something to response
            console.log(this.responseText);
        };
        xhr.onerror = function() {
            console.log("Booo");
        };
        xhr.send(JSON.stringify(formData));
    }
    render(){
        return(
            <Form reset={this.reset} submit={this.submit} />
        )
    }
}

function Form({reset, submit}){
    return (
        <div className='fieldSet col-10' id='form'>
            <div className='heading'>Register User</div>
            <div className="formRow">
                <div className='leftEl col-5'>First Name</div>
                <div className='rightEl'><input type='text' id='fName' /></div>
                <span className='elMessage'></span>
            </div>

            <div className="formRow">
                <div className='leftEl col-5'>Last Name</div>
                <div className='rightEl'><input type='text' id='lName' /></div>
                <span className='elMessage'></span>
            </div>

            <div className="formRow">
                <div className='leftEl col-5'>Gender</div>
                <div className='rightEl'>
                    Male<input type="radio" name="gender" value="Male" />
                    Female<input type="radio" name="gender" value="Female" />
                    Others<input type="radio" name="gender" value="Other" />
                </div>
                <span className='elMessage'></span>
            </div>

            <div className="formRow">
                <div className='leftEl col-5'>Email</div>
                <div className='rightEl'><input type='text' id='email' /></div>
                <span className='elMessage'></span>
            </div>

            <div className="formRow">
                <div className='leftEl col-5'>Password</div>
                <div className='rightEl'><input type='password' id='password' /></div>
                <span className='elMessage'></span>
            </div>

            <div className="formRow">
                <div className='leftEl col-5'>Confirm Password</div>
                <div className='rightEl'><input type='password' id='cpassword' /></div>
                <span className='elMessage'></span>
            </div>

            <div className='formControls'> 
                <button value="Submit" id='submit' onClick={submit.bind(new AddContent())}><span>Submit </span></button>
                <button value="Reset" id='reset' onClick={reset.bind(new AddContent())}>Reset</button>
            </div>
        </div>
    );
} 

export default AddContent;