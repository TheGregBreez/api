const fs = require('fs');

const users = JSON.parse(fs.readFileSync('db.json', 'utf-8'));

module.exports = function (app) {

    //============================
    //    POST
    //============================
    app.post('/api/users', (req, res) => {
        const user = {
            'id': '' + Date.now() + '',
            'firstName': req.body.firstName,
            'surName': req.body.surName,
            'about': req.body.about,
            'email': req.body.email
        };
        try{
            users.push(user);
            fs.writeFile('db.json', JSON.stringify(users));
            res.send(user)
        }catch (err){
            res.send(err)
        }

    });

    //============================
    //    GET
    //============================
    app.get('/api/users', (req, res) => {
            res.send(users)
    });

    //============================
    //    GET BY EMAIL
    //============================
    app.get('/api/users/:email', (req, res) => {
        let chosenUser = null;
        const email = req.params.email;
        users.forEach((person) => {
            if(person.email === email) {
                chosenUser = person;
            }
        });
        if(chosenUser) {
            res.send(chosenUser);
        }else{
            res.send('User doesn`t exists');
        }
    });

    //============================
    //    PUT
    //============================
    app.put('/api/users/:email', (req, res) => {
        let resUser = null;
        const email = req.params.email;
        const user = {
            'id': '' + Date.now() + '',
            'firstName': req.body.firstName,
            'surName': req.body.surName,
            'about': req.body.about,
            'email': req.body.email
        };
        users.forEach((person) => {
            if (person.email === email) {
                person.firstName = user.firstName ? user.firstName : person.firstName;
                person.surName = user.surName ? user.surName : person.surName;
                person.about = user.about ? user.about : person.about;
                person.email = user.email ? user.email : person.email;
                resUser = person;
            }
        });
        if(resUser){
            fs.writeFile('db.json', JSON.stringify(users));
            res.send(resUser)
        }else{
            res.send('User doesn`t exists');
        }
    });

    //============================
    //    DELETE
    //============================
    app.delete('/api/users/:email', (req, res) => {
        const email = req.params.email;
        let deletedUser = null;
        users.forEach((person) => {
            if (person.email === email) {
                deletedUser = '' + person.firstName + ' ' + person.surName;
                users.splice(users.indexOf(person), 1);
            }
        });
        if(deletedUser) {
            fs.writeFile('db.json', JSON.stringify(users));
            res.send('User ' + deletedUser + ' deleted successfully');
        }else{
            res.send('User doesn`t exists');
        }
    })
};