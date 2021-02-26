
    const currentUserURL = 'http://localhost:8080/api/current';

    function sendRequest(method, url, body) {
        const headers = {
            'Content-Type': 'application/json'
        }

        return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: headers
        }).then(response => {
            if (response.ok) {
                return response.json()
            }

            return response.json().then(error => {
                const e = new Error('Failure to receive data')
                e.data = error
                throw e
            })
        })
    }

    sendRequest('GET', currentUserURL).then(currentUser => {

            //Заполнение хедера
            let stringOfRoles = ''

            for (let i = 0; i < currentUser.roles.length; i++) {
                let role = currentUser.roles[i].roleName.slice(5) + ' '

                stringOfRoles += role
            }

            let navbarBrands = document.querySelector('.navbar-brand').children

            navbarBrands[0].textContent = currentUser.email

            navbarBrands[1].textContent = stringOfRoles

            //Заполнение таблицы
            let userData = document.querySelector('#userData').children

            userData[0].textContent = currentUser.name
            userData[1].textContent = currentUser.surname
            userData[2].textContent = currentUser.age
            userData[3].textContent = currentUser.email
            userData[4].textContent = stringOfRoles
        })
