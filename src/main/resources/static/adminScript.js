
    const currentUserURL = 'http://localhost:8080/api/current';
    const adminApiURL = 'http://localhost:8080/api/admin';

    const usersTableBody = document.querySelector('#usersTableBody')

    const tableRowTemplate =
        document.querySelector('#tableRowTemplate').content.querySelector('tr')

    const editModalBlockTemplate =
        document.querySelector('#editModalBlockTemplate').content.querySelector('td')

    const deleteModalBlockTemplate =
        document.querySelector('#deleteModalBlockTemplate').content.querySelector('td')


    function sendRequest(method, url, body) {
        let headers = {
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
                let e = new Error('Failure to receive data')
                e.data = error
                throw e
            })
        })
    }

    function getStringOfRolesFromArray(roles) {
        let stringOfRoles = ''
        for (let i = 0; i < roles.length; i++) {
            let role = roles[i].roleName.slice(5) + ' '
            stringOfRoles += role
        }
        return stringOfRoles
    }

    function getArrayOfRolesFromSelectElement(selectElement) {
        let roles = []
        let index = 0
        for (let i = 0; i < selectElement.children.length; i++) {
            if (selectElement.children[i].selected) {
                roles[index] = {
                    id: i + 1,
                    roleName: selectElement.children[i].value
                }
                index++
            }
        }
        return roles
    }

    let clickCloseFabric = (modal) => {
        return (evt) => {
            if (evt.target == modal) {
                closeModal(modal)
            }
        }
    }

    let keydownCloseFabric = (modal) => {
        return (evt) => {
            if (evt.keyCode == 27) {
                closeModal(modal)
            }
        }
    }

    function openModal(modal) {
        document.querySelector('#backdrop').style.display = 'block'
        modal.style.display = 'block'
        modal.classList.add('show')

        let clickCloseModal = clickCloseFabric(modal)
        let keydownCloseModal = keydownCloseFabric(modal)

        window.addEventListener('click', clickCloseModal)
        window.addEventListener('keydown', keydownCloseModal)
    }

    function closeModal(modal) {
        document.querySelector('#backdrop').style.display = 'none'
        modal.style.display = 'none'
        modal.classList.remove('show')

        let clickCloseModal = clickCloseFabric(modal)
        let keydownCloseModal = keydownCloseFabric(modal)

        window.removeEventListener('click', clickCloseModal)
        window.removeEventListener('keydown', keydownCloseModal)
    }

    function addUserToTable(user) {
        let tableRow = tableRowTemplate.cloneNode(true)
        tableRow.id = 'userTableRow' + user.id
        tableRow.children[0].textContent = user.name
        tableRow.children[1].textContent = user.surname
        tableRow.children[2].textContent = user.age
        tableRow.children[3].textContent = user.email
        tableRow.children[4].textContent = getStringOfRolesFromArray(user.roles)

        //    <<Создание и добавление модальных блоков для edit и delete>>

        // Edit
        let editModalBlock = editModalBlockTemplate.cloneNode(true)

        let editModal = editModalBlock.children[1]
        editModal.id += user.id

        let editModalActivatingBtn = editModalBlock.children[0]
        editModalActivatingBtn.id += user.id
        let btnCloseEditHeader = editModal.querySelector('#btnCloseEditHeader')
        btnCloseEditHeader.id += user.id
        let btnCloseEditFooter = editModal.querySelector('#btnCloseEditFooter')
        btnCloseEditFooter.id += user.id

        editModalActivatingBtn.addEventListener('click', function () {
            openModal(editModal)

            btnCloseEditHeader.addEventListener('click', function () {
                closeModal(editModal)
            })

            btnCloseEditFooter.addEventListener('click', function () {
                closeModal(editModal)
            })
        })


        let editForm = editModal.querySelector('#edit-form')
        editForm.id += user.id

        let editId = editForm.querySelector('#edit_id')
        editId.value = user.id
        editId.id += user.id

        let editName = editForm.querySelector('#edit_name')
        editName.value = user.name
        editName.id += user.id

        let editSurname = editForm.querySelector('#edit_surname')
        editSurname.value = user.surname
        editSurname.id += user.id

        let editAge = editForm.querySelector('#edit_age')
        editAge.value = user.age
        editAge.id += user.id

        let editEmail = editForm.querySelector('#edit_email')
        editEmail.value = user.email
        editEmail.id += user.id

        let editPassword = editForm.querySelector('#edit_password')
        editPassword.value = user.password
        editPassword.id += user.id


        let stringOfEditRoles = getStringOfRolesFromArray(user.roles)
        if (stringOfEditRoles.includes('USER')) {
            editForm.querySelector('#edit_roles').children[0].selected = true
        }
        if (stringOfEditRoles.includes('ADMIN')) {
            editForm.querySelector('#edit_roles').children[1].selected = true
        }

        let editRolesSelectElement = editForm.querySelector('#edit_roles')
        editRolesSelectElement.id += user.id


        editForm.addEventListener('submit', function (evt) {
            evt.preventDefault()

            let editedUser = {
                id: editId.value,
                name: editName.value,
                surname: editSurname.value,
                age: editAge.value,
                email: editEmail.value,
                password: editPassword.value,
                roles: getArrayOfRolesFromSelectElement(editRolesSelectElement)
            }

            sendRequest('PATCH', adminApiURL, editedUser).then(editedUser => {
                console.log('PATCH request')

                tableRow.children[0].textContent = editedUser.name
                tableRow.children[1].textContent = editedUser.surname
                tableRow.children[2].textContent = editedUser.age
                tableRow.children[3].textContent = editedUser.email
                tableRow.children[4].textContent = getStringOfRolesFromArray(editedUser.roles)

                deleteName.value = editedUser.name
                deleteSurname.value = editedUser.surname
                deleteAge.value = editedUser.age
                deleteEmail.value = editedUser.email
                stringOfDeleteRoles = getStringOfRolesFromArray(editedUser.roles)

                if (stringOfDeleteRoles.includes('USER')) {
                    deleteRolesSelectElement.children[0].selected = true
                } else {
                    deleteRolesSelectElement.children[0].selected = false
                }
                if (stringOfDeleteRoles.includes('ADMIN')) {
                    deleteRolesSelectElement.children[1].selected = true
                } else {
                    deleteRolesSelectElement.children[1].selected = false
                }
            })

            closeModal(editModal)
        })

        //Delete
        let deleteModalBlock = deleteModalBlockTemplate.cloneNode(true)

        let deleteModal = deleteModalBlock.children[1]
        deleteModal.id += user.id

        let deleteModalActivatingBtn = deleteModalBlock.children[0]
        deleteModalActivatingBtn.id += user.id
        let btnCloseDeleteHeader = deleteModal.querySelector('#btnCloseDeleteHeader')
        btnCloseDeleteHeader.id += user.id
        let btnCloseDeleteFooter = deleteModal.querySelector('#btnCloseDeleteFooter')
        btnCloseDeleteFooter.id += user.id

        deleteModalActivatingBtn.addEventListener('click', function () {
            openModal(deleteModal)

            btnCloseDeleteHeader.addEventListener('click', function () {
                closeModal(deleteModal)
            })

            btnCloseDeleteFooter.addEventListener('click', function () {
                closeModal(deleteModal)
            })
        })


        let deleteForm = deleteModal.querySelector('#delete-form')
        deleteForm.id += user.id

        let deleteId = deleteForm.querySelector('#delete_id')
        deleteId.value = user.id
        deleteId.id += user.id

        let deleteName = deleteForm.querySelector('#delete_name')
        deleteName.value = editName.value
        deleteName.id += user.id

        let deleteSurname = deleteForm.querySelector('#delete_surname')
        deleteSurname.value = editSurname.value
        deleteSurname.id += user.id

        let deleteAge = deleteForm.querySelector('#delete_age')
        deleteAge.value = editAge.value
        deleteAge.id += user.id

        let deleteEmail = deleteForm.querySelector('#delete_email')
        deleteEmail.value = editEmail.value
        deleteEmail.id += user.id

        let deleteRolesSelectElement = deleteForm.querySelector('#delete_roles')
        deleteRolesSelectElement.id += user.id

        let stringOfDeleteRoles = stringOfEditRoles
        if (stringOfDeleteRoles.includes('USER')) {
            deleteRolesSelectElement.children[0].selected = true
        }
        if (stringOfDeleteRoles.includes('ADMIN')) {
            deleteRolesSelectElement.children[1].selected = true
        }


        deleteForm.addEventListener('submit', function (evt) {
            evt.preventDefault()

            sendRequest('DELETE', adminApiURL + '/' + user.id).then(deletedUser => {
                console.log('DELETE request')

                usersTableBody.removeChild(tableRow)
            })

            closeModal(deleteModal)
        })

        //==========>
        tableRow.appendChild(editModalBlock)
        tableRow.appendChild(deleteModalBlock)
        usersTableBody.appendChild(tableRow)
    }
    //<==============>

    sendRequest('GET', currentUserURL).then(currentUser => {
        console.log('GET current request')

        //Заполнение хедера
        let navbarBrands = document.querySelector('.navbar-brand').children
        navbarBrands[0].textContent = currentUser.email
        navbarBrands[1].textContent = getStringOfRolesFromArray(currentUser.roles)
        //Заполнение principal-таблицы
        let principalTableRow = document.querySelector('#principalTableRow')
        principalTableRow.children[0].textContent = currentUser.name
        principalTableRow.children[1].textContent = currentUser.surname
        principalTableRow.children[2].textContent = currentUser.age
        principalTableRow.children[3].textContent = currentUser.email
        principalTableRow.children[4].textContent = getStringOfRolesFromArray(currentUser.roles)
    })

    //Заполнение таблицы юзеров
    sendRequest('GET', adminApiURL).then(users => {
        console.log('GET all request... No reboot!')

        for (let i = 0; i < users.length; i++) {
            addUserToTable(users[i])
        }
    })
    //<=======================>

    //Добавление нового юзера
    let name = document.querySelector('#name')
    let surname = document.querySelector('#surname')
    let age = document.querySelector('#age')
    let email = document.querySelector('#email')
    let password = document.querySelector('#password')
    let newRoles = document.querySelector('#new_roles')
    let newUserForm = document.querySelector('#newUserForm')

    newUserForm.addEventListener('submit', function (evt) {
        evt.preventDefault()

        let newUser = {
            name: name.value,
            surname: surname.value,
            age: age.value,
            email: email.value,
            password: password.value,
            roles: getArrayOfRolesFromSelectElement(newRoles)
        }

        sendRequest('POST', adminApiURL, newUser).then(user => {
            console.log('POST request')

            addUserToTable(user)
        })

        let tableTab = document.querySelector('#table-tab')
        let newUserTab = document.querySelector('#newUser-tab')
        tableTab.classList.add('active')
        newUserTab.classList.remove('active')

        let tableDiv = document.querySelector('#table')
        let newUserDiv = document.querySelector('#newUser')
        tableDiv.classList.add('show')
        tableDiv.classList.add('active')
        newUserDiv.classList.remove('show')
        newUserDiv.classList.remove('active')

        name.value = ''
        surname.value = ''
        age.value = ''
        email.value = ''
        password.value = ''

        for (let i = 0; i < newRoles.children.length; i++) {
            newRoles.children[i].selected = false
        }
    })
    //<=======================>
