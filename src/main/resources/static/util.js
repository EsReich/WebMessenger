
    export const currentUserURL = 'http://localhost:8080/api/current'

    export function sendRequest(method, url, body) {
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

    export function getStringOfRolesFromArray(roles) {
        // let stringOfRoles = ''
        // for (let i = 0; i < roles.length; i++) {
        //     let role = roles[i].roleName.slice(5) + ' '
        //     stringOfRoles += role
        // }
        // return stringOfRoles
        let stringOfRoles = ''
        roles.forEach(role => {
            role = role.roleName.slice(5) + ' '
            stringOfRoles += role
        })
        return stringOfRoles
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

    export function openModal(modal) {
        document.querySelector('#backdrop').style.display = 'block'
        modal.style.display = 'block'
        modal.classList.add('show')

        let clickCloseModal = clickCloseFabric(modal)
        let keydownCloseModal = keydownCloseFabric(modal)

        window.addEventListener('click', clickCloseModal)
        window.addEventListener('keydown', keydownCloseModal)
    }

    export function closeModal(modal) {
        document.querySelector('#backdrop').style.display = 'none'
        modal.style.display = 'none'
        modal.classList.remove('show')

        let clickCloseModal = clickCloseFabric(modal)
        let keydownCloseModal = keydownCloseFabric(modal)

        window.removeEventListener('click', clickCloseModal)
        window.removeEventListener('keydown', keydownCloseModal)
    }

    //===========================================

    //Chat utils

    export const messageURL = 'http://localhost:8080/api/message'
    export const receivedMsgTemplate =
        document.querySelector('#receivedMsgTemplate').content.querySelector('div')
    export const sentMsgTemplate =
        document.querySelector('#sentMsgTemplate').content.querySelector('div')
    export const chatBody = document.querySelector('#chatBody')

    export function printMetaData(metaData, message) {
        if (message.edited === true) {
            metaData.children[0].textContent = 'Edited'
            metaData.children[0]
                .setAttribute('style', 'font-weight: bold')
        } else {
            metaData.children[0].textContent = 'Sent'
        }
        metaData.children[1].textContent =
            ' on ' + message.currentDateAndTime.substr(0, 10)
            + ' at ' + message.currentDateAndTime.substr(11, 5)
    }

    export function toggleEmptyChatLabel(chatBody) {
        let emptyChatLabel = chatBody.querySelector('.empty_chat_label')
        if (chatBody.children.length > 3) {
            emptyChatLabel.classList.add('hidden')
        } else {
            emptyChatLabel.classList.remove('hidden')
        }
    }

    export function printSentMessage(messageTemplate, message, messageURL, chatBody) {
        let sentMessage = messageTemplate.cloneNode(true)
        sentMessage.id += message.id

        let sentAuthor = sentMessage.querySelector('#authorSent')
        sentAuthor.id += message.id
        sentAuthor.textContent = 'You' + ':'

        let sentContent = sentMessage.querySelector('#contentSent')
        sentContent.id += message.id
        sentContent.textContent = message.content

        let sentMeta = sentMessage.querySelector('#metaSent')
        sentMeta.id += message.id
        printMetaData(sentMeta, message)

        let deleteSentMsgBtn = sentMessage.querySelector('#deleteSentMsgBtn')
        deleteSentMsgBtn.id += message.id

        deleteSentMsgBtn.addEventListener('click', function () {
            sendRequest('DELETE', messageURL + '/' + message.id)
                .then(() => {
                    console.log('DELETE sent message request')

                    chatBody.removeChild(sentMessage)
                    toggleEmptyChatLabel(chatBody)
                })
        })

        let editMsgModalActivatingBtn =
            sentMessage.querySelector('#editMsgModalActivatingBtn')
        editMsgModalActivatingBtn.id += message.id
        let editSentMsgModal = sentMessage.querySelector('#editSentMsgModal')
        editSentMsgModal.id += message.id
        let btnCloseEditSentMsgHeader =
            sentMessage.querySelector('#btnCloseEditSentMsgHeader')
        btnCloseEditSentMsgHeader.id += message.id
        let btnCloseEditSentMsgFooter =
            sentMessage.querySelector('#btnCloseEditSentMsgFooter')
        btnCloseEditSentMsgFooter.id += message.id

        editMsgModalActivatingBtn.addEventListener('click', function () {
            openModal(editSentMsgModal)

            btnCloseEditSentMsgHeader
                .addEventListener('click', function () {
                    closeModal(editSentMsgModal)
                })

            btnCloseEditSentMsgFooter
                .addEventListener('click', function () {
                    closeModal(editSentMsgModal)
                })
        })

        let editSentMsgForm = sentMessage.querySelector('#editSentMsgForm')
        editSentMsgForm.id += message.id
        let editSentMsgTextarea = sentMessage.querySelector('textarea')
        editSentMsgTextarea.id = 'editSentMsgTextarea' + message.id
        editSentMsgTextarea.textContent = message.content

        editSentMsgForm.addEventListener('submit', function (evt) {
            evt.preventDefault()

            let editedMessage = {
                id: message.id,
                author: message.author,
                content: editSentMsgTextarea.value,
                edited: true
            }

            sendRequest('PUT', messageURL, editedMessage)
                .then(editedMessage => {
                    console.log('PUT message request')

                    sentContent.textContent = editedMessage.content

                    printMetaData(sentMeta, editedMessage)
                })

            closeModal(editSentMsgModal)
        })

        chatBody.appendChild(sentMessage)
    }

    export function printReceivedMessage(messageTemplate, message
                                         , currentUser, messageURL, chatBody) {
        let receivedMessage = messageTemplate.cloneNode(true)
        receivedMessage.id += message.id

        let receivedAuthor = receivedMessage.querySelector('#authorReceived')
        receivedAuthor.id += message.id
        receivedAuthor.textContent = message.author + ':'

        let receivedContent = receivedMessage.querySelector('#contentReceived')
        receivedContent.id += message.id
        receivedContent.textContent = message.content

        let receivedMeta = receivedMessage.querySelector('#metaReceived')
        receivedMeta.id += message.id
        printMetaData(receivedMeta, message)

        let principalRoles = getStringOfRolesFromArray(currentUser.roles)
        if (principalRoles.includes('ADMIN')) {
            let deleteReceivedMsgBtn =
                receivedMessage.querySelector('#deleteReceivedMsgBtn')
            deleteReceivedMsgBtn.id += message.id

            deleteReceivedMsgBtn.addEventListener('click', function () {
                sendRequest('DELETE', messageURL + '/' + message.id)
                    .then(() => {
                        console.log('DELETE received message request')

                        chatBody.removeChild(receivedMessage)
                        toggleEmptyChatLabel(chatBody)
                    })
            })
        } else {
            let dropdown = receivedMessage.querySelector('.dropdown')
            receivedMessage.children[0].removeChild(dropdown)
        }
        chatBody.appendChild(receivedMessage)
    }

    export function printChat(messages, currentUser) {
        messages.forEach(function (message) {
        if (currentUser.name + ' ' + currentUser.surname === message.author) {
            //Создание отправленного сообщения
            printSentMessage(sentMsgTemplate
                , message, messageURL, chatBody)
        } else {
            //Создание полученного сообщения
            printReceivedMessage(receivedMsgTemplate, message
                , currentUser, messageURL, chatBody)
        }
        })
    }
