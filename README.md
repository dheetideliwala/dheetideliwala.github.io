# ASU Barrett Honors Thesis/Creative Project
Welcome to my ASU Barrett Honors Thesis! For the culmination of my undergraduate degrees in Political Science and Computer Science, I decided to marry the two disciplines by using computational analysis in order to evaluate the efficacy of independent redistricting commissions to avoid extreme gerrymandering.

Check out my interactive scrollytelling webpage outlining the backstory, research process, and conclusions of my thesis: [Independent Redistricting Commissions and their fight against Gerrymandering](https://dheetideliwala.github.io/honors-thesis/)

Access my Thesis Defense presentation here: [Barrett Thesis Repository](https://keep.lib.asu.edu/items/190295)

### Project Description
After every decade's census, the process of redistricting takes place-- ensuring that the House of Representatives maintains its proportional nature. With this political responsibility granted to states, partisan desires can corrupt redistricting processes, leading to gerrymandering. Gerrymandering is the practice of redistricting with the intent to disadvantage opposing political parties or advantage one's own political party. With the recent incorporation of Independent Redistricting Commissions in select states, made up of individuals currently not holding office, the question arose of whether degree of separation from government positions led IRCs to produce "fairer" maps.

I relied on The ALARM Project's Markov Chain Monte Carlo algorithms to create simulated redistricted maps and compared those simulations to enacted maps from state legislatures and IRCs across the nation.

### Built with
**R**
- [Harvard's ALARM Project](https://github.com/alarm-redist/fifty-states) provided access to [public demographic data and election data from the Voting and Election Science Team](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/SLCD3E) and R scripts using those datasets to create thousands of realistic simulations of maps
**HTML/CSS**
- *Libraries:* Bootstrap
**Javascript**
- *Libraries:* scrollama, D3.js, jQuery

### What I learnt
Through this project, I built upon my experience of interactive front-end webpage development and the capabilities of D3.js. 

I worked for the first time with geographic .shp files to create the title graphic and svgs.

It was also my first time relying on open-source code. The learning curve of reviewing and manipulating someone else's code to fit my project was quite steep, as this was not something I have practice in. But it has opened me up to the multitude of open-source projects on Github that I can rely on in the future for inspiration and project help. 

Within D3.js, I implemented interactive features for the user to greater connect with the story. Additionally, scrollama.js allowed me to provide the user with an enhanced reading experience.

I implemented dynamic CSS styling to the webpage after my thesis defense, as it was hard-coded to the dimensions of my Macbook Pro.


