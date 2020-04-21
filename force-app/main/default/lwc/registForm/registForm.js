import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import chatterProfileId from '@salesforce/apex/registFormController.chatterProfileId';
import IsAreadyExist from '@salesforce/apex/registFormController.IsAreadyExist';
import { createRecord } from 'lightning/uiRecordApi';
import USER_OBJECT from '@salesforce/schema/User';
import COMMUNITYNICKNAME_FIELD from '@salesforce/schema/User.CommunityNickname';
import FIRSTNAME_FIELD from '@salesforce/schema/User.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/User.LastName';
import USERNAME_FIELD from '@salesforce/schema/User.Username';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
import ALIAS_FIELD from '@salesforce/schema/User.Alias';
import PROFILEID_FIELD from '@salesforce/schema/User.ProfileId';
import LOCALESIDKEY_FIELD from '@salesforce/schema/User.LocaleSidKey';
import TIMEZONESIDKEY_FIELD from '@salesforce/schema/User.TimeZoneSidKey';
import LANGUAGELOCALEKEY_FIELD from '@salesforce/schema/User.LanguageLocaleKey';
import EMAILENCODINGKEY_FIELD from '@salesforce/schema/User.EmailEncodingKey';

const DELAY = 500;
export default class RegistForm extends LightningElement {
    @track userId;
    @track username;
    @track alias;
    @track canreset = false;
    @track isExistUser = false;
    
    chatterid = '';
    name = '';
    lastname = '';
    firstname = '';
    email = '';
    
    @wire(chatterProfileId)
    wiregetProfileid({data}){
        this.chatterid = JSON.stringify(data);
    }

    handleLastNameChange(event) {
        this.lastname = event.target.value;
    }
    handlefirstNameChange(event) {
        this.firstname = event.target.value;
    }

    handleEmailChange(event){
        this.email = event.detail.value;
        let username = event.detail.value.split('@');
        this.alias = username[0];
        this.username = username[0] + '@sf.fsi.co.jp';
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            IsAreadyExist({ 'email': this.email})
                .then(result => {
                    if( result !== 0){
                        console.log(result);
                        this.isExistUser = true;
                    } else {
                        this.isExistUser = false;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }, DELAY);
    }

    saveUser() {
        const fields = {};
        let profileid = String(this.chatterid).replace(/"/g, '');

        fields[FIRSTNAME_FIELD.fieldApiName] = this.firstname;
        fields[LASTNAME_FIELD.fieldApiName] = this.lastname;
        fields[USERNAME_FIELD.fieldApiName] = this.username;
        fields[COMMUNITYNICKNAME_FIELD.fieldApiName] = this.alias + Date.now();
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[ALIAS_FIELD.fieldApiName] = this.alias;
        fields[PROFILEID_FIELD.fieldApiName] = profileid;
        fields[LOCALESIDKEY_FIELD.fieldApiName] = 'ja_JP';
        fields[TIMEZONESIDKEY_FIELD.fieldApiName] = 'Asia/Tokyo';
        fields[LANGUAGELOCALEKEY_FIELD.fieldApiName] = 'ja';
        fields[EMAILENCODINGKEY_FIELD.fieldApiName] = 'ISO-2022-JP';

        const recordInput = { apiName: USER_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(User => {
                this.canreset = true;
            })
            .catch(error => {
                alert('エラー：' + JSON.stringify(error.body.message));
                /*
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'レコード作成エラー',
                        message: JSON.stringify(error.body.message),
                        variant: 'error',
                    }),
                );
                */
            });
    }

    navigateToWebPage() {
        window.open("https://login.salesforce.com/secur/forgotpassword.jsp?locale=jp&un=" + this.username);       
    }
}