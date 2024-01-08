import { useState, useEffect } from 'react';

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  })
  const [allMemes, setAllMemes] = useState([])
  useEffect(()=> {
    
    // try {
    //    fetch("https://api.imgflip.com/get_memes")
    //    .then(res=> res.json())
    //    .then(data =>  setAllMemes(data.data.memes))
    // } catch (error){
    //   console.error(error);
    // }
    async function getMemes() {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMemes(data.data.memes)
      } catch (error){
        console.error(error);
      }  
    }
    getMemes()
  },[])
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url
    }))
  }
  function handleChange(event) {
    const {name, value} = event.target;
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }
  return (
    <main>
      <div className="form">
        <div>
          <label htmlFor="top-text">Top text</label>
          <input
            type="text"
            placeholder="Shut up"
            className="form--input"
            id="top-text"
            name="topText"
            value={meme.topText} // make it a controlled component
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bottom-text" >Bottom text</label>
          <input
            type="text"
            placeholder="and take my money"
            className="form--input"
            id="bottom-text"
            name="bottomText"
            value={meme.bottomText} // // make it a controlled component
            onChange={handleChange}
          />
        </div>
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
    
  )
}
