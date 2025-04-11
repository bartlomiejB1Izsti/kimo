document.getElementById('salajs').addEventListener('submit', function(event) {
    event.preventDefault();

    const rzad = parseInt(document.getElementById('rzad').value);
    const miejsce = parseInt(document.getElementById('miejsce').value);
    const sala = document.getElementById('sala');
    document.getElementById('salajs').style.display = 'none';

    sala.innerHTML = '';

    for (let i = 1; i <= rzad; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'rzad';


        const rowNumber = i < 10 ? `0${i}` : i; 
        const rowHeader = document.createElement('span');
        rowHeader.className = 'row-header';
        rowHeader.textContent = `Rząd ${rowNumber}`;
        rowDiv.appendChild(rowHeader);

        const seatsContainer = document.createElement('div');
        seatsContainer.className = 'seats-container';

        for (let j = 1; j <= miejsce; j++) {
            const seatDiv = document.createElement('div');
            seatDiv.className = 'miejsce';

            seatDiv.innerHTML = `
                <input type="checkbox" id="miejsce-${rowNumber}-${j}">
                <label for="miejsce-${rowNumber}-${j}"></label>
            `;
            seatsContainer.appendChild(seatDiv); 
        }

        rowDiv.appendChild(seatsContainer); 
        sala.appendChild(rowDiv); 
    }
});