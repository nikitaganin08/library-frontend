import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED } from './queries'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useEffect(() => {
        const token = window.localStorage.getItem('library-user-token')
        if (token) {
            setToken(token)
        }
    }, [])

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            console.log(subscriptionData)
            window.alert(subscriptionData.data.bookAdded.title + ' book was added')
        }
    })

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token ? <button onClick={() => setPage('add')}>add book</button> : null}
                {token ? <button onClick={() => logout()}>logout</button>
                    : <button onClick={() => setPage('login')}>login</button>}
            </div>

            <Authors
                show={page === 'authors'}
            />

            <Books
                show={page === 'books'}
            />

            <NewBook
                show={page === 'add'}
            />

            <LoginForm
                show={page === 'login'}
                setToken={setToken}
            />

        </div>
    )
}

export default App