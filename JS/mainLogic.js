
// Fixed Variables
const baseUrl = "https://api.football-data.org/v4"
const token = '848a194d370a42178ed8291ff7755128'

// GET LEAGUE'S ID AND MOBILIZE IN ARRAY 
// function mobilizeId() {
//     const url = `${baseUrl}/matches`
//     document.getElementById("matches").innerHTML = ''
//     axios.get(url, {
//         headers: {
//             "X-Auth-Token": token
//         }
//     })
//         .then((response) => {
//             const competitionsCode = response.data.resultSet.competitions.split(",")
//             let codes = competitionsCode
//             console.log(codes)
//             let leagues = []
//             for (let code of codes) {

//                 for (let match of response.data.matches) {
//                     let nameleagues = `
//                     <div>
//                     <img src="${match.competition.emblem}" alt="" srcset="" class="logo-league">
//                     <span class="title-league" style="font-size: 25px;">
//                     ${match.competition.name}
//                     </span>
//                     <img src="../images/icons8-more-than-90.png" alt="" style="height: 20px; margin-bottom: 7px;">
//                     </div>
//                     `


//                     leagues.push(nameleagues)
//                     leagues = [...new Set(leagues)]


//                     // console.log(league)
//                     // for (let league of leagues) {
//                     //     // document.getElementById("league").innerHTML += league
//                     //     if (match.competition.code == code) {

//                     //         let cardMatch = `
//                     //             <div class="row mt-4 d-flex justify-content-center">
//                     //                 <div class="cardMatche col-sm-10 d-flex">
//                     //                     <div class="col-sm-3 d-flex flex-column align-items-center ">
//                     //                         <img src="${match.homeTeam.crest}" alt="" class="logo-team mb-1" style="height: 60px;">
//                     //                         <h6>${match.homeTeam.shortName} (H)</h6>
//                     //                     </div>

//                     //                     <div class="col-sm-6 d-flex flex-column align-items-center justify-content-center">
//                     //                         <h3>MARCH 15</h3>
//                     //                         <h6 style="color: var(--color1);">22:30</h6>
//                     //                     </div>

//                     //                     <div class="col-sm-3 d-flex flex-column align-items-center">
//                     //                         <img src="${match.awayTeam.crest}" alt="" class="logo-team mb-1"
//                     //                             style="height: 60px;">
//                     //                         <h6>${match.awayTeam.shortName} (A)</h6>
//                     //                     </div>
//                     //                 </div>
//                     //             </div>
//                     //             `
//                     //         document.getElementById("matches").innerHTML += cardMatch
//                     //     }
//                     // }
//                 }
//             }
//             console.log(leagues)

//             return
//             for (let competition of response.data.resultSet.competitions) {
//                 // ids.push(competition)
//                 document.getElementById("matches").innerHTML = ''
//                 for (let match of response.data.matches) {

//                     for (let id of ids) {

//                         if (id == match.competition.id) {
//                             console.log(id)
//                             let nameleagues = `
//                             <div>
//                             <img src="${match.competition.emblem}" alt="" srcset="" class="logo-league">
//                             <span class="title-league" style="font-size: 25px;">
//                             ${match.competition.name}
//                             </span>
//                             <img src="../images/icons8-more-than-90.png" alt="" style="height: 20px; margin-bottom: 7px;">
//                             </div>
//                             `


//                             document.getElementById("matches").innerHTML += nameleagues




//                         }
//                         let cardMatch = `
//                             <div class="row mt-4 d-flex justify-content-center">
//                                 <div class="cardMatche col-sm-10 d-flex">
//                                     <div class="col-sm-3 d-flex flex-column align-items-center ">
//                                         <img src="${match.homeTeam.crest}" alt="" class="logo-team mb-1" style="height: 60px;">
//                                         <h6>${match.homeTeam.shortName} (H)</h6>
//                                     </div>

//                                     <div class="col-sm-6 d-flex flex-column align-items-center justify-content-center">
//                                         <h3>MARCH 15</h3>
//                                         <h6 style="color: var(--color1);">22:30</h6>
//                                     </div>

//                                     <div class="col-sm-3 d-flex flex-column align-items-center">
//                                         <img src="${match.awayTeam.crest}" alt="" class="logo-team mb-1"
//                                             style="height: 60px;">
//                                         <h6>${match.awayTeam.shortName} (A)</h6>
//                                     </div>
//                                 </div>
//                             </div>
//                             `
//                         document.getElementById("matches").innerHTML += cardMatch
//                     }




//                 }
//             }




//         })
//         .catch((error) => {
//             console.log(error.response.data.message)
//         })


//     // getTodaymatches()
// }
// Get All matches for today

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getTodaymatches() {

    document.getElementById("matches").innerHTML = ''
    const url = `${baseUrl}/matches?dateFrom=2023-03-10&dateTo=2023-03-14`
    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    }).then((response) => {

        console.log()
        for (let match of response.data.matches) {


            function matchStatus(status, utcDate) {
                // GET DATE & TIME
                utcDate = new Date(utcDate)
                let date = `${months[utcDate.getMonth()]} ${utcDate.getDate()}`

                // ======== TRY TO IMPROVE THIS Part later ========= START
                let ziroH = "";
                let ziroM = "";
                if (utcDate.getHours() <= 9) { ziroH = "0" }
                if (utcDate.getMinutes() <= 9) { ziroM = "0" }
                let time = `${ziroH}${utcDate.getHours()}:${ziroM}${utcDate.getMinutes()}`
                // ======== TRY TO IMPROVE THIS TAXT ========= END

                if (status == "TIMED") {
                    return `
                    <h2>${date}</h2>
                    <h4 style="color: var(--color1);">${time}</h4>
                    `
                } else if (status == "PAUSED") {
                    return `
                    ${match.score.fullTime.home} - ${match.score.fullTime.away}
                    <h6 style="color: var(--color1);">HALFTIME</h6>
                    `
                } else {
                    return `
                    ${match.score.fullTime.home} - ${match.score.fullTime.away}
                    <h6 style="color: var(--color1);">${match.status}</h6>
                    `
                }
            }


            let content = `
             <div class="mb-5">
                        <div onclick="window.location = 'League.html?leagueId=${match.competition.id}'" style="cursor: pointer;">
                            <img src="${match.competition.emblem}" alt="" srcset="" class="logo-league">
                            <span class="title-league" style="font-size: 25px;">
                                ${match.competition.name}
                            </span>
                            <img src="../images/icons8-more-than-90.png" alt="" style="height: 20px; margin-bottom: 7px;">
                        </div>

                <div class="row mt-4 d-flex justify-content-center" onclick="MatchClicked(${match.id})" >
                    <div class="cardMatche col-sm-10 d-flex">
                        <div class="col-sm-3 d-flex flex-column align-items-center ">
                            <img src="${match.homeTeam.crest}" alt="" class="logo-team mb-1" style="height: 60px;">
                                <h6>${match.homeTeam.shortName} (H)</h6>
                        </div>

                        <div class="col-sm-6 d-flex flex-column align-items-center justify-content-center">
                            <h2>${matchStatus(match.status, match.utcDate, match)}</h2>
                        </div>

                        <div class="col-sm-3 d-flex flex-column align-items-center">
                            <img src="${match.awayTeam.crest}" alt="" class="logo-team mb-1"
                                style="height: 60px;">
                                <h6>${match.awayTeam.shortName} (A)</h6>
                        </div>
                    </div>
                </div >
            </div>
            `
            document.getElementById("matches").innerHTML += content
        }
    })
}

// Dealing with time
function time() {
    let ziroH = "";
    let ziroM = "";
    if (utcDate.getHours() <= 9) { ziroH = "0" }
    if (utcDate.getMinutes() <= 9) { ziroM = "0" }
    let time = `${ziroH}${utcDate.getHours()}:${ziroM}${utcDate.getMinutes()}`
}

// Moving to match information page
function MatchClicked(id) {
    window.location = `matchInfo.html?matchId=${id}`
}

// Get Status of match
function matchStatus(status, utcDate, variable) {
    // GET DATE & TIME
    utcDate = new Date(utcDate)
    let date = `${months[utcDate.getMonth()]} ${utcDate.getDate()}`

    // ======== TRY TO IMPROVE THIS Part later ========= START
    let ziroH = "";
    let ziroM = "";
    if (utcDate.getHours() <= 9) { ziroH = "0" }
    if (utcDate.getMinutes() <= 9) { ziroM = "0" }
    let time = `${ziroH}${utcDate.getHours()}:${ziroM}${utcDate.getMinutes()}`
    // ======== TRY TO IMPROVE THIS TAXT ========= END

    if (status == "TIMED") {
        return `
        <h3>${date}</h3>
        <h4 style="color: var(--color1);">${time}</h4>
        `
    } else if (status == "PAUSED") {
        return `
        ${variable.score.fullTime.home} - ${variable.score.fullTime.away}
        <h6 style="color: var(--color1);">HALFTIME</h6>
        `
    } else {
        return `
        ${variable.score.fullTime.home} - ${variable.score.fullTime.away}
        <h6 style="color: var(--color1);">${variable.status}</h6>
        `
    }
}

// GEt all free Leagues
function showLeagues(stute) {
    document.getElementById("leagues").innerHTML = ''


    if (stute == "show") {
        document.getElementById("leagueslist").style.animationName = "showLeagueModal"
        document.getElementById("leagueslist").style.animationDuration = "1s"
        document.getElementById("leagueslist").style.animationFillMode = "forwards"

        document.getElementsByName("main").innerHTML = "Hi"
    } else {
        document.getElementById("leagueslist").style.animationName = "hiddenLeagueModal"
        document.getElementById("leagueslist").style.animationDuration = "1s"
        document.getElementById("leagueslist").style.animationFillMode = "forwards"
    }

    const url = `${baseUrl}/competitions`
    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    })
        .then((response) => {


            for (let competition of response.data.competitions) {
                let content = `
                <div class="league mt-5">
                        <img src="${competition.emblem}" alt="" srcset="" class="logo-league">
                        <span class="title-league" style="font-size: 25px;" onclick="window.location = 'League.html?leagueId=${competition.id}'">
                            ${competition.name}
                        </span>
                        <img src="../images/icons8-more-than-90.png" alt="" style="height: 20px; margin-bottom: 7px;">
                </div>
                
                `

                document.getElementById("leagues").innerHTML += content
            }
        })
}

// get id of url search
function getCurrentId(paramID) {
    const urlParams = new URLSearchParams(window.location.search)
    const matchId = urlParams.get(paramID)
    return matchId
}
