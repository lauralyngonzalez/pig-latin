import React, { Component } from 'react'
import './App.css'

class App extends Component{
  constructor(props){
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are test words hard coded to make the process of testing your code faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "Translate your sentence into Pig Latin!",
      // alphayay oughthray ummyyay uealsqay eenquay yfray
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: "Pig Latin Translator"
    }
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = this.state.phrase.split(" ")
    console.log("userInput:", userInput)

    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      console.log("currentWord:", currentWord)

      let vowelsArray = currentWord.split("").filter(vowel => {
        return vowel === "a" || vowel === "e" || vowel === "i" || vowel === "o" || vowel === "u"
      })
      console.log("vowelsArray:", vowelsArray)

      // Must handle:
      // 1. word starts with a consonant or group of consonants -> move consonants, add "ay"
      //       a. word starts with qu -> move "qu", add "ay"
      //       b. no vowels, has y
      // 2. word starts with a vowel -> add "way"

      // algorithm:
      // if word starts with consonant
      //      - handle qu: if first vowel found starts with u, look at the consonant
      //        before it. is it a q?
      //        if it's a q, then skip u and split at next letter.
      //        otherwise, split at first vowel.
      //      - no vowels, just y in there, then get substring up to y and move to back
      // if word starts with a vowel, add "way"

      let firstLetter = currentWord[0]
      let translatedWord = ""
      let front = ""
      let back  = ""

      // word starts with a vowel
      if (firstLetter === "a" || firstLetter === "e" || firstLetter === "i" ||    firstLetter === "o" || firstLetter === "u") {
        return currentWord + "way"
      } else if (vowelsArray.length === 0) {
        // no vowels, pretty sure it has a y so treat y as the vowel
        let indexOfy = currentWord.indexOf('y')
        front = currentWord.substring(0, indexOfy)
        back = "y"
        translatedWord = back + front + "ay"
      } else {
        // word is a consonant and has vowels
              // word has qu in the first syllable. find the second vowel
              // is the first vowel u?
              // u - look to see if there's q in front of the u
              //      if q, then split at second vowel in vowelsArray
              //      if not q, then just split at the u
              // queen, squeal
              // qu + een, squ + eal
              // pull -> p + ull

            // find index of first vowel
            let indexOfFirstVowel = currentWord.indexOf(vowelsArray[0])
            // get the first letter before the vowel to see if it's a q
            let letterBeforeVowel = currentWord.charAt(indexOfFirstVowel-1)

            // handle qu or other consonant starting word
            if (vowelsArray[0] === 'u' && letterBeforeVowel === 'q') {
                // vowel is a u. look at the letter before it to see if it's a "qu" syllable
                let indexOfNextVowel = currentWord.indexOf(vowelsArray[1])
                front = currentWord.substring(0,indexOfNextVowel)
                back = currentWord.substring(indexOfNextVowel)
            } else {
                // split up the word on the first vowel found
                front = currentWord.substring(0, indexOfFirstVowel)
                back = currentWord.substring(indexOfFirstVowel)
            }
      }

      translatedWord = back + front + "ay"

      // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
      return translatedWord
    })

    // joining the array back to a string of translated words
    // no need to change this variable
    let translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords:", translatedWords)

    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
    this.setState({phraseTranslated: translatedWords})
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "",
      phraseTranslated: "Pig Latin Translator"
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({phrase: e.target.value})
  }

  render(){
    return(
      <>
      <h2>{this.state.phraseTranslated}</h2>
        <div className="inputArea">
          
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input
            type="text"
            className="userInput"
            onChange={this.handleInput}
            value={this.state.phrase}
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}
          <button onClick={this.setUpPreventDefault}>Submit</button>
          <button onClick={this.restartGame}>Clear</button>
          
          <footer>Coded by Lauralyn and Jared</footer>
        </div>
        
      </>
    )
  }
}

export default App
