// Getting params from the url
const urlParam = new URLSearchParams(window.location.search).get('id');


// Main tag for the inner.
const statContent = document.getElementById('main');



// format the decimal place of the height
function formatHeight(str) {
    return str.toString().length <= 1 ? str.toString() :
    str.toString().slice(0, -1) + ',' + str.toString().slice(-1);
}
  
// format the decimal place of the weight
function formatWeight(str) {
    return str.length < 2 ? str.toString() + "0" :
    str.toString().slice(0, -1) + ',' + str.toString().slice(-2, -1) + str.toString().slice(-1);
}
  
// Loading the respective pokemon
pokeApi.getPokemonInformation(urlParam).then(pageDetail);

// Displaying content for each page
function pageDetail(pokemon){
    console.log(pokemon)
    statContent.innerHTML += ` 
        <section class="perfil ${pokemon.type}"> 

        <div>
            <nav class="topo">

                <a href="index.html" title="Voltar"><i class="fa fa-long-arrow-left" style="font-size:24px"></i></a>
                <input type="checkbox" id="coracao" />
                <label for="coracao">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </label>
        
            </nav><!-- Custom navbar. -->
            </div>

            <div class="basicInfos" id="stat">
            
                <div class="name-type">
                    <H1>${pokemon.name}</H1>
                    <ul class="types">
                        ${pokemon.types.map((type) => `<li class="${type}">${type}<li>`).join('')}
                    </ul>
                </div>    
                <span class="number" id="number">${formatOrder(pokemon.number)}</span>
                <img src="${pokemon.photo}" alt="${pokemon.name}">


            </div>
            <div>
                <img class="waterMark" src="assets/Images/pokeball gray transaparent 2.png" alt="">
            </div>
            <div class="detalhes">
                <div class="pokeStatus">

                    <!-- Navbar-->
                    <nav>
                        <ul>
                            <li><a href="javascript:changeContent(1);" class="active" id="about" title="Sobre">About</a></li>
                            <li><a href="javascript:changeContent(2);" id="status" title="base status">Base Status</a></li>
                            <li><a href="javascript:changeContent(3);" id="evolution" title="evolution">Evolution</a></li>
                            <li><a href="javascript:changeContent(4);" id="moves" title="moves">Moves</a></li>
                        </ul>
                    </nav><!-- Navigation bar -->

                    <!-- Content-->
                    <div class="content showContent" id="content1">
                        <div class="coluna1" id="coluna1">
                            <ul>
                            <li>Species </li>
                            <li>Heigth</li>
                            <li>Weigth</li>
                            <li>Abilities</li>
                            </ul>

                            <h2>Breeding</h2>
                            <ul>
                                <li>Egg Groups</li>
                                <li>Egg Cycle</li>
                            </ul>
                        </div> 

                        <div class="coluna2" id="coluna2">
                            <ul> 
                                <li class="infos">${pokemon.specie}</li>
                                <li class="infos">${formatWeight(pokemon.height)}cm</li>
                                <li class="infos">${formatHeight(pokemon.weight)}kg</li>
                                <li class="infos">${pokemon.habilities.map((hability) => hability).join(',')}</li>
                            </ul>

                            <h2>&nbsp</h2>
                            <ul> 
                                <li class="infos">${pokemon.groups.map((group) => group).join(', ')}</li>
                                <li class="infos">${pokemon.habitat}</li>
                            </ul>
                        </div>
                    </div><!-- Tab content -->

                    <div class="content" id="content2">
                        <div class="coluna1" id="coluna1">
                            <ul>
                                <li>HP </li>
                                <li>Attack </li>
                                <li>Defense </li>
                                <li>Sp.Atk </li>
                                <li>Sp.Def </li>
                                <li>Speed </li>
                                <li>Total </li>
                            </ul>
                        </div>

                        <div class="coluna2" id="coluna2">
                            <ul>
                                ${pokemon.movesPower.map((power) =>
                                    `<li>
                                        ${power}

                                        <progress value="${power}" max="380"></progress>
                                    </li>`).join('')
                                }
                                <li>
                                    ${pokemon.totalPower}
                                    <progress value="${pokemon.totalPower}" max="1800"></progress> 
                                </li>
                            </ul>
                        </div>
                    </div><!-- Tab content -->

                    <div class="content" id="content3">
                        <div class="evolution">                     
                            <h2> Coming Soon </h2>
                        </div>
                    </div><!-- Tab content -->

                    <div class="content" id="content4">
                        <div class="moves">
                            ${pokemon.moves.map((move) => `<div class="contents"><span>${move}</span></div>`).join('')} 
                        </div>
                    </div><!-- Tab content -->

                </div><!-- Base status -->
        </div>

    </section><!-- pokemon stats -->
    `;
}

    function changeContent(index){
        const navItems = ['about', 'status', 'evolution', 'moves'], contentItems = ['content1', 'content2', 'content3', 'content4'];
    
        navItems.forEach(item => {document.getElementById(item).classList.remove('active');});
        document.getElementById(navItems[index - 1]).classList.add('active');
        contentItems.forEach(item => {document.getElementById(item).classList.remove('showContent');});
        document.getElementById(contentItems[index - 1]).classList.add('showContent');
}