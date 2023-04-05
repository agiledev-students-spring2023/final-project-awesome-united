import "./Match.css"

const Match = props => {
  // this component expects to receive 'name', 'chatPreview', and 'handleClick' values passed as arguments to it
  // react automatically bundles these arguments into an object called props
  return (
    <article id="myDIV">
      <img className="profileImage" src={props.profileImg} onClick={props.handleImageClick} />
      <div className="chat" onClick={props.handleClick}>
          <div className="matchName">{props.name}</div>
          <div className="chatPrev">{props.chatPreview}</div>
      </div>
    </article>
  )
}

export default Match