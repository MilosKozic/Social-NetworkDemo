import { useState } from 'react'
import { Link } from 'react-router-dom'

export const AllAccounts = ({ accounts, setAccounts }) => {

    const [search, setSearch] = useState('')

    return (
        <main>
            <input className="search" type="text" placeholder="Search people..." onChange={(e) => {
                setSearch(e.target.value.toLowerCase())
            }} />
            <div className="users">
                {accounts?.filter(el => el.firstName.toLowerCase().includes(search))
                    .map(el => <div key={el.id}><Link to={`users/${el?.id}`}>{el?.firstName}<br/>{el?.surname}</Link></div>)}
            </div>
        </main>
    )
}