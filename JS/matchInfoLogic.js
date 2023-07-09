// ===== GET Matchess informations ===== //
var homeTeamCrest = ""
var awayTeamCrest = ""
function getInfoMatch() {
    // toggleLoader(true)
    const id = getCurrentId("matchId")
    document.getElementById("matchResult").innerHTML = " "
    document.getElementById("infoMatch").innerHTML = " "
    $("#infoMatch")
    const url = `${baseUrl}/matches/${id}`
    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    }).then((response) => {
        let info = response.data

        homeTeamCrest = info.homeTeam.crest
        awayTeamCrest = info.awayTeam.crest

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
                    <h6 style="color:var(--color1);">MATCHDAY : ${info.season.currentMatchday}</h6>
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
        document.getElementById("matchResult").innerHTML = content



    }).catch((error) => {
        showAlert(`${error.message}`, "danger")
    })


}
// ==================================== //

// ===== Get Confrontations between teams when the user click on match card ===== //
function getInfoHead2Head() {

    const id = getCurrentId("matchId")
    const url = `${baseUrl}/matches/${id}/head2head`
    toggleLoader(true)

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
                        <img src="${homeTeamCrest}" alt="" class="logo-team mb-1" style="height: 60px;">
                    </div>

                    <div class="d-flex  flex-column justify-content-around " style="text-align: center;">
                        <h3>${info.aggregates.numberOfMatches}</h3>
                        <p style="color: var(--color1);">Matches</p>
                    </div>

                    <div class="col-sm-3 d-flex  align-items-center justify-content-center">
                        <img src="${awayTeamCrest}" alt="" class="logo-team mb-1" style="height: 60px;">

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


    }).catch((error) => {
        showAlert(`${error.message}`, "danger")
    }).finally(() => {
        toggleLoader(false)
    })
}
// ==================================== //


