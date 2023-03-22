import "./Match.css"

const Match = props => {
  // this component expects to receive 'name', 'chatPreview', and 'handleClick' values passed as arguments to it
  // react automatically bundles these arguments into an object called props
  return (
    <main className="Home">
        <section>
          <article id="row">
            <div>
              <img className="profileImage" src={props.MatchImg} alt="{props.name}" onClick={props.handleImageClick} />
            </div>
            <div id="myDIV" onClick={props.handleClick}>
                <div className="matchName">{props.name}</div>
                <div className="chatPrev">{props.chatPreview}</div>
            </div>
          </article>
        </section>
    </main>
  )
}

export default Match