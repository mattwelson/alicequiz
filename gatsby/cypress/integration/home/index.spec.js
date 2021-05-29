describe('Home page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    /*
     * TODO: make this test work
     */
    it('Contains the Question text', () => {
        cy.findByText(/Do you/).should('include.text', /you want a North Island or South Island/)
    })
})