import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import {navigateTo} from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe ('Test with Page Object', () => {


    beforeEach ('Open Apllication', () => {
        cy.openHomePage()
    })


    it('verify navigation on page', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
    })



    it.only(' should submit Inline and Basic form and select tomorrow date in the calendar', () => {
       navigateTo.formLayoutsPage()
       onFormLayoutsPage.submitInlineFormWithNameAndEmail('Lesha', 'test@test.com')
       onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
       navigateTo.datePickerPage()
       onDatePickerPage.selectCommonDatepickerDateFromToday('1')
       onDatePickerPage.selectDatepickerDateFromToday(7, 14)
       navigateTo.smartTablePage()
       onSmartTablePage.addNewRecordWithFirstandLastName('Artem', 'Grisha')
       onSmartTablePage.updateAgeByFirstName('Artem', '35')
       onSmartTablePage.deleteRowByIndex(1)
      


    })
})