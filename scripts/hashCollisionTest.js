const toolbox = require("../api/self_modules/toolbox");

// Liste des mots de passe à tester
const passwords = [
    "admin123",    // Un mot de passe connu
    "password123", // Un autre mot de passe
    "userpassword", // Encore un autre
    "12345",       // Mot de passe populaire
    "letmein"      // Un autre mot de passe courant
];

// Tableau pour stocker les résultats de hash
let hashes = {};

// Tester chaque mot de passe
passwords.forEach(password => {
    let hashedPassword = toolbox.badHash(password);
    
    console.log(`Password: ${password} -> Hash: ${hashedPassword}`);
    
    // Vérifier si ce hash existe déjà dans notre tableau
    if (hashes[hashedPassword]) {
        console.log(`\n**** COLLISION TROUVEE ****`);
        console.log(`Le mot de passe "${password}" génère le même hash que "${hashes[hashedPassword]}"`);
        console.log(`-----------------------------------------\n`);
    } else {
        // Sinon, on l'ajoute au tableau
        hashes[hashedPassword] = password;
    }
});

