import { LightningElement, wire, api } from 'lwc';
import fetchLookupData from '@salesforce/apex/CustomLookUpController.fetchLookupData' ;

export default class MultiCustomLookup extends LightningElement {


    hasRecords = false ;
    searchOutPut = [];
    delayTimeOut ;
    selectedRecords = [];
    @api objectApiName = 'Account' ;
    @api label = 'Account' ;
    @api placeHolder = 'Search Account';
    searchKey ;
    @wire(fetchLookupData ,{searchKey : "$searchKey" ,objectApiName : "$objectApiName"}) wiredsObjects({data, error}){
        if(data){
            console.log(data);
            this.hasRecords = data.length > 0 ? true : false ;
            this.searchOutPut = data ;
        }
        else{
            console.log(error);
        }

    }


    ChangeHandler(event){

        let value = event.target.value ;
        clearTimeout(this.delayTimeOut);
        this.delayTimeOut = setTimeout(() =>{
            //execute after 300 milli seconds
            this.searchKey = value ;
        },300);

    }

    clickHandler(event){
        let recordId = event.target.getAttribute("data-recid");
        console.log(recordId);
        //https://www.youtube.com/watch?v=LE3hGJOLItU&list=PLFe2L4qdtVpbtY6K-Mu9v1MSCBQxt-d8V&index=6 
        //29 min watch from here
        let selectedRecord = this.searchOutPut.find(item => item.Id === recordId);
        let pill = 
        {
            type: 'icon',
            label: selectedRecord.Name,
            name: recordId ,
            iconName: this.iconName ,
            alternativeText: selectedRecord.Name
        }
        this.selectedRecords = [...this.selectedRecords,pill] ;
    }

    get showPillContainer(){
        return this.selectedRecords.length > 0 ? true : false ;
    }

    handleRemoveItems(event){
        const index = event.detail.index ;
        this.selectedRecords.slice(index,1) ;
    }

}