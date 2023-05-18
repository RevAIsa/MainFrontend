import React, {useState} from 'react'

function currentEssay() {

    const getEssay =() =>{
        const EssayString = sessionStorage.getItem('Essay')
        const userEssay = JSON.parse(EssayString)
        return userEssay?.Essay
    } 

    const [Essay, setEssay] = useState(getEssay())
    const saveEssay = userEssay => {
        sessionStorage.setItem('Essay', JSON.stringify(userEssay))
        setEssay(userEssay.Essay)
      }
      return {
        setEssay: saveEssay,
        Essay
      }
    }

export default currentEssay 