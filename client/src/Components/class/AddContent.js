import React, {Component} from 'react';
import Table from '../functional/Table';
import '../../css/form.css';
import '../../css/table.css';
import Util from '../../js/Utility';
import {SmallDialog} from '../functional/SmallDialog/SmallDialog';
import Wait from '../functional/wait/wait';
class AddContent extends Component{
    constructor(){
        super();
        this.state = {
            dialogStatus:{'display':'none'}
        };
        this.waitToggle = false;
    }
    componentDidMount(){
        this.getUsers();
    }
    async getUsers(){
        var self = this;
        var fun = function(responseText){
            this.state.users = JSON.parse(responseText);
            var random = Math.random();
            this.setState({...this.state, random});
        }
        await Util.XMLHttpRequestApi('GET','/api/user/getAll', fun, self);
        console.log("after table is loaded...");
    }
    removeUser(el){
        let self = this;
        var id = el.target.value;
        let dialogEl = document.getElementsByClassName("outer")[0];
        dialogEl.style.display="block";
        let f = async function(event){
            if(event.target.tagName==="BUTTON"){
                console.log(event.target);
                if(event.target.id==='cancel'){
                    dialogEl.removeEventListener("click",f);
                    event.target.parentElement.parentElement.style.display = "none";
                }if(event.target.id==='ok'){
                    self.toggleWait();
                    await self.removeUserOnConfirm(id);
                    event.target.parentElement.parentElement.style.display = "none";
                    self.toggleWait();
                }
            }
        }
        dialogEl.addEventListener("click",f);

    }
    toggleWait(){
        if(this.waitToggle){
            document.getElementsByClassName("waitPage")[0].style.display = 'none';
            this.waitToggle = false;
        }else{
            document.getElementsByClassName("waitPage")[0].style.display = "block";
            this.waitToggle = true;
        }
    }
    async removeUserOnConfirm(id){
        var self = this;
        var fun = function(){
            self.getUsers.call(self);
        }
        await Util.XMLHttpRequestApi("DELETE",`/api/user/delete/${id}`, fun, self);
        console.log("after remove operation....");
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
            if(el.type==='radio'){
                el.checked=false;
            }else{
                el.value='';
            }
        });
    }
    async submit(){
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
                        el.parentElement.nextElementSibling.innerText="Please enter Password";
                    }
                }else if(el.id==='cpassword' && el.value !== formData['password']){
                    validationFailed = true;
                    el.parentElement.nextElementSibling.innerText="Password did not matched";
                }
            }
        });
        if(!genderChecked){
            validationFailed = true;
            document.getElementsByName('gender')[0].parentElement.nextElementSibling.innerText="Please select Gender"; 
        }
        if(!validationFailed){
            this.toggleWait();
            var self = this;
            var fun = function(responseText){
                this.showHideAlert(responseText);
                this.resetMessage();
                this.reset();
            }
            await Util.XMLHttpRequestApi('POST','/api/user/add', fun, self, formData);
            this.getUsers();
            this.toggleWait();
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
                <SmallDialog styles = {this.state.dialogStatus}/>
                <Wait />
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