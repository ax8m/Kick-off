
function getCurrentUserId() {
    const urlParams = new URLSearchParams(window.location.search)
    const matchId = urlParams.get("matchId")
    return matchId
}

function getInfoMatch() {
    const id = getCurrentUserId()
    document.getElementById("main").innerHTML = " "
    const url = `${baseUrl}/matches/${id}`
    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    }).then((response) => {

        console.log(response.data)
        let info = response.data

        function checkRefree() {
            let check = (info.referees !== "") ? "Hi" : "hell"
            return check
            // if (info.referees !== []) {
            //     return `<p style="color: var(--color1);">null </p>`
            //     // return "HI"
            // } else {
            //     return `<p style="color: var(--color1);">${info.referees[0].name}<span>((${info.referees[0].nationality}))</span></p>`
            //     // return "Hello"
            // }
        }
        let content =
            `
        <!-- Match Result -->
        <div class="row d-flex justify-content-center">
            <div class=" col-sm-10 d-flex">
                <div class="col-sm-3 d-flex flex-column align-items-center ">
                    <img src="${info.homeTeam.crest}" alt="" class="logo-team mb-1" style="height: 60px;">
                    <h6>${info.homeTeam.shortName} (H)</h6>
                </div>

                <div class="col-sm-6 d-flex flex-column align-items-center justify-content-center">
                    <h2>${matchStatus(info.status, info.utcDate, info)}</h2>
                </div>

                <div class="col-sm-3 d-flex flex-column align-items-center">
                    <img src="${info.awayTeam.crest}" alt="" class="logo-team mb-1"
                        style="height: 60px;">
                        <h6>${info.awayTeam.shortName} (A)</h6>
                </div>
            </div>
        </div>

        <!--=========== Match Information ============= -->

        <div class="d-flex justify-content-evenly">
            <div id="infoMatch" class="mt-5 cardMatche">
                <div>
                    <h2 class="">Match Info</h2>
                </div>


                <div class="cardsInfo">
                    <div id="compe" class="d-flex mt-3">
                        <div class="">
                            <img src="${info.competition.emblem}" alt="" srcset="" class="logo-league">
                        </div>

                        <div class="ms-2">
                            <h4 style="margin-bottom: 0px;">Competition</h4>
                            <p style="color: var(--color1);">${info.competition.name}</p>
                        </div>
                    </div>
                </div>

                <div class="cardsInfo">
                    <div id="referee" class="d-flex mt-3">
                        <div class="">
                            <img src="../images/icons8-referee-jersey-64.png" alt="" srcset="" class="logo-league"
                                style="background: none;">
                        </div>

                        <div class="ms-2">
                            <h4 style="margin-bottom: 0px;">Referee</h4>
                            <p style="color: var(--color1);">${(info.referees != "") ? info.referees[0].name : "Null"}<span>((${(info.referees != "") ? info.referees[0].nationality : ""}))</span></p>
                        </div>
                    </div>
                </div>

                <div class="cardsInfo">
                    <div id="stadium" class="d-flex mt-3">
                        <div class="">
                            <img src="../images/icons8-stadium-64.png" alt="" srcset="" class="logo-league"
                                style="background: none;">
                        </div>

                        <div class="ms-2">
                            <h4 style="margin-bottom: 0px;">Stadium</h4>
                            <p style="color: var(--color1);">${info.venue}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Head To Head -->
            <div id="headTOhead" class="mt-5 cardMatche">
               
            </div>
        </div>
            `
        document.getElementById("main").innerHTML = content



    })

    getInfoHead2Head()
}

function getInfoHead2Head() {

    const id = getCurrentUserId()
    const url = `${baseUrl}/matches/${id}/head2head`
    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    }).then((response) => {

        let info = response.data
        document.getElementById("headTOhead").innerHTML = " "


        let content =
            `
            <!-- Head To Head -->
                <div>
                    <h2>Head To Head</h2>
                </div>

                <div class="d-flex  justify-content-around">
                    <div class="col-sm-3 d-flex  align-items-center justify-content-center">
                        <img src="${info.matches[0].homeTeam.crest}" alt="" class="logo-team mb-1" style="height: 60px;">
                    </div>

                    <div class="d-flex  flex-column justify-content-around " style="text-align: center;">
                        <h3>${info.aggregates.numberOfMatches}</h3>
                        <p style="color: var(--color1);">Matches</p>
                    </div>

                    <div class="col-sm-3 d-flex  align-items-center justify-content-center">
                        <img src="${info.matches[0].awayTeam.crest}" alt="" class="logo-team mb-1" style="height: 60px;">

                    </div>
                </div>

                <div class="d-flex  justify-content-around">
                    <div class="col-sm-3 d-flex  flex-column align-items-center justify-content-center"
                        style="text-align: center;">
                        <h3>${info.aggregates.homeTeam.wins}</h3>
                        <p style="color: var(--color1);">Wins</p>
                    </div>

                    <div class="d-flex  flex-column justify-content-around " style="text-align: center;">
                        <h3>${info.aggregates.homeTeam.draws}</h3>
                        <p style="color: var(--color1);">Draws</p>
                    </div>

                    <div class="col-sm-3 d-flex  flex-column align-items-center justify-content-center"
                        style="text-align: center;">
                        <h3>${info.aggregates.awayTeam.wins}</h3>
                        <p style="color: var(--color1);">Wins</p>
                    </div>
                </div>

                <div class="d-flex  justify-content-around">
                    <div class="col-sm-3 d-flex  flex-column align-items-center justify-content-center"
                        style="text-align: center;">
                        <h3>${info.aggregates.totalGoals}</h3>
                        <p style="color: var(--color1);">Total Goals</p>
                    </div>
                </div>
        
            `

        document.getElementById("headTOhead").innerHTML = content


    })
}
function matchStatus(status, utcDate, variable) {
    // GET DATE & TIME
    utcDate = new Date(utcDate)
    let date = `${months[utcDate.getMonth()]} ${utcDate.getDate()} `

    // ======== TRY TO IMPROVE THIS Part later ========= START
    let ziroH = "";
    let ziroM = "";
    if (utcDate.getHours() <= 9) { ziroH = "0" }
    if (utcDate.getMinutes() <= 9) { ziroM = "0" }
    let time = `${ziroH}${utcDate.getHours()}:${ziroM}${utcDate.getMinutes()} `
    // ======== TRY TO IMPROVE THIS TAXT ========= END

    if (status == "TIMED") {
        return `
                < h3 > ${date}</h3 >
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