import { useState } from "react"
import { useParams } from "react-router"
import { Link } from 'react-router-dom'

const User = ({ accounts }) => {
    let { name } = useParams()
    let singleUser = accounts?.filter(el => el.firstName == name)
    let directFriends = accounts?.filter(el => singleUser[0]?.friends.includes(el.id))

    let x = directFriends.map(el => el.id)                             //direct friends id

    let friendsOFfriends = []
    directFriends.map(el => friendsOFfriends.push(el.friends))
    let frOFfriends = [...new Set(friendsOFfriends.flat())]            //friends of friends id
    let friendsF = accounts.filter(el => frOFfriends.includes(el.id))  //friends of friends

    let friendsFriend = friendsF.filter(el => !x.includes(el.id))       
    let friendsFriends = friendsFriend.filter(el => el.id != singleUser[0].id)   //friends of friends without direct friends 

    let possibleFriend = accounts.filter(el => !x.includes(el.id))
    let possibleFriends = possibleFriend.filter(el => el.id != singleUser[0].id)
   
    let suggestedFriends = []

    
    possibleFriends.forEach(element => {
        let arr1 = element.friends.concat(x)
        let arr2 = [...new Set(arr1)]
        if (arr1.length - arr2.length > 1) {
            suggestedFriends.push(element)
        }
    });

    const [friends, setFriends] = useState(false)
    const [fOFf, setfOFf] = useState(false)
    const [suggested, setSuggested] = useState(false)

    return (
        <div id="singleUser">
            <div  className="singleUser">
             <p> First name: <span> {singleUser[0]?.firstName}</span></p>           
             <p> Last name:  <span> {singleUser[0]?.surname}</span></p>
             <p> Age:   <span>{singleUser[0]?.age}</span></p>
             <p> Gender:  <span> {singleUser[0]?.gender}</span></p>
            </div>
           <div className="bt">
            <button id="friends" onClick={() => {
                setFriends(!friends)
                setfOFf(false)
                setSuggested(false)
            }}>My Friends</button>

            <button id="fof" onClick={() => {
                setfOFf(!fOFf)
                setFriends(false)
                setSuggested(false)
            }}>Friends of Friends</button>

            <button id="suggested" onClick={() => {
                setfOFf(false)
                setFriends(false)
                setSuggested(!suggested)
            }}>Suggested Friends</button>
             </div>        
                {
                    friends ?
                       directFriends?.map(el => <div className="friends" key={el.id}><Link to={`${el.firstName}`}>{el.firstName}</Link></div>)
                        :
                        console.log('direct friends')
                }
                {
                    fOFf ?
                        friendsFriends?.map(el => <div className="fof" key={el.id}><Link to={`${el.firstName}`}>{el.firstName}</Link></div>)
                        :
                        console.log('friends friends')
                }
                {
                    suggested ?
                    suggestedFriends?.map(el => <div className="suggested" key={el.id}><Link to={`${el.firstName}`}>{el.firstName}</Link></div>)
                        :
                        console.log('suggested friends')
                }

        </div>
    )
}

export default User