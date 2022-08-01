module.exports = {
    checkForbidenString (value, forbidenString) {
        if (value === forbidenString) {
            throw new Error(`Nazwa "${forbidenString}" jest zakazana`);
        }
    },
    
    validateEmail (email) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return validRegex.test(email);
    }
};

