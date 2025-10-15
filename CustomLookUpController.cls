public with sharing class CustomLookUpController {

    @AuraEnabled(cacheable=true)
    public static List<Account> fetchLookupData(string searchKey,string objectApiName){
       List<sObject> sObjectList = new List<sObject>();
       //search Key is blank or null
       if(string.isBlank(searchKey)){
        return sObjectList ;
       }
       else{
        string key = '%' + searchKey + '%' ;
        string query = 'SELECT Id,Name FROM ' + objectApiName + ' WHERE Name LIKE :key ORDER BY Name LIMIT 5' ;
        sObjectList = Database.query(query) ;
        return sObjectList ;
       }

    }
}