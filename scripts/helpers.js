document.ScreenSavior.helpers = (() => {

    /**
     * Throws an error if the passed in value is not of the passed in type.
     * ('A', 'string') => void
     * (5, 'object') => Error 
     * @param {*} value Any value imaginable.
     * @param {string} type JavaScript's representation of the type, ex.: 'string', 'object'.
     * @param {boolean} isRequired Do not throw error if value missing.
     */
    function assert(value, type, isRequired) {
        if ((value == null || value == undefined) && !isRequired) {
            return
        }

        if (typeof value !== type && isRequired) {
            debugger
            throw new Error ('Passed in value is of incorrect type')
        }
    }

    /**
     * TODO: Explain me
     * @param {number} max TODO: Explain me 
     */
    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    return {
        assert,
        getRandomNumber,
    }

})()