public with sharing class registFormController {
    @AuraEnabled(cacheable=true)
    public static String chatterProfileId(){
        List<Profile> lst =  [SELECT Id FROM Profile WHERE NAME = 'Chatterユーザ'];
        return lst[0].Id;
    }
}
