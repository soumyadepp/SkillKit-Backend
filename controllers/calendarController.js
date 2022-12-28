const { FETCH_FAILED, 
    FETCH_SUCCESS, 
    REGISTER_FAILED, 
    REGISTER_SUCCESS, 
    EDIT_FAILED, 
    EDIT_SUCCESS, 
    DELETE_FAILED, 
    DELETE_SUCCESS } = require("../common/constants");
const Project = require("../models/Project")
const UserMetadata = require('../models/UserMetaData');
const axios = require('axios');

function prepareObject(name, deadline, description, attendees, etag)
{
    let a = new Date().toISOString().split("-").join("").split(":").join("").slice(0,15).concat("Z");
    let startDate = a.split('T')[0] + "T000000+0530";
    let lastDate = deadline.split('/')[2] + '' + deadline.split('/')[1] + '' + deadline.split('/')[0] + "T000000+0530";
    console.log(startDate,lastDate);

    console.log(attendees);
    let tem = [];
    if(!!attendees)
    {
        for(let e of attendees||[])
        {
            tem.push({
                "email" : e
            });
        }
    }

    let eventdata = {"title" : name,dateandtime : {"timezone" : "Asia/Calcutta","start" : startDate,"end" : lastDate},"description" : description,"sendnotification" : true, "attendees" : tem};

    if(!!etag)
    {
        eventdata.etag = etag+'';
    }

    if(tem.length===0)
        delete eventdata.attendees;
    
    return encodeURIComponent(JSON.stringify(eventdata));
}

function prepareObjectForUpdate(name, start, deadline, description, attendees, etag)
{
    // let a = new Date().toISOString().split("-").join("").split(":").join("").slice(0,15).concat("Z");
    // let startDate = a.split('T')[0] + "T000000+0530";
    // let lastDate = deadline.split('/')[2] + '' + deadline.split('/')[1] + '' + deadline.split('/')[0] + "T000000+0530";
    // console.log(startDate,lastDate);

    console.log(attendees);
    let tem = [];
    if(!!attendees)
    {
        for(let e of attendees||[])
        {
            tem.push({
                "email" : e
            });
        }
    }

    let eventdata = {"title" : name,dateandtime : {"timezone" : "Asia/Calcutta","start" : start,"end" : deadline},"description" : description,"sendnotification" : true, "attendees" : tem};

    if(!!etag)
    {
        eventdata.etag = etag+'';
    }

    if(tem.length===0)
        delete eventdata.attendees;
    
    return encodeURIComponent(JSON.stringify(eventdata));
}

exports.createEvent  = (req, res, next)=>{
    const { name, version, description, stackUsed, assignedUsers, createdBy, deadline } = req.body;

    let encodedUri = prepareObject(name, deadline, description,assignedUsers,null);
    console.log(encodedUri);

    axios.post(`https://calendar.zoho.in/api/v1/calendars/${process.env.CALENDAR_UID}/events?eventdata=${encodedUri}`,null,{
        headers : {
            'Authorization' : `Bearer ${process.env.ACCESS_TOKEN}`
        }
    }).then((eventDetails)=>{

        req.body.eventId = eventDetails.data.events[0].uid;
        req.body.eTag = eventDetails.data.events[0].etag;
        next();

    }).catch((err)=>{
        console.log(err);
        res.send(err);
    })
}

exports.updateEvent = (req, res, next)=>{

    const id = req.params.id;

    Project.findById(id).then((doc)=>{
        const {name,deadline,description,assignedUsers, eventId, eTag} = doc;

        axios.get(`https://calendar.zoho.in/api/v1/calendars/${process.env.CALENDAR_UID}/events/${eventId}`,{
            headers : {
                "Authorization" : `Bearer ${process.env.ACCESS_TOKEN}`
            }
        }).then((data)=>{
            
            // console.log(data.data.events[0]);
            let currentEvent = data.data.events[0];
            
            let encodedUri = prepareObjectForUpdate(currentEvent.title, currentEvent.dateandtime.start,currentEvent.dateandtime.end , description, assignedUsers, currentEvent.etag);
            axios.put(`https://calendar.zoho.in/api/v1/calendars/${process.env.CALENDAR_UID}/events/${eventId}?eventdata=${encodedUri}`,null,{
                headers : {
                    "Authorization" : `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }).then((e)=>{
                // console.log("Hello world",e.data.events[0]);
                res.send({
                    data: doc,
                    message: EDIT_SUCCESS
                })
            }).catch((err)=>{
                console.log("Error",err);
                res.status(400).send({message : EDIT_FAILED, err : err});
            })

        }).catch((err)=>{
            console.log(err);
            res.status(400).send({message : EDIT_FAILED, err : err});
        })

    }).catch((err)=>{
        res.send(err);
    })

}