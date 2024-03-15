import './index.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function MediaCardsView() {
  const [facebookPostsAccessToken] = useState('EAATOdThZAYZBwBO3EAE3eZCRcebdZBWMn3wr8uwEIPyc3hTehv5mfAV1arVpnZCT3Uq8ezoxxstbgpkFsXMiEunn2iSw76qFe7sqxSatelsgrqF6BR7OZBNvAzpj6jPQidzriW8r2fy8hQe4EtKpUGLEZAfF4SdAOMf0NChkMbI9lAzo556ELa9rH0fxrcQgckZD'); // Replace with your actual Facebook access token
  const [instaAccessToken] = useState('EAATOdThZAYZBwBOxZCL7k4D8ZBDm9FE3p8IXEHNoJ8AkQrlDTBBzFIAOwWtZBp4Ms8wgWIEn9utTJpKp5Xpti2IAb9rR0ZAik0MU6WR0qBhB8zMaEWdlGsPJfgzEeMqFZAMW3e8TKXFIlgGcUQoe4qzpVh3EV6MzrZCWWqH0Icx7baOHDZC80gMxZCLVK2');
  const [facebookAccessToken] = useState('EAATOdThZAYZBwBO3EAE3eZCRcebdZBWMn3wr8uwEIPyc3hTehv5mfAV1arVpnZCT3Uq8ezoxxstbgpkFsXMiEunn2iSw76qFe7sqxSatelsgrqF6BR7OZBNvAzpj6jPQidzriW8r2fy8hQe4EtKpUGLEZAfF4SdAOMf0NChkMbI9lAzo556ELa9rH0fxrcQgckZD');

  const [instaFollowers, setInstaFollowers] = useState(0)
  const [instaPosts, setInstaPosts] = useState(0)
  const [facebookFollowers, setFacebookFollowers] = useState(0)
  const [todayFbPosts, setTodayFbPosts] = useState(0)
  const [todayInstaPosts, setTodayInstaPosts] = useState(0)
  const [postsPhaseOne, setPostsPhaseOne] = useState(0)
  const [postsPhaseTwo, setPostsPhaseTwo] = useState(0)
  const phaseOneStartTime = Math.floor(new Date("1-1-2019").getTime() / 1000);
  const phaseOneEndTime = Math.floor(new Date("1-31-2024").getTime() / 1000);
  const phaseTwoStartTime = Math.floor(new Date("2-1-2024").getTime() / 1000);
  const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  const startOfDayTimestamp = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0).getTime() / 1000;
  const endOfDayTimestamp = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 0, 0, 0, 0).getTime() / 1000;
  const now = new Date()
  const today = `${now.getFullYear()}-${(((now.getMonth() + 1) + "").length === 1 ? "0": "") + (now.getMonth() + 1)}-${now.getDate() - 1}`

  //GET PHASE-1 POSTS & FOLLOWERS
  useEffect(() => {
    axios.get(`https://graph.facebook.com/v19.0/me/posts?limit=100&since=${phaseOneStartTime}&until=${phaseOneEndTime}&access_token=${facebookPostsAccessToken}`)
      .then(res =>{
        setPostsPhaseOne(res.data.data.length);
      })
      .catch(err => {
        console.error(err);
      });
  }, [facebookPostsAccessToken, phaseOneStartTime,phaseOneEndTime])

  //GET PHASE-2 POSTS
  useEffect(() => {
    axios.get(`https://graph.facebook.com/v19.0/me/posts?limit=100&since=${phaseTwoStartTime}&until=${currentTimestamp}&access_token=${facebookPostsAccessToken}`)
      .then(res =>{
        setPostsPhaseTwo(res.data.data.length);
      })
      .catch(err => {
        console.error(err);
      });
  }, [phaseTwoStartTime, currentTimestamp,facebookPostsAccessToken])


  //GET TODAY FACEBOOK POSTS
  useEffect(() => {
    axios.get(`https://graph.facebook.com/v19.0/me/posts?limit=100&since=${startOfDayTimestamp}&until=${endOfDayTimestamp}&access_token=${facebookPostsAccessToken}`)
      .then(res =>{
        setTodayFbPosts(res.data.data.length);      })
      .catch(err => {
        console.error(err);
      });
  }, [startOfDayTimestamp, endOfDayTimestamp, facebookPostsAccessToken])

  //GET FACEBOOK FOLLOWERS
  useEffect(() => {
    axios.get(`https://graph.facebook.com/v19.0/102098129188985?fields=followers_count&access_token=${facebookAccessToken}`)
      .then(res =>{
        setFacebookFollowers(res.data.followers_count);      })
      .catch(err => {
        console.error(err);
      });
  }, [facebookAccessToken])


  //GET INSTAGRAM POSTS & FOLLOWERS
  useEffect(() => {
    axios.get(`https://graph.facebook.com/v19.0/17841453213268234?fields=follows_count,media_count&access_token=${instaAccessToken}`)
      .then(res =>{
        setInstaFollowers(res.data.follows_count);
        setInstaPosts(res.data.media_count)
      })
      .catch(err => {
        console.error(err);
      });
  }, [instaAccessToken])

  //GET INSTAGRAM TODAY POSTS
  useEffect(() => {
    axios.get(`https://graph.facebook.com/v19.0/17841453213268234/media?fields=timestamp&access_token=${instaAccessToken}`)
      .then(res =>{
        console.log(res.data)
        const mediaForDesiredDate = res.data.data.filter(media => {
          const mediaDate = new Date(media.timestamp).toISOString().split('T')[0];
          return mediaDate === today;
        });
            const mediaCountForDesiredDate = mediaForDesiredDate.length;
        setTodayInstaPosts(mediaCountForDesiredDate);
      })
      .catch(err => {
        console.error(err);
      });
  }, [today,instaAccessToken])



  let totalFbPosts = postsPhaseOne+postsPhaseTwo


  const upperCardsList = [
    {
      name:"Facebook",
      path:"https://www.facebook.com/profile.php?id=100081139256325",
      imgUrl: "facebook.webp",
      imageAlt: "facebook",
      posts: totalFbPosts,
      todayPosts: todayFbPosts,
      colors: "to right, white 25%,#1B51DA 75%",
      borderColor: "#1B51DA"
    },
    {
      name:"Instagram",
      path:"https://www.instagram.com/beedata_technology/?hl=en",
      imgUrl: "instagram.webp",
      imageAlt: "instagram",
      posts: instaPosts,
      todayPosts: todayInstaPosts,
      colors: "to right, #8a3ab9 0%,#ffdc80 25% ,#f77737 50% ,#fd1d1d 75% ,#405de6 100%",
      borderColor: "#8a3ab9"
    },
    {
      name:"Linkedin",
      path:"'https://www.linkedin.com/company/beedatatechnology/posts/?feedView=all",
      imgUrl: "linkedin.webp",
      imageAlt: "linkedin",
      posts: 24,
      todayPosts: 0,
      colors: "white,#1B51DA",
      borderColor: "#1B51DA"
    },
    {
      name:"Twitter",
      path:"https://twitter.com/Beedata_",
      imgUrl: "twiter.png",
      imageAlt: "twitter",
      posts: 68,
      todayPosts: 0,
      colors: "white,#1D9BF0",
      borderColor: "#1D9BF0"
    },
  ]

  let totalPosts = 0
  upperCardsList.map((each) => {
    return totalPosts = totalPosts + each.posts
  })

  const bottomCardsList = [
    {
      name:"Facebook",
      path:"https://www.facebook.com/profile.php?id=100081139256325",
      imgUrl: "facebook.webp",
      imageAlt: "facebook",
      followers: facebookFollowers,
      colors: "to right, white 25%,#1B51DA 75%",
      borderColor: "#1B51DA"
    },
    {
      name:"Instagram",
      path:"https://www.instagram.com/beedata_technology/?hl=en",
      imgUrl: "instagram.webp",
      imageAlt: "instagram",
      followers: instaFollowers,
      colors: "to right, #8a3ab9 0%,#ffdc80 25% ,#f77737 50% ,#fd1d1d 75% ,#405de6 100%",
      borderColor: "#8a3ab9"
    },
    {
      name:"Linkedin",
      path:"'https://www.linkedin.com/company/beedatatechnology/posts/?feedView=all",
      imgUrl: "linkedin.webp",
      imageAlt: "linkedin",
      followers: 34,
      colors: "white,#1B51DA",
      borderColor: "#1B51DA"
    },
    {
      name:"Twitter",
      path:"https://twitter.com/Beedata_",
      imgUrl: "twiter.png",
      imageAlt: "twitter",
      followers: 47,
      colors: "white,#1D9BF0",
      borderColor: "#1D9BF0"
    },
  ]

  let totalFollowers = 0
  bottomCardsList.map((each) => {
    return totalFollowers = totalFollowers + each.followers
  })

  return (
    <div className='misk-misk'>
      <div className='flexcontainer card1'>
        <div>
          <h1 className='head1'>Social Media Dashboard</h1>
          <p className='para1'>Total Followers:  <spam className="today-posts-spam">{totalFollowers}</spam></p>
          <p className='para1'>Total Posts:  <spam className="today-posts-spam">{totalPosts}</spam></p>
        </div>
        <div>
          <a href='https://beedatatech.com/' target='_blank' rel="noreferrer">
            <img className='img1' src='beedata_logo.png' alt='facebook'/>
          </a>
        </div>
      </div>
      <div className='card2'>
      <div className='container2'>
        {upperCardsList.map(each => {
          return <a  style={{border:`2px solid ${each.borderColor}`}} href={each.path} target='_blank' rel="noreferrer" className='card3'>
          <div className='box' style={{backgroundImage:`linear-gradient(${each.colors})`}}>
            <img src={each.imgUrl} alt={each.imageAlt}/>
            <h1 className='head2'>{each.name}</h1>
          </div>
            <h1 >{each.posts+" "}<spam className="posts-spam">Posts</spam></h1>
            <p className='para2'>Today Posts: <spam className="today-posts-spam">{each.todayPosts}</spam></p>
        </a>
        })}
      </div>
        <div>
          <h1 className='head3'>Followers</h1>
        </div>
        <div>
          <div className='flex'>
            {bottomCardsList.map(each => {
              return  (<div className='card4' style={{border:`2px solid ${each.borderColor}`}}>
                        <div className='box' style={{backgroundImage:`linear-gradient(${each.colors})`, height:"40px"}}>
                          <img src={each.imgUrl} alt={each.imageAlt}/>
                          <h1 className='head2'>{each.name}</h1>
                        </div>
                        <h2 style={{fontFamily:"Roboto"}}>Followers: {each.followers}</h2>
                </div>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaCardsView;
