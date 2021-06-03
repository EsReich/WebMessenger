
    // import {currentUserURL, getStringOfRolesFromArray, sendRequest} from './util.js'
    import * as util from './util.js'

    // const messageURL = 'http://localhost:8080/api/message'
    // const receivedMsgTemplate =
    //     document.querySelector('#receivedMsgTemplate').content.querySelector('div')
    // const sentMsgTemplate =
    //     document.querySelector('#sentMsgTemplate').content.querySelector('div')


    util.sendRequest('GET', util.currentUserURL).then(currentUser => {
        console.log('GET current user request')

            //Заполнение хедера
            let navbarBrands = document.querySelector('.navbar-brand').children

            navbarBrands[0].textContent = currentUser.email

            navbarBrands[1].textContent = util.getStringOfRolesFromArray(currentUser.roles)

            //Заполнение таблицы
            let userData = document.querySelector('#userData').children

            userData[0].textContent = currentUser.name
            userData[1].textContent = currentUser.surname
            userData[2].textContent = currentUser.age
            userData[3].textContent = currentUser.email
            userData[4].textContent = util.getStringOfRolesFromArray(currentUser.roles)

            //Вывод сообщений чата


            // let chatBody = document.querySelector('#chatBody')

            // function toggleEmptyChatLabel() {
            //     let emptyChatLabel = chatBody.querySelector('.empty_chat_label')
            //     if (chatBody.children.length > 3) {
            //         emptyChatLabel.classList.add('hidden')
            //     } else {
            //         emptyChatLabel.classList.remove('hidden')
            //     }
            // }

            util.sendRequest('GET', util.messageURL).then(messages => {
                console.log('GET all messages request')

                messages.forEach(function (message) {
                    if (currentUser.name + ' ' + currentUser.surname === message.author) {
                        //Создание отправленного сообщения

                        util.printSentMessage(util.sentMsgTemplate
                            , message, util.messageURL, util.chatBody)

                        // let sentMessage = sentMsgTemplate.cloneNode(true)
                        // sentMessage.id += message.id
                        //
                        // let sentAuthor = sentMessage.querySelector('#authorSent')
                        // sentAuthor.id += message.id
                        // sentAuthor.textContent = 'You' + ':'
                        //
                        // let sentContent = sentMessage.querySelector('#contentSent')
                        // sentContent.id += message.id
                        // sentContent.textContent = message.content
                        //
                        // let sentMeta = sentMessage.querySelector('#metaSent')
                        // sentMeta.id += message.id
                        // util.printMetaData(sentMeta, message)
                        //
                        // let deleteSentMsgBtn = sentMessage.querySelector('#deleteSentMsgBtn')
                        // deleteSentMsgBtn.id += message.id
                        //
                        // deleteSentMsgBtn.addEventListener('click', function () {
                        //     util.sendRequest('DELETE', messageURL + '/' + message.id)
                        //         .then(() => {
                        //             console.log('DELETE sent message request')
                        //
                        //             chatBody.removeChild(sentMessage)
                        //             toggleEmptyChatLabel()
                        //         })
                        // })
                        //
                        // let editMsgModalActivatingBtn =
                        //     sentMessage.querySelector('#editMsgModalActivatingBtn')
                        // editMsgModalActivatingBtn.id += message.id
                        // let editSentMsgModal = sentMessage.querySelector('#editSentMsgModal')
                        // editSentMsgModal.id += message.id
                        // let btnCloseEditSentMsgHeader =
                        //     sentMessage.querySelector('#btnCloseEditSentMsgHeader')
                        // btnCloseEditSentMsgHeader.id += message.id
                        // let btnCloseEditSentMsgFooter =
                        //     sentMessage.querySelector('#btnCloseEditSentMsgFooter')
                        // btnCloseEditSentMsgFooter.id += message.id
                        //
                        // editMsgModalActivatingBtn.addEventListener('click', function () {
                        //     util.openModal(editSentMsgModal)
                        //
                        //     btnCloseEditSentMsgHeader
                        //         .addEventListener('click', function () {
                        //             util.closeModal(editSentMsgModal)
                        //     })
                        //
                        //     btnCloseEditSentMsgFooter
                        //         .addEventListener('click', function () {
                        //             util.closeModal(editSentMsgModal)
                        //     })
                        // })
                        //
                        // let editSentMsgForm = sentMessage.querySelector('#editSentMsgForm')
                        // editSentMsgForm.id += message.id
                        // let editSentMsgTextarea = sentMessage.querySelector('textarea')
                        // editSentMsgTextarea.id = 'editSentMsgTextarea' + message.id
                        // editSentMsgTextarea.textContent = message.content
                        //
                        // editSentMsgForm.addEventListener('submit', function (evt) {
                        //     evt.preventDefault()
                        //
                        //     let editedMessage = {
                        //         id: message.id,
                        //         author: message.author,
                        //         content: editSentMsgTextarea.value,
                        //         edited: true
                        //     }
                        //
                        //     util.sendRequest('PUT', messageURL, editedMessage)
                        //         .then(editedMessage => {
                        //             console.log('PUT message request')
                        //
                        //             sentContent.textContent = editedMessage.content
                        //
                        //             util.printMetaData(sentMeta, editedMessage)
                        //     })
                        //
                        //     util.closeModal(editSentMsgModal)
                        // })
                        //
                        // chatBody.appendChild(sentMessage)
                    } else {
                        //Создание полученного сообщения

                        util.printReceivedMessage(util.receivedMsgTemplate, message
                            , currentUser, util.messageURL, util.chatBody)

                        // let receivedMessage = receivedMsgTemplate.cloneNode(true)
                        // receivedMessage.id += message.id
                        //
                        // let receivedAuthor = receivedMessage.querySelector('#authorReceived')
                        // receivedAuthor.id += message.id
                        // receivedAuthor.textContent = message.author + ':'
                        //
                        // let receivedContent = receivedMessage.querySelector('#contentReceived')
                        // receivedContent.id += message.id
                        // receivedContent.textContent = message.content
                        //
                        // let receivedMeta = receivedMessage.querySelector('#metaReceived')
                        // receivedMeta.id += message.id
                        // util.printMetaData(receivedMeta, message)
                        //
                        // let principalRoles = util.getStringOfRolesFromArray(currentUser.roles)
                        // if (principalRoles.includes('ADMIN')) {
                        //     let deleteReceivedMsgBtn =
                        //         receivedMessage.querySelector('#deleteReceivedMsgBtn')
                        //     deleteReceivedMsgBtn.id += message.id
                        //
                        //     deleteReceivedMsgBtn.addEventListener('click', function () {
                        //         util.sendRequest('DELETE', messageURL + '/' + message.id)
                        //             .then(() => {
                        //                 console.log('DELETE received message request')
                        //
                        //                 chatBody.removeChild(receivedMessage)
                        //                 toggleEmptyChatLabel()
                        //             })
                        //     })
                        // } else {
                        //     let dropdown = receivedMessage.querySelector('.dropdown')
                        //     receivedMessage.children[0].removeChild(dropdown)
                        // }
                        // chatBody.appendChild(receivedMessage)
                    }
                })

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

                    util.printSentMessage(util.sentMsgTemplate
                        , newMessage, util.messageURL, util.chatBody)

                    util.toggleEmptyChatLabel(util.chatBody)

                    newMsgTextarea.value = ''
                })
            })
        })
