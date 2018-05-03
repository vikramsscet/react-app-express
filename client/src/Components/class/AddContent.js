import React, {Component} from 'react';
import Table from '../functional/Table';
import '../../css/form.css';
import '../../css/table.css';
class AddContent extends Component{
    constructor(){
        super();
        this.state = {};
    }
    componentDidMount(){
        this.getUsers();
    }
    getUsers(){
        var self = this;
        var fun = function(responseText){
            this.state.users = JSON.parse(responseText);
            var random = Math.random();
            this.setState({...this.state, random});
        }
        this.XMLHttpRequestApi('GET','/api/user/getAll', fun, self);
    }
    removeUser(el, context){
        var self = this;
        var id = el.target.value;
        var fun = function(){
            self.getUsers.call(self);
        }
        this.XMLHttpRequestApi("DELETE",`/api/user/delete/${id}`, fun, self);
    }
    XMLHttpRequestApi(method, url, callback, context=this, data={}){
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onload = function () {
            if(this.status === 200){
                callback.call(context,this.responseText);
            }
        };
        xhr.onerror = function(err) {
            console.log("Booo");
        };
        xhr.send(JSON.stringify(data));
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
        let validationFailed = false;
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
                    validationFailed = true;
                    el.parentElement.nextElementSibling.innerText=`Enter ${el.id} value`
                }
            }else if(el.type==='password'){
                if(el.id==='password'){
                    if(el.value){
                        formData[`${el.id}`]=el.value;
                        data.append(`${el.id}`, el.value)
                    }else{
                        validationFailed = true;
                        el.parentElement.nextElementSibling.innerText="Please enter Password"    
                    }
                }else if(el.id==='cpassword' && el.value !== formData['password']){
                    validationFailed = true;
                    el.parentElement.nextElementSibling.innerText="Password did not matched"
                }
            }
        });
        if(!genderChecked){
            validationFailed = true;
            document.getElementsByName('gender')[0].parentElement.nextElementSibling.innerText="Please select Gender"; 
        }
        if(!validationFailed){
            var self = this;
            var fun = function(responseText){
                this.showHideAlert(responseText);
                this.resetMessage();
                this.reset();
                this.getUsers();
            }
            this.XMLHttpRequestApi('POST','/api/user/add', fun, self, formData);
        }
    }
    showHideAlert(responseText){
        let alertBox = document.getElementsByClassName('alertMsg')[0];
        alertBox.className = "alertMsg";
        alertBox.innerText = responseText;
        setTimeout(()=>{
            alertBox.className = "alertMsg hide";
        },2500);
    }
    render(){
        return(
            <div>
                <Form reset={this.reset} submit={this.submit} />
                <Table 
                    users = {this.state.users} 
                    removeUser = {this.removeUser.bind(this)} />
            </div>    
        )
    }
}

function Form({reset, submit, state}){
    
    return (
        <div className='formBody'>
            <div className='alertMsg hide'>Sth Went Wronge!!!</div>
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
        </div>
    );
} 


export default AddContent;