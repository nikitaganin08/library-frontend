import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show }) => {
    const [authorName, setAuthorName] = useState('')
    const [authorBirthyear, setAuthorBirthyear] = useState('')
    const result = useQuery(ALL_AUTHORS)
    const [editAuthor] = useMutation(EDIT_AUTHOR)
    if (!show) {
        return null
    }

    if (result.loading) {
        return <div>
            loading...
        </div>
    }
    const authors = result.data.allAuthors

    const updateAuthor = async (event) => {
        event.preventDefault()
        console.log(authorName)
        console.log(authorBirthyear)
        await editAuthor({
            variables: { name: authorName, born: authorBirthyear }
        })

        setAuthorBirthyear('')
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th>
                        born
                        </th>
                        <th>
                        books
                        </th>
                    </tr>
                    {authors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>Set birthyear</h2>
            <form onSubmit={updateAuthor}>
                <div>
                    name
                    <select
                        value={authorName}
                        onChange={({ target }) => setAuthorName(target.value)}>
                        {authors.map(a =>
                            <option key={a.id} value={a.name}>{a.name}</option>)}
                    </select>
                </div>
                <div>
                    born
                    <input
                        type='number'
                        value={authorBirthyear}
                        onChange={({ target }) => setAuthorBirthyear(Number(target.value))}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default Authors
