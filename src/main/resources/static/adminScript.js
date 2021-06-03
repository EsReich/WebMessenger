
    // import {currentUserURL, sendRequest, getStringOfRolesFromArray} from './util.js'
    import * as util from './util.js'
    import {messageURL} from "./util.js";

    const adminApiURL = 'http://localhost:8080/api/admin';

    const usersTableBody = document.querySelector('#usersTableBody')

    const tableRowTemplate =
        document.querySelector('#tableRowTemplate').content.querySelector('tr')

    const editModalBlockTemplate =
        document.querySelector('#editModalBlockTemplate').content.querySelector('td')

    const deleteModalBlockTemplate =
        document.querySelector('#deleteModalBlockTemplate').content.querySelector('td')


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

    function addUserToTable(user) {
        let tableRow = tableRowTemplate.cloneNode(true)
        tableRow.id = 'userTableRow' + user.id
        tableRow.children[0].textContent = user.name
        tableRow.children[1].textContent = user.surname
        tableRow.children[2].textContent = user.age
        tableRow.children[3].textContent = user.email
        tableRow.children[4].textContent = util.getStringOfRolesFromArray(user.roles)

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
            util.openModal(editModal)

            btnCloseEditHeader.addEventListener('click', function () {
                util.closeModal(editModal)
            })

            btnCloseEditFooter.addEventListener('click', function () {
                util.closeModal(editModal)
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


        let stringOfEditRoles = util.getStringOfRolesFromArray(user.roles)
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

            util.sendRequest('PUT', adminApiURL, editedUser).then(editedUser => {
                console.log('PUT user request')

                tableRow.children[0].textContent = editedUser.name
                tableRow.children[1].textContent = editedUser.surname
                tableRow.children[2].textContent = editedUser.age
                tableRow.children[3].textContent = editedUser.email
                tableRow.children[4].textContent = util.getStringOfRolesFromArray(editedUser.roles)

                deleteName.value = editedUser.name
                deleteSurname.value = editedUser.surname
                deleteAge.value = editedUser.age
                deleteEmail.value = editedUser.email
                stringOfDeleteRoles = util.getStringOfRolesFromArray(editedUser.roles)

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

            util.closeModal(editModal)
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
            util.openModal(deleteModal)

            btnCloseDeleteHeader.addEventListener('click', function () {
                util.closeModal(deleteModal)
            })

            btnCloseDeleteFooter.addEventListener('click', function () {
                util.closeModal(deleteModal)
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

            util.sendRequest('DELETE', adminApiURL + '/' + user.id).then(() => {
                console.log('DELETE user request')

                usersTableBody.removeChild(tableRow)
            })

            util.closeModal(deleteModal)
        })

        //==========>
        tableRow.appendChild(editModalBlock)
        tableRow.appendChild(deleteModalBlock)
        usersTableBody.appendChild(tableRow)
    }
    //<======конец функции addUserToTable(user)======>

    util.sendRequest('GET', util.currentUserURL).then(currentUser => {
        console.log('GET current user request')

        globalCurrentUser = currentUser

        //Заполнение хедера
        let navbarBrands = document.querySelector('.navbar-brand').children
        navbarBrands[0].textContent = currentUser.email
        navbarBrands[1].textContent = util.getStringOfRolesFromArray(currentUser.roles)
        //Заполнение principal-таблицы
        let principalTableRow = document.querySelector('#principalTableRow')
        principalTableRow.children[0].textContent = currentUser.name
        principalTableRow.children[1].textContent = currentUser.surname
        principalTableRow.children[2].textContent = currentUser.age
        principalTableRow.children[3].textContent = currentUser.email
        principalTableRow.children[4].textContent = util.getStringOfRolesFromArray(currentUser.roles)

        //Вывод сообщений чата
        util.sendRequest('GET', util.messageURL).then(messages => {
            console.log('GET all messages request')

            util.printChat(messages, currentUser)

            // messages.forEach(function (message) {
                // if (currentUser.name + ' ' + currentUser.surname === message.author) {
                //     //Создание отправленного сообщения
                //     util.printSentMessage(util.sentMsgTemplate
                //         , message, util.messageURL, util.chatBody)
                // } else {
                //     //Создание полученного сообщения
                //     util.printReceivedMessage(util.receivedMsgTemplate, message
                //         , currentUser, util.messageURL, util.chatBody)
                // }
            // })

            util.toggleEmptyChatLabel(util.chatBody)
        })

        let messageForm = document.querySelector('#msgForm')
        let newMsgTextarea = messageForm.querySelector('textarea')

        messageForm.addEventListener('submit', function (evt) {
            evt.preventDefault()

            let newMessage = {
                author: currentUser.name + ' ' + currentUser.surname,
                content: newMsgTextarea.value,
                edited: false
            }

            util.sendRequest('POST', util.messageURL, newMessage).then(newMessage => {
                console.log('POST new message request')

                // util.printSentMessage(util.sentMsgTemplate
                //     , newMessage, util.messageURL, util.chatBody)
                //
                // util.toggleEmptyChatLabel(util.chatBody)

                newMsgTextarea.value = ''
            })
        })
        //========Конец скрипта для чата========
    })

    //Заполнение таблицы юзеров
    util.sendRequest('GET', adminApiURL).then(users => {
        console.log('GET all users request... No reboot!')

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

        util.sendRequest('POST', adminApiURL, newUser).then(user => {
            console.log('POST new user request')

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

    //Периодический опрос сервера на предмет новых сообщений

    let globalMessages
    let globalCurrentUser
    let num = 1

    util.sendRequest('GET', util.messageURL).then(messages => {
        globalMessages = messages
        console.log(globalMessages)
        console.log('globalMessages 1')
    })

    setInterval(function () {
        // let localMessages = globalMessages
        util.sendRequest('GET', util.messageURL).then(updatedMessages => {

            let localMessages = globalMessages

            for (let i = 0; i < updatedMessages.length; i++) {
                if (updatedMessages.length != localMessages.length) {
                    console.log('срабатывание на длину ' + num++ + ': длина пришедшего массива - '
                    + updatedMessages.length + ", длина основного массива - "
                        + localMessages.length)


                    localMessages = updatedMessages

                    util.printChat(updatedMessages, globalCurrentUser)
                    break
                }

                // if (updatedMessages[i] != localMessages[i]) {
                if (JSON.stringify(updatedMessages[i]) != JSON.stringify(localMessages[i])) {
                    console.log('срабатывание на содержание ' + num++ + ', несовпадение ' +
                        'в элменте ' + i)

                    console.log('пришедший массив: ')
                    console.log(updatedMessages)
                    console.log('эдемент ' + i + ' пришедшего массива: ')
                    console.log(updatedMessages[i])

                    console.log('основной массив: ')
                    console.log(localMessages)
                    console.log('основной массив: ')
                    console.log('эдемент ' + i + ' основного массива: ')
                    console.log(localMessages[i])

                    localMessages = updatedMessages

                    util.printChat(updatedMessages, globalCurrentUser)
                    break
                }
            }

            // for (let i = 0; i < updatedMessages.length; i++) {
            //     if (updatedMessages.length != localMessages.length) {
            //         localMessages = updatedMessages
            //
            //         console.log('срабатывание на длину ' + num++)
            //         break
            //     }
            //
            //     if (updatedMessages[i] != localMessages[i]) {
            //         localMessages = updatedMessages
            //
            //         console.log('срабатывание на содержание ' + num++ + '/ ' + i)
            //     }
            // }

            globalMessages = localMessages
        })

    }, 15000)

    function compare(a1, a2) {
        return a1.length == a2.length && a1.every((v,i) => v === a2[i])
    }