const canvas = document.getElementById('Bauplan');
const renderer = canvas.getContext('2d');

class Bauteil {
    constructor(Typ, Name, Zahlenwert, Einheit, gloableXPosition, globaleYPosition, Breite,Hoehe, Anschlusslaenge){
        this.Typ = Typ;
        this.Name = Name;
        this.Zahlenwert = Zahlenwert;
        this.Einheit = Einheit;
        this.globaleXPosition = gloableXPosition;
        this.gloableYPosition = globaleYPosition;
        this.Breite = Breite;
        this.Hoehe = Hoehe;
        this.Anschlusslaenge = Anschlusslaenge;
    }

    info () {
        return `${this.Typ} ${this.Name}: ${this.Zahlenwert} ${this.Einheit}`;
    }

    lokaleAnschlussHoehe() {
        return this.Hoehe / 2;
    }

    lokaleBauteilBreite() {
        return (2 * this.Anschlusslaenge) + this.Breite;
    }
}

class Widerstand extends Bauteil {
    constructor(Name, Zahlenwert, gloableXPosition, globaleYPosition) {
        super('Widerstand', Name, Zahlenwert, 'Ω', gloableXPosition, globaleYPosition, 60, 20, 10)
    }

    draw(renderer) {
        renderer.save();

        renderer.lineWidth = 4;
        renderer.beginPath();

        const Breite = this.Breite;
        const Hoehe = this.Hoehe;
        const Anschlusslaenge = this.Anschlusslaenge;
        const center_Y_AnschlussPosition = (Hoehe / 2) + renderer.lineWidth;

        //zeichnet den Widerstand
        renderer.strokeRect(
            Anschlusslaenge, 
            renderer.lineWidth,
            Breite,
            Hoehe
        );
        renderer.stroke();

        //zeichnet Anschlüsse
        renderer.lineWidth = 1;
        renderer.beginPath();    
        renderer.moveTo(0,center_Y_AnschlussPosition);
        renderer.lineTo(this.Anschlusslaenge, center_Y_AnschlussPosition);
        renderer.stroke();
        renderer.moveTo(this.Anschlusslaenge + Breite, center_Y_AnschlussPosition);
        renderer.lineTo((2 * this.Anschlusslaenge) + Breite, center_Y_AnschlussPosition);
        renderer.stroke();

        renderer.restore();
    }
}

class Kondensator extends Bauteil {
    constructor(Name, Zahlenwert, gloableXPosition, globaleYPosition) {
        super('Kondensator', Name, Zahlenwert, 'F', gloableXPosition, globaleYPosition, 10, 40, 10)
    }

    draw(renderer){
        renderer.save();
        renderer.lineWidth = 6;
        renderer.beginPath();

        const Breite = this.Breite;
        const Hoehe = this.Hoehe;
        const Anschlusslaenge = this.Anschlusslaenge;
        const center_Y_AnschlussPosition = (Hoehe / 2) + renderer.lineWidth;

        //zeichnet den Kondensator
        renderer.moveTo(Anschlusslaenge, renderer.lineWidth);
        renderer.lineTo(Anschlusslaenge, Hoehe + renderer.lineWidth);
        renderer.moveTo(Anschlusslaenge + Breite, renderer.lineWidth);
        renderer.lineTo(Anschlusslaenge + Breite, Hoehe + renderer.lineWidth);
        renderer.stroke();

        //zeichnet Anschlüsse
        renderer.lineWidth = 1;
        renderer.beginPath();        
        renderer.moveTo(0,center_Y_AnschlussPosition);
        renderer.lineTo(Anschlusslaenge, center_Y_AnschlussPosition);
        renderer.stroke();
        renderer.moveTo(Anschlusslaenge + Breite, center_Y_AnschlussPosition);
        renderer.lineTo((2 * Anschlusslaenge) + Breite, center_Y_AnschlussPosition);
        renderer.stroke();

        renderer.restore();
    }
}

class Spule extends Bauteil {
    constructor(Name, Zahlenwert, gloableXPosition, globaleYPosition) {
        super('Spule', Name, Zahlenwert, 'H', gloableXPosition, globaleYPosition, 16, 20, 10)
    }

    draw(renderer){
        renderer.save();
        renderer.lineWidth = 2;
        renderer.beginPath();

        const Breite = this.Breite;
        const Hoehe = this.Hoehe;
        const Anschlusslaenge = this.Anschlusslaenge;
        const center_Y_AnschlussPosition = (Hoehe / 2) + renderer.lineWidth;

        //zeichnet der Spule
        for(let i = 0; i < 4; i++) {
            const mittelpunktXPosition = Anschlusslaenge + (i * Breite) + (Breite / 2);
            renderer.arc(
                mittelpunktXPosition,
                center_Y_AnschlussPosition,
                Breite / 2,
                Math.PI,
                0
            );
        };
        renderer.stroke();

        //zeichnet Anschlüsse
        renderer.lineWidth = 1;
        renderer.beginPath();        
        renderer.moveTo(0,center_Y_AnschlussPosition);
        renderer.lineTo(Anschlusslaenge, center_Y_AnschlussPosition);
        renderer.stroke();
        renderer.moveTo(Anschlusslaenge + (4 * Breite), center_Y_AnschlussPosition);
        renderer.lineTo((2 * Anschlusslaenge) + (4 * Breite), center_Y_AnschlussPosition);
        renderer.stroke();

        renderer.restore();
    }
}

class Reihenschaltung{
    constructor(Bauteil){
        this.Bauteil = Bauteil;       
    }

    draw(renderer){
        let naechsteBauteilXPosition = 0;
        const globaleYPositionAnschlüsse = 50;

        for (const Bauteil of this.Bauteil) {
            renderer.save();
            renderer.translate(naechsteBauteilXPosition, globaleYPositionAnschlüsse);
            Bauteil.draw(renderer);
            renderer.restore();

            naechsteBauteilXPosition = naechsteBauteilXPosition + ((2 * Bauteil.Anschlusslaenge) + Bauteil.Breite);
        }
    }
}

const R1 = new Widerstand('R1', 1250, 10, 10);
const C1 = new Kondensator('C1', 1250, 10, 10);
const L1 = new Spule('L1', 1250, 10, 10);

console.log(R1.info());
console.log(C1.info());
console.log(L1.info());


//R1.draw(renderer);
//C1.draw(renderer);
//L1.draw(renderer);
 
const renderReihenschaltung = new Reihenschaltung([R1, C1, L1]);
renderReihenschaltung.draw(renderer); 