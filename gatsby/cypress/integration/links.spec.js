describe('Link test', () => {
    it('Deep pages load', () => {
        cy.visit('/north-island/day-walk/challenging/mountains/high-elevation')
    })

    it('Deep pages load', () => {
        cy.visit('/north-island/day-walk/challenging')
        cy.findByText(/mountain/i).click()
    })
})