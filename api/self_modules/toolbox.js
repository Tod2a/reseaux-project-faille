exports.checkMail = (mail) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(mail);
};

// Fonction de hashage faible avec 10% de collisions
exports.badHash = (input) => {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        sum += input.charCodeAt(i);
    }
    return sum % 10; // provoque 10% de collision (10 valeurs possibles)
};
