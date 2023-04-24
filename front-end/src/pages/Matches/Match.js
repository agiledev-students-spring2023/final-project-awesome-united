import { useState, useEffect } from "react"
import "./Match.css"
import axios from "axios"

const Match = props => {


  const [otherUser,setOtherUser] = useState(null)

  useEffect(()=>{
    console.log("IDK why")

    // if element (id) in member not equals current logged in user id,
    const otherId = props.match.members.find(m => m !== props.currentUser.id)
    const getUser = async ()=>{
      try{
        const res = await axios("/User?userId="+otherId)
        setOtherUser(res.data)
        console.log(res)
      }catch(err){
        console.log(err)
        // REMOVE WHEN DONE
        console.log(props.match)
        // remove when done
        setOtherUser(props.match)
        console.log("OVA HERE INGLAND")
        console.log(props.match)
      }
    };
    getUser()
  },[props.currentUser, props.match])


  // this component expects to receive 'name', 'chatPreview', and 'handleClick' values passed as arguments to it
  // react automatically bundles these arguments into an object called props
  return (
    <article id="myDIV">
      <img className="profileImage" 
        src={ /* otherUser.profilePhoto ? otherUser.profilePhoto : `${process.env.PUBLIC_URL}/no-profile-pic.webp` */ `${process.env.PUBLIC_URL}/no-profile-pic.webp`} 
        onClick={props.handleImageClick} />
      <div className="chat" onClick={props.handleClick}>
          {/* for buyer POV, they will see the name of t*/}
          <div className="matchName">{ /*  otherUser.firstName + " " + otherUser.lastName */ }</div>
          {/* <div className="chatPrev">{props.chatPreview}</div> */}
      </div>
    </article>
  )
}

export default Match