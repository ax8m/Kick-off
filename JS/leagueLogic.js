const id = getCurrentId("leagueId")
let matchDayParam = ""
let seasonParam = ""
toggleLoader(true)
// ===== Get standings Teams ====== //
function getStandingTeams() {
    const url = `${baseUrl}/competitions/${id}/standings`

    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    }).then((response) => {
        const typeOfCompition = response.data.competition.type
        const data = response.data
        // matchDayParam = data.season.currentMatchday
        matchDayParam = 5
        seasonParam = data.filters.season
        console.log(matchDayParam)
        $("#logoLeaguePage img").attr('src', `${data.competition.emblem}`)


        if (typeOfCompition == "LEAGUE") {
            $("#cups").remove()
            $("#standingTeams").html("")

            for (let standing of data.standings[0].table) {
                let content = `
                <tr>
                                <td>${standing.position}</td>
                                <td>
                                    <img src="${standing.team.crest}" alt="" style="width: 1.7rem;">
                                    <span>${standing.team.shortName}</span>
                                </td>
                                <td>${standing.playedGames}</td>
                                <td style="color: greenyellow;">${standing.won}</td>
                                <td style="color: yellow;">${standing.draw}</td>
                                <td style="color: red;">${standing.lost}</td>
                                <td>${standing.goalsFor} : ${standing.goalsAgainst}</td>
                                <td>${standing.goalDifference}</td>
                                <td>${standing.points}</td>
                            </tr>
                `


                document.getElementById("standingTeams").innerHTML += content
            }
        } else {
            $("#leagueDesign").remove()
            $("#groups").html("")

            for (let groups of data.standings) {
                let content = ""

                for (let standing of groups.table) {
                    content +=
                        `
                    <tr>
                                <td>${standing.position}</td>
                                <td>
                                    <img src="${standing.team.crest}" alt="" style="width: 1.7rem;">
                                    <span>${standing.team.shortName}</span>
                                </td>
                                <td>${standing.playedGames}</td>
                                <td style="color: greenyellow;">${standing.won}</td>
                                <td style="color: yellow;">${standing.draw}</td>
                                <td style="color: red;">${standing.lost}</td>
                                <td>${standing.goalsFor} : ${standing.goalsAgainst}</td>
                                <td>${standing.goalDifference}</td>
                                <td>${standing.points}</td>
                            </tr>
                    `
                    var groupContent = content
                }

                const tableContent = `
                <div>
                    <table>
                        <h4>${groups.group}</h4>
                        <thead>
                            <th>#</th>
                            <th style="width: 30%;">Team</th>
                            <th>Pl</th>
                            <th style="color: greenyellow;">W</th>
                            <th style="color: yellow;">D</th>
                            <th style="color: red;">L</th>
                            <th>F : A</th>
                            <th>GD</th>
                            <th>Pts</th>
                        </thead>

                        <tbody id="standingTeams">
                        ${groupContent}
                        </tbody>


                    </table>
                </div>
                `
                document.getElementById("groups").innerHTML += tableContent
            }
        }
    }).catch((error) => {
        showAlert(`${error.message}`, "danger")
    })

    getMatchesLeagues()
}
// ==================================== //

// ===== Get standing Scroers ===== //
function getStandingScorers() {
    const url = `${baseUrl}/competitions/${id}/scorers`

    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        },
        params: {
            // season: seasonParam
        }
    }).then((response) => {
        $("#standingScroer").html("")
        let position = 1
        for (scorer of response.data.scorers) {
            let content = `
                <tr>
                    <td>${position}</td>
                    <td>${scorer.player.name}</td>
                    <td>
                    <img src="${scorer.team.crest}" alt="" style="width: 1.7rem;">
                    <span>${scorer.team.shortName}</span>
                    </td>
                    
                    <td>${scorer.goals} (${scorer.penalties})</td>
                    <td>${scorer.assists}</td>
                    <td>${scorer.playedMatches}</td>
                </tr>
            `
            position += 1
            document.getElementById("standingScroer").innerHTML += content
        }

    }).catch((error) => {
        showAlert(`${error.message}`, "danger")
    })
}
// ==================================== //

// ====== get matches for specific league ===== //
function getMatchesLeagues() {
    const url = `${baseUrl}/competitions/${id}/matches`
    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        },
        params: {
            // // season: Number(seasonParam),
            // matchday: matchDay
        }

    }).then((response) => {
        $("#compitionMatchesCards").html("")
        for (game of response.data.matches) {
            let content =
                `
                <div class="row mt-4 d-flex justify-content-center" onclick="MatchClicked(${game.id})" >
                    <div class="cardMatche col-sm-10 d-flex">
                        <div class="col-sm-3 d-flex flex-column align-items-center ">
                            <img src="${game.homeTeam.crest}" alt="" class="logo-team mb-1" style="height: 60px;">
                                <h6>${game.homeTeam.shortName} (H)</h6>
                        </div>

                        <div class="col-sm-6 d-flex flex-column align-items-center justify-content-center">
                            <h2>${matchStatus(game.status, game.utcDate, game)}</h2>
                            <h6 style="color:var(--color1);">${(game.competition.type == "LEAGUE") ? `MATCHDAY : ${game.matchday}` : game.stage}  </h6>

                        </div>

                        <div class="col-sm-3 d-flex flex-column align-items-center">
                            <img src="${game.awayTeam.crest}" alt="" class="logo-team mb-1"
                                style="height: 60px;">
                                <h6>${game.awayTeam.shortName} (A)</h6>
                        </div>
                    </div>
                </div >
            `
            document.getElementById("compitionMatchesCards").innerHTML += content

        }
    }).catch((error) => {
        showAlert(`${error.message}`, "danger")
    }).finally(() => {
        toggleLoader(false)
    })
}
console.log(matchDayParam)
// ==================================== //



