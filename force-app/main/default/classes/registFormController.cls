public with sharing class registFormController {
    @AuraEnabled(cacheable=true)
    public static String chatterProfileId(){
        List<Profile> lst =  [SELECT Id FROM Profile WHERE NAME = 'Chatterユーザ'];
        return lst[0].Id;
    }

    @AuraEnabled(cacheable=true)
    public static Integer IsAreadyExist(String email){
        AggregateResult[] groupedResults = [SELECT COUNT(Id) cnt FROM User WHERE email = :email];
        Object o = groupedResults[0].get('cnt');
        return Integer.valueOf(o);
    }
}
