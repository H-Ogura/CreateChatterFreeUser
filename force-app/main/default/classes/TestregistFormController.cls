@isTest
public with sharing class TestregistFormController {
    public TestregistFormController() {

    }

    @isTest
    public static void testchatterProfileId(){
        Test.startTest();
        registFormController.chatterProfileId();
        Test.stopTest();
    }
}
