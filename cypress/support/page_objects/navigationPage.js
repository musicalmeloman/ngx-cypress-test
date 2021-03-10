

function selectCroupMenuItem(groupNmae) {
    cy.contains('a', groupNmae).then( menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if (attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
     })
}


export class NavigationPage {


   formLayoutsPage(){
      selectCroupMenuItem('Form')
      cy.contains('Form Layouts').click()
   };
   

   datePickerPage(){
    selectCroupMenuItem('Form')
    cy.contains('Datepicker').click()
   }


   toasterPage() { 
    selectCroupMenuItem('Modal & Overlays')
    cy.contains('Toastr').click()
   }

   smartTablePage() {
    selectCroupMenuItem('Tables & Data')
    cy.contains('Smart Table').click()
   }

   tooltipPage() {
    selectCroupMenuItem('Modal & Overlays')
    cy.contains('Tooltip').click()
   }

}


export const navigateTo = new NavigationPage()