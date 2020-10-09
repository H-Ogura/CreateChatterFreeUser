@isTest
public with sharing class TestregistFormController {
    @isTest
    public static void testchatterProfileId(){
        Test.startTest();
        registFormController.chatterProfileId();
        Test.stopTest();
    }

    @isTest public static void testIsAreadyExist() {
        Test.startTest();
        registFormController.IsAreadyExist('aaa@jp.com');
        Test.stopTest();
    }
}
