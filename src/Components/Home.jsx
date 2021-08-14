import React, { useState } from "react";

function Home(props) {
  const [username, setUserName] = useState("xxx");
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [norepo,setNoRepo]=useState(false);
  
  const [image, setImage] = useState(
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  );
  const [input, setInput] = useState("");
  const [repos, setRepos] = useState([]);

  const NoRepos=(<h4>No Repos Found</h4>);
  

  function inputSetter(e) {
    setInput(e.target.value);
  }

  function buttonHandler(e) {
      if(input.length==0)
      {
          alert("Enter Github Username");
          return ;
      }
    fetch(`https://api.github.com/users/${input}`)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);

          if (data.message === "Not Found") {
            console.log(data);
                alert("user not found");
                
            } 
        
        
        setUserName(data.login);
        setImage(data.avatar_url);
        setFollowers(data.followers);
        setFollowing(data.following);
      })
      .catch(error=>{
          alert("Server down. Try later");
      });

      

      

    fetch(`https://api.github.com/users/${input}/repos`)
      .then((response) => response.json())
      .then((rep_data) => {
          if(rep_data.length==0){
              setNoRepo(true);
          }

          if(rep_data.message=="Not Found")
          {
            setRepos([]);
          }
          else{
            setRepos(rep_data);
          }

          console.log(rep_data);
        
      })
      .catch(error=>{
        alert("Server down. Try later");
    });
  }

  return (
    <div className="box flexc">
      <div id="input">
        <input style={{
            
            height:"40px",
            width:"200px",
            border:"0",
        }}
          placeholder="Enter Github User Name"
          onChange={inputSetter}
          type="text"
        />
        <button id="search-btn" style={{backgroundColor:"black",color:"white",height:"40px",border:"0",
        borderTopRightRadius:"30px",
        borderBottomRightRadius:"30px",
        cursor:"pointer"
    
    }} onClick={buttonHandler}>SEARCH USER</button>

      </div>

        <div className="left-container flexc">
          <img src={image} alt="" />

          <p>User Name</p>
          <h3>{username}</h3>

          <div className="followers flexr">
            <p style={{ textAlign: "center", margin: "10px" }}>
              Followers: <br /> {followers}
            </p>
            <br />
            <p style={{ textAlign: "center", margin: "10px" }}>
              Following: <br /> {following}
            </p>
          </div>
        </div>

        
        
        <div className="right-container flexc">
        <h3>Repos</h3>
        {norepo?NoRepos:""}
          
          <div style={{width:"100%",padding:"10px"}} className="flexr">
         
          {repos.map((repo) => (
            <div key={repo.id}  className="flexc repo-item" >
              <a href={repo.html_url}><h3 style={{color:"blueviolet",textAlign:"center"}}>{repo.name}</h3></a>
              <p>Watched By: {repo.watchers}</p>
              <p>Forked By: {repo.forks}</p>
              <p>Size: {repo.size} kb</p>
              
            </div>
          ))}

          </div>
          
          

        </div>
      {/* </div> */}
    </div>
  );
}

export default Home;
