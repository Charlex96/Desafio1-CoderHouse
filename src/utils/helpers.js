const validateNumber = (number) => {
    return number && !isNaN(number) && number > 0;
};

module.exports = { validateNumber };
