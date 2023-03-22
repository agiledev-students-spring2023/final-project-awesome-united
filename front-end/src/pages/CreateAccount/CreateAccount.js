import './CreateAccount.css';

function CreateAccount(){
  return (
    <div className='CreateAccount'>
      <header>
        <h1>
          Create Account
        </h1>
      </header>
      <div className='FullName'>
        Full Name:
      </div>
      <div className='Username'>
        Username:
      </div>
      <div className='Password'>
        Password:
      </div>
      <div className='EmailAddress'>
        Email Address:
      </div>
      <div className='ProfilePhoto'>
        Profile Photo:
      </div>
      <div className='Location'>
        Location:
      </div>
      <div className='Country'>
        Country:
      </div>
      <div className='State'>
        State:
      </div>
      <div className='City'>
        City:
      </div>
      <div className='Address'>
        Address:
      </div>
      <button className='Create'>
          <div>
            Create
          </div>
      </button>
    </div>
  );
}

export default CreateAccount; 