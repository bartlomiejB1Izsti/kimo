document.addEventListener('DOMContentLoaded', () => { 

    const form = document.getElementById('salajs');
    const salaContainer = document.getElementById('sala');
    const wybierzKontener = document.getElementById('wybierz-kontener');
    const wybierzBtn = document.getElementById('wybierz-miejsca');
    const biletyKontener = document.getElementById('bilety-kontener');
    const zamowKontener = document.getElementById('zamow-kontener');
    const zamowBtn = document.getElementById('zamow-bilety');

    let liczbaRzedow = 0;
    let liczbaMiejsc = 0;

    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        liczbaRzedow = parseInt(document.getElementById('rzad').value);
        liczbaMiejsc = parseInt(document.getElementById('miejsce').value);

        if (isNaN(liczbaRzedow) || isNaN(liczbaMiejsc) || liczbaRzedow <= 0 || liczbaMiejsc <= 0) {
            alert("Proszę podać liczby rzędów i miejsc.");
            return;
        }

        form.style.display = 'none'; 
        salaContainer.innerHTML = ''; 
        biletyKontener.innerHTML = ''; 
        biletyKontener.style.display = 'none'; 
        zamowKontener.style.display = 'none'; 

        
        for (let i = 1; i <= liczbaRzedow; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'rzad';

            const rowNumber = i < 10 ? `0${i}` : i;
            const rowHeader = document.createElement('span');
            rowHeader.className = 'row-header';
            rowHeader.textContent = `Rząd ${rowNumber}`;
            rowDiv.appendChild(rowHeader);

            const seatsContainer = document.createElement('div');
            seatsContainer.className = 'seats-container';

            for (let j = 1; j <= liczbaMiejsc; j++) {
                const seatDiv = document.createElement('div');
                seatDiv.className = 'miejsce';
                
                seatDiv.dataset.rzad = rowNumber;
                seatDiv.dataset.miejsce = j;

                const seatId = `miejsce-${rowNumber}-${j}`;
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = seatId;
                checkbox.value = seatId; 
                checkbox.dataset.rzad = rowNumber; 
                checkbox.dataset.miejsce = j;   

                const label = document.createElement('label');
                label.htmlFor = seatId;
                

                seatDiv.appendChild(checkbox);
                seatDiv.appendChild(label);
                seatsContainer.appendChild(seatDiv);
            }

            rowDiv.appendChild(seatsContainer);
            salaContainer.appendChild(rowDiv);
        }

        wybierzKontener.style.display = 'block'; 
    });

   
    wybierzBtn.addEventListener('click', function() {
        
        const wybraneCheckboxy = salaContainer.querySelectorAll('.miejsce input[type="checkbox"]:checked:not(:disabled)');

        if (wybraneCheckboxy.length === 0) {
            alert("Proszę wybrać przynajmniej jedno wolne miejsce.");
            return;
        }

        biletyKontener.innerHTML = ''; 
        biletyKontener.style.display = 'flex'; 

        wybraneCheckboxy.forEach(checkbox => {
            const rzad = checkbox.dataset.rzad;
            const miejsce = checkbox.dataset.miejsce;
            const seatId = checkbox.id;

            const biletDiv = document.createElement('div');
            biletDiv.className = 'bilet';
            
            biletDiv.dataset.seatId = seatId;

            const biletInfo = document.createElement('span');
            biletInfo.className = 'bilet-info';
            biletInfo.textContent = `Rząd ${rzad}, Miejsce ${miejsce}`;

            const biletUlga = document.createElement('div');
            biletUlga.className = 'bilet-ulga';
            const radioName = `ulga-${seatId}`; 

            biletUlga.innerHTML = `
                <input type="radio" id="norm-${seatId}" name="${radioName}" value="normalny" checked><br>
                <label for="norm-${seatId}">Normalny</label>
                <input type="radio" id="ulg-${seatId}" name="${radioName}" value="ulgowy"><br>
                <label for="ulg-${seatId}">Ulgowy</label>
            `;

            biletDiv.appendChild(biletInfo);
            biletDiv.appendChild(biletUlga);
            biletyKontener.appendChild(biletDiv);
        });

        zamowKontener.style.display = 'block'; 
        wybierzKontener.style.display = 'none'; 
    });

    
    zamowBtn.addEventListener('click', function() {
        const biletyDoZamowienia = biletyKontener.querySelectorAll('.bilet');

        if (biletyDoZamowienia.length === 0) {
             
            return;
        }

        biletyDoZamowienia.forEach(biletDiv => {
            const seatId = biletDiv.dataset.seatId;
            const checkbox = document.getElementById(seatId);

            if (checkbox) {
                checkbox.checked = false; 
                checkbox.disabled = true; 
                
            }

            
            const selectedUlga = biletDiv.querySelector('input[type="radio"]:checked');
            if(selectedUlga) {
                 console.log(`Zamówiono bilet: ${seatId}, Typ: ${selectedUlga.value}`);
            } else {
                 console.log(`Zamówiono bilet: ${seatId}, Typ: (nie wybrano)`); 
            }
        });

        
        biletyKontener.innerHTML = '';
        biletyKontener.style.display = 'none';

        
        zamowKontener.style.display = 'none';

        
        wybierzKontener.style.display = 'block';

        
        alert(`Zamówiono ${biletyDoZamowienia.length} biletów. Miejsca zostały zablokowane. Możesz wybrać kolejne.`);
    });

}); 