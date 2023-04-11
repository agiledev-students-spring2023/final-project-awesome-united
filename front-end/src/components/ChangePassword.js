const ChangePassword = props => {
    return (
        <div>
            <h1>
        Change Your Password
            </h1>
            <form>
            <label>Enter your current password: 
                <input type="text" value = "" onChange ={''}/>
            </label>
            <p></p>
            <label>Enter your new password: 
                <input type="text" value = "" onChange ={''}/>
            </label>
            </form>
        </div>
    )
  }
  
  export default ChangePassword