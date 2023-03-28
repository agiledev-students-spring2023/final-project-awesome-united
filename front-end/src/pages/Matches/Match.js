import "./Match.module.css"

const Match = props => {
  // this component expects to receive 'name', 'chatPreview', and 'handleClick' values passed as arguments to it
  // react automatically bundles these arguments into an object called props
  return (
    <main className="Home">
        <article id="myDIV">
          <img className="profileImage" src={props.profileImg} onClick={props.handleImageClick} />
          <div onClick={props.handleClick}>
              <div className="matchName">{props.name}</div>
              <div className="chatPrev">{props.chatPreview}</div>
          </div>
        </article>
    </main>
  )
}

export default Match