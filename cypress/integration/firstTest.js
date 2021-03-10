describe('1 test suite with locators', () => {

    beforeEach('code for every test', () => {
        cy.visit('/')
    })
    
    it('types of locators', () => {

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1) by Tag Name
        cy.get('input')

        // 2) by ID
        cy.get('#inputEmail1')

        // 3) by Class name
        cy.get('.input-full-width')

        // 4) by Attribute name
        cy.get('[placeholder]')

        // 5) by Attribute name with value
        cy.get('[placeholder="Email"]')

        // 6) by Class value (as by Attribute name with value)
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // 7) (complex) by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        // 8) (complex) by two different Attributes
        cy.get('[placeholder="Email"][fullwidth]')

        // 9) (complex) by Tag Name, Attribute with value, ID and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // 10) the most recommended way by Cypress (creating own test attributes)
        cy.get('[data-cy="imputEmail1"]')
    })
    

    it('2 test suite with the dom moving', () => {

        beforeEach(() => {
            cy.visit('/')
        })
    
        it('first test with moving through the dom', () => {
    
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
    
            // created own locator using Attribute with value
            // finding this unique locator
            cy.get('[data-cy="signInButton"]')
    
            // finding the element using text (it will take the first one on the page)
            cy.contains('Sign in')
    
            // finding the element using text and Attribute with value 
            cy.contains('[status="warning"]', 'Sign in')
    
            // travelling through the dom using the unique element
            cy.get('#inputEmail3')
                .parents('form') // moving to the parent element
                .find('button') // looking for the child element
                .should('contain', 'Sign in') // assertion
                .parents('form') // moving to the parent element again
                .find('nb-checkbox') // looking for the child element again
                .click()
    
            // another example with getting the element through another unique element
            cy.contains('nb-card', 'Horizontal form')
                .find('[type="email"]')
        })
    
        it('second test with moving through the dom', () => {
    
            // own example
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
    
            cy.contains('Basic form')
                .parents('nb-card')
                .find('nb-checkbox')
                .click()
                .click()
                .click()
        })
        
    })
    describe('3 test suite with then and wrap methods', () => {

        beforeEach(() => {
            cy.visit('/')
        })
        
        it('then and wrap methods', () => {
    
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
    
            // basic/simple example
            cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
            cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
    
            cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
            cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')
    
            // selenium example (doesn't work)
            // const firstForm = cy.contains('nb-card', 'Using the Grid')
            // const secondForm = cy.contains('nb-card', 'Basic form')
    
            // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
            // firstForm.find('[for="inputPassword2"]').should('contain', 'Password')
    
            // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')
            // secondForm.find('[for="exampleInputPassword1"]').should('contain', 'Password')
    
            // cypress example 
            cy.contains('nb-card', 'Using the Grid').then( firstForm => { 
                // after then method we use jQuery and Chai methods
                const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
                const paswordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
                expect(emailLabelFirst).to.equal('Email')
                expect(paswordLabelFirst).to.equal('Password')
    
                cy.contains('nb-card', 'Basic form').then( secondForm => {
                    const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
                    const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                    // expect(emailLabelFirst).to.equal(emailLabelSecond)
                    expect(paswordLabelFirst).to.equal(passwordLabelSecond)
    
                    // after wrap method we use Cypress methods back
                    cy.wrap(firstForm).find('[for="inputEmail1"]').should('contain', 'Email')
                    cy.wrap(firstForm).find('[for="inputPassword2"]').should('contain', 'Password')
    
                    cy.wrap(secondForm).find('[for="exampleInputEmail1"]').should('contain', 'Email address')
                    cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
    
                })
    
            })
    
        })
    
    })

    it('4 invoke method test suite', ()=> {

        beforeEach(()=> {
            cy.visit('/')
        })
    
        it('invoke method test', ()=> {
    
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
    
            // 1 example
            cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
    
            // 2 example
            cy.get('[for="exampleInputEmail1"]').then( label => {
                expect(label.text()).to.equal('Email address')
            })
    
            // 3 example
            cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
                expect(text).to.equal('Email address')
            })
    
            // 4 example
            cy.contains('nb-card', 'Basic form')
                .find('nb-checkbox')
                .click()
                .find('.custom-checkbox')
                .invoke('attr', 'class')
                //.should('contain', 'checked')
                .then( classValue => {
                    expect(classValue).to.contain('checked')
                })
    
            // 5 example
            cy.contains('Datepicker').click()
    
            cy.contains('nb-card', 'Common Datepicker')
                .find('input')
                .then( input => {
                    cy.wrap(input).click()
                    cy.get('nb-calendar-day-picker').contains('15').click()
                    cy.wrap(input).invoke('prop', 'value').should('contain', 'Feb 15, 2021')
                })
    
        })
        
    })


    describe('5 checkbox and radio button test suite', ()=> {

        beforeEach(()=> {
            cy.visit('/')
        })
    
        it('radio button', ()=> {
    
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
    
            // first way (simple)
            cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').eq(0).check({force: true}).should('be.checked')
            cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').eq(1).check({force: true})
            cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').eq(0).should('not.be.checked')
            cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').eq(2).should('be.disabled')
    
            // second way (recommended)
            cy.contains('nb-card', 'Using the Grid')
                .find('[type="radio"]')
                // taking 3 elements to jQuery object
                .then( radioButtons => {
                    // checking the first checkbox 
                    cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
    
                    // checking the second checkbox
                    cy.wrap(radioButtons).eq(1).check({force: true})
    
                    // verifying the first checkbox is unchecked 
                    cy.wrap(radioButtons).eq(0).should('not.be.checked')
    
                    // verifying the third checkbox is disabled
                    cy.wrap(radioButtons).eq(2).should('be.disabled')
            })
    
        })
    
        it('checkbox', ()=> {
    
            cy.contains('Modal & Overlays').click()
            cy.contains('Toastr').click()
    
            // check method only checks (can check all elements at once)
            cy.get('[type="checkbox"]').check({force: true}).should('be.checked')
    
            // to uncheck you need to use click method (can uncheck the only one element per time)
            cy.get('[type="checkbox"]').eq(0).click({force: true}).should('not.be.checked')
        })
    
    })

    it('6 lists and drowdowns test suite', ()=> {

        beforeEach(()=> {
            cy.visit('/')
        })
    
        it('lists and drowdowns', ()=> {
    
            // first (one element)
            cy.get('nav nb-select').click()
            // the one below will not work
            //cy.contains('.options-list', 'Dark').click()
            cy.get('.options-list').contains('Dark').click()
            cy.get('nav nb-select').should('contain', 'Dark')
            cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
    
            // second (all elements)
            cy.get('nav nb-select').then( dropdown => {
                cy.wrap(dropdown).click()
                cy.get('.options-list nb-option').each( (listItem, index) =>{
                    const itemText = listItem.text().trim()
    
                    const colors = {
                        "Light": "rgb(255, 255, 255)",
                        "Dark": "rgb(34, 43, 69)",
                        "Cosmic": "rgb(50, 50, 89)",
                        "Corporate": "rgb(255, 255, 255)"
                    }
    
                    cy.wrap(listItem).click()
                    cy.wrap(dropdown).should('contain', itemText)
                    cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                    if (index < 3) {
                        cy.wrap(dropdown).click()
                    }
                    
                })
    
            })
    
        })
        
    })



    it('7 table test suite', ()=> {

        beforeEach(()=> {
            cy.visit('/')
        })
    
        it('table test', ()=> {
    
            cy.contains('Tables & Data').click()
            cy.contains('Smart Table').click()
    
            // 1 example
            cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
                cy.wrap(tableRow).find('.nb-edit').click()
                cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
                cy.wrap(tableRow).find('.nb-checkmark').click()
                cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
           })
    
           // 2 example (my own)
           cy.get('thead').find('.nb-plus').click()
           cy.get('thead').find('tr').eq(2).then( tableRow => {
               cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
               cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Hyrych')
               cy.wrap(tableRow).find('[class="nb-checkmark"]').click()
           })
    
           cy.get('tbody').find('tr').eq(0).then( tableRowUpdated => {
               cy.wrap(tableRowUpdated).find('td').eq(2).should('contain', 'Artem')
               cy.wrap(tableRowUpdated).find('td').eq(3).should('contain', 'Hyrych')
           })
    
           // 3 example 
           cy.get('thead').find('.nb-plus').click()
           cy.get('thead').find('tr').eq(2).then( tableRow => {
               cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem2')
               cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Hyrych2')
               cy.wrap(tableRow).find('[class="nb-checkmark"]').click()
           })
    
           cy.get('tbody tr').first().find('td').then( tableColumns => {
               cy.wrap(tableColumns).eq(2).should('contain', 'Artem2')
               cy.wrap(tableColumns).eq(3).should('contain', 'Hyrych2')
           })
    
           // 4 example
           const age = [20, 30, 40, 200]
    
           cy.wrap(age).each( age => {
                cy.get('thead [placeholder="Age"]').clear().type(age)
                cy.wait(300)
                cy.get('tbody tr').each( tableRow => {
                    if(age == 200) {
                        cy.wrap(tableRow).should('contain', 'No data found')
                    } else {
                        cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                    }
            })
    
    
           })
    
        })
    
    })
    


    it('8 datepicker test suite', ()=> {

        beforeEach(()=> {
            cy.visit('/')
        })
    
        it('datepicker test', ()=> {
    
            function selectDayFromCurrent(day){
    
                let date = new Date()
                date.setDate(date.getDate() + day)
                let futureDay = date.getDate()
                let futureMonth = date.toLocaleString('default', {month: 'short'})
                let dateAssert = futureMonth+ ' ' +futureDay+ ', ' +date.getFullYear()
    
                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                    if(!dateAttribute.includes(futureMonth)){
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFromCurrent(day)
                    } else {
                        cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    }
                })
                return dateAssert
            }
            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Datepicker').click()
            
            cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
                cy.wrap(input).click()
                let dateAssert = selectDayFromCurrent(1)
                cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
                cy.wrap(input).invoke('have.value', dateAssert)
            })
            
        })
    })



    it('9 popup, tooltip, dialog box test suite', ()=> {

        beforeEach(()=> {
            cy.visit('/')
        })
    
        it('tooltip', ()=> {
    
            cy.contains('Modal & Overlays').click()
            cy.contains('Tooltip').click()
    
            cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
            cy.get('nb-tooltip').should('contain', 'This is a tooltip')
        })
    
        it('browser dialog box', ()=> {
    
            cy.contains('Tables & Data').click()
            cy.contains('Smart Table').click()
    
            // 1 example
            cy.get('tbody tr').first().find('.nb-trash').click()
            cy.on('window:confirm', (confirm)=> {
                expect(confirm).to.equal('Are you sure you want to delete?')
            }) 
    
            // 2 example (recommended)
            const stub = cy.stub()
            cy.on('window:confirm', stub)
            cy.get('tbody tr').first().find('.nb-trash').click().then(()=> {
                expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
            })
    
            // 3 example (to cancel)
            cy.get('tbody tr').first().find('.nb-trash').click()
            cy.on('window:confirm', () => false)
        })
    
    })
    

    it('assertions test suite', ()=> {

        beforeEach(()=> {
            cy.visit('/')
        })
    
        it('assertions', ()=> {
    
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()
    
            // should format
            cy.get('[for="exampleInputEmail1"]')
                .should('contain', 'Email address')
                .should('have.class', 'label')
                .and('have.text', 'Email address')
    
            // expect format
            cy.get('[for="exampleInputEmail1"]').then(label => {
                expect(label.text()).to.equal('Email address')
                expect(label).to.have.class('label')
                expect(label).to.have.text('Email address')
            })
    
    
        })
    })







})



