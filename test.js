

const myPigLatinCodeHere = (phrase) => {
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = phrase.split(" ")
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
        back = currentWord.substring(indexOfy)
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

      console.log("front: ", front)
      console.log("back: ", back)

      translatedWord = back + front + "ay"

      console.log(translatedWord)

      // phrase: "alpha through yummy squeal queen fry",
      // alphayay oughthray ummyyay uealsqay eenquay yfray

      // Remember: console.log is your friend :)

      // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
      return translatedWord
    })
}



let phrase = "alpha through yummy squeal queen fry"

console.log(myPigLatinCodeHere(phrase))