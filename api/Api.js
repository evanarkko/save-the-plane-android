import axios from 'axios'
const baseUrl = 'http://0.0.0.0:4567'

const sendSelections = async (selections, groupId) => {//send ordered list of 17 integers, initial send (by group master) sends special groupId/flag so backend can generate new
    const res = await axios.post('/endpoint',
        {
            selections: selections,
            groupId: groupId
        })
    return res
}

const sendSharedEmails = async (emails, groupId) => {//invoked AFTER groupmaster has selected his choices but BEFORE anyone else has. Invokes backend to generate and store unique id's for each email(user)
    const res = await axios.post('/endpoint',
        {
            emails: emails,
            groupId: groupId
        })
    return res
}

const endPoll = async (groupId) => {//Only done by groupmaster. Possibly not implemented in 1st version
    const res = await axios.post('/endpoint',
        {
            groupId: groupId
        })
    return res
}

const getGroupStatus = async (groupId) => {//get group status. E.g. is it time to select goals, suggest solutions for top3 or view results
    const res = await axios.get(`${baseUrl}/group-status/affce24b-2d81-4748-b535-74f0f69e845b`)
    return res.data.status
}

export default {sendSelections, sendSharedEmails, endPoll, getGroupStatus}
