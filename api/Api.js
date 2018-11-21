import axios from 'axios'
import Convert from '../logic/Convert'

const baseUrl = 'https://desolate-hollows-50013.herokuapp.com'


const sendSelections = async (data) => {//send ordered list of 17 integers, initial send (by group master) sends special groupId/flag so backend can generate new
    const res = await axios.post(`${baseUrl}/post-selections/`, data)
    return res
}

const endPoll = async (groupId) => {//Only done by groupmaster. Possibly not implemented in 1st version
    const res = await axios.post('/endpoint',
        {
            groupId: groupId
        })
    return res
}

const getGroupStatus = async (userId) => {//get group status. E.g. is it time to select goals, suggest solutions for top3 or view results
    const res = await axios.get(`${baseUrl}/group-status/${userId}`)
    console.log(res.data.status)
    return res.data.status
}


//emails, initialAnswers, country, organizationType

const groupGenesis = async (data) => {
    const genesisData = {
        addresses: data.email.concat("," + data.addresses),
        selections: Convert.arrayToCSV(data.selections),
        country: data.country,
        organizationType: data.organizationType,
        firstName: data.firstName
    }
    console.log(JSON.stringify(genesisData))
    const res = await axios.post(`${baseUrl}/group-genesis/`, genesisData)
    
    return res
}

const sendSuggestions = async (data) => {
    const suggestionData = {
        suggestions: {1: data.suggestions[0], 2: data.suggestions[1], 3: data.suggestions[2]},
        userId: data.userId
    }
    const res = await axios.post(`${baseUrl}/post-suggestions/`, suggestionData)
}

const getSelections = async (userId) => {
    console.log(userId)
    const res = await axios.get(`${baseUrl}/get-selections/${userId}`)
    return res.data
}

const getResults = async (userId) => {
    const res = await axios.get(`${baseUrl}/get-results/${userId}`)
    return res.data
}

export default {sendSelections, endPoll, getGroupStatus, groupGenesis, sendSuggestions, getSelections, getResults}

