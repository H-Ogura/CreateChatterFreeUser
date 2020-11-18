/**
 * @description       : 
 * @author            : Hiroyuki Ogura
 * @group             : 
 * @last modified on  : 2020-11-18
 * @last modified by  : Hiroyuki Ogura
 * Modifications Log 
 * Ver   Date         Author           Modification
 * 1.0   2020-11-18   Hiroyuki Ogura   Initial Version
**/
public with sharing class registFormController {
    @AuraEnabled(cacheable=true)
    public static String chatterProfileId(){
        List<Profile> lst =  [SELECT Id FROM Profile WHERE NAME = 'Chatterユーザ'];
        if (lst.size() > 0) {
            return lst[0].Id;
        } else {
            return null;
        }
        
    }

    @AuraEnabled(cacheable=true)
    public static Integer IsAreadyExist(String email){
        AggregateResult[] groupedResults = [SELECT COUNT(Id) cnt FROM User WHERE email = :email];
        Object o = groupedResults[0].get('cnt');
        return Integer.valueOf(o);
    }
}
